import express from "express";
import multer from "multer";
import { getPool, sql } from "../db.js";

const router = express.Router();

const DATABASE_TABLE =
  "SVSM_IT.dbo.NW_WebsitePageImages";

const MAX_IMAGE_SIZE = 600 * 1024;

const allowedPageCodes = [
  "WELCOME_WAY",
  "KNOW_US_BETTER",
  "COMPANY_PROFILE", "MANAGEMENT_TEAM", "CSR", "GLOBAL_PRESENCE",
  "TEXTILE", "EDUCATION", "NATURAL_ENERGY", "BRANDS",
  "SPINNING", "KNITTING", "WEAVING", "GARMENTING", "HOME_TEXTILES",
  "COTTON_YARN", "KNITTED_FABRICS", "WOVEN_FABRICS", "GARMENTS",
];

const upload = multer({
  storage: multer.memoryStorage(),

  limits: {
    fileSize: MAX_IMAGE_SIZE,
    files: 1,
  },
});

// Compatibility helper for the existing uploader. Tables are managed externally.
export async function ensureWebsitePageImages() {
  return getPool();
}

/*
|--------------------------------------------------------------------------
| Helpers
|--------------------------------------------------------------------------
*/

function normalizeCode(value) {
  return String(value || "")
    .trim()
    .toUpperCase()
    .replace(/[^A-Z0-9_]/g, "_");
}

function identifyImageType(buffer) {
  if (
    buffer.length >= 12 &&
    buffer.subarray(0, 4).toString() === "RIFF" &&
    buffer.subarray(8, 12).toString() === "WEBP"
  ) {
    return "image/webp";
  }

  const pngSignature = Buffer.from([
    137, 80, 78, 71, 13, 10, 26, 10,
  ]);

  if (
    buffer.length >= 8 &&
    buffer.subarray(0, 8).equals(pngSignature)
  ) {
    return "image/png";
  }

  if (
    buffer.length >= 3 &&
    buffer[0] === 255 &&
    buffer[1] === 216 &&
    buffer[2] === 255
  ) {
    return "image/jpeg";
  }

  return null;
}

function allowLocalDevelopmentUpload(req, res, next) {
  const localAddresses = [
    "127.0.0.1",
    "::1",
    "::ffff:127.0.0.1",
  ];

  const remoteAddress = req.socket.remoteAddress;

  if (
    process.env.NODE_ENV === "production" ||
    !localAddresses.includes(remoteAddress) ||
    req.headers.origin
  ) {
    return res.status(403).json({
      success: false,
      message:
        "Uploads require a local development API client",
    });
  }

  next();
}

/*
|--------------------------------------------------------------------------
| GET one image
|--------------------------------------------------------------------------
|
| Example:
| GET /api/website/page-images/WELCOME_WAY/FABRIC_ROLLS
|
*/

router.get(
  "/page-images/:pageName/:imageKey",
  async (req, res, next) => {
    try {
      const pageCode = normalizeCode(req.params.pageName);
      const sectionCode = normalizeCode(req.params.imageKey);

      if (!allowedPageCodes.includes(pageCode) || !sectionCode || sectionCode.length > 100) {
        return res.status(400).json({
          success: false,
          message: "Page code and section code are required",
        });
      }

      const pool = await ensureWebsitePageImages();

      const result = await pool
        .request()
        .input(
          "pageCode",
          sql.VarChar(50),
          pageCode
        )
        .input(
          "sectionCode",
          sql.VarChar(100),
          sectionCode
        )
        .query(`
          SELECT
              image_name,
              image_type,
              image_data,
              image_size_bytes,
              alt_text,
              updated_at,
              row_version
          FROM ${DATABASE_TABLE}
          WHERE page_code = @pageCode
            AND section_code = @sectionCode
            AND is_active = 1;
        `);

      const image = result.recordset[0];

      if (!image) {
        return res.status(404).json({
          success: false,
          message: "Image not found",
        });
      }

      res.setHeader(
        "Content-Type",
        image.image_type
      );

      res.setHeader(
        "Content-Disposition",
        `inline; filename="${String(
          image.image_name
        ).replace(/"/g, "")}"`
      );

      res.setHeader(
        "X-Content-Type-Options",
        "nosniff"
      );

      res.setHeader(
        "Cache-Control",
        "no-cache"
      );

      return res.send(image.image_data);
    } catch (error) {
      next(error);
    }
  }
);

/*
|--------------------------------------------------------------------------
| GET image metadata
|--------------------------------------------------------------------------
|
| This does not return image_data.
|
| Example:
| GET /api/website/page-images/WELCOME_WAY
|
*/

router.get(
  "/page-images/:pageName",
  async (req, res, next) => {
    try {
      const pageCode = normalizeCode(req.params.pageName);

      if (!allowedPageCodes.includes(pageCode)) {
        return res.status(400).json({
          success: false,
          message: "Page code is required",
        });
      }

      const pool = await ensureWebsitePageImages();

      const result = await pool
        .request()
        .input(
          "pageCode",
          sql.VarChar(50),
          pageCode
        )
        .query(`
          SELECT
              image_id,
              page_code,
              section_code,
              image_name,
              image_type,
              image_size_bytes,
              alt_text,
              display_order,
              is_active,
              created_by,
              created_at,
              updated_by,
              updated_at,
              row_version
          FROM ${DATABASE_TABLE}
          WHERE page_code = @pageCode
          ORDER BY display_order, image_id;
        `);

      const images = result.recordset.map((image) => ({
        ...image,

        image_url:
          `/api/website/page-images/` +
          `${encodeURIComponent(image.page_code)}/` +
          `${encodeURIComponent(image.section_code)}`,
      }));

      return res.status(200).json({
        success: true,
        data: images,
      });
    } catch (error) {
      next(error);
    }
  }
);

/*
|--------------------------------------------------------------------------
| PUT upload or replace image
|--------------------------------------------------------------------------
|
| First upload:
|   INSERT
|
| Same pageCode + sectionCode uploaded again:
|   UPDATE
|
| Example:
| PUT /api/website/page-images/WELCOME_WAY/FABRIC_ROLLS
|
| Postman Body -> form-data:
| image       File
| altText     Text
| displayOrder Text
| updatedBy   Text
|
*/

router.put(
  "/page-images/:pageName/:imageKey",

  allowLocalDevelopmentUpload,

  upload.single("image"),

  async (req, res, next) => {
    let transaction;

    try {
      const pageCode = normalizeCode(req.params.pageName);
      const sectionCode = normalizeCode(req.params.imageKey);

      if (!allowedPageCodes.includes(pageCode) || !sectionCode || sectionCode.length > 100) {
        return res.status(400).json({
          success: false,
          message: "Page code and section code are required",
        });
      }

      if (pageCode.length > 50) {
        return res.status(400).json({
          success: false,
          message:
            "Page code cannot exceed 50 characters",
        });
      }

      if (sectionCode.length > 100) {
        return res.status(400).json({
          success: false,
          message:
            "Section code cannot exceed 100 characters",
        });
      }

      if (
        allowedPageCodes.length > 0 &&
        !allowedPageCodes.includes(pageCode)
      ) {
        return res.status(400).json({
          success: false,
          message: "Invalid page code",
        });
      }

      if (!req.file) {
        return res.status(400).json({
          success: false,
          message:
            "Select an image using the image field",
        });
      }

      if (
        !req.file.buffer ||
        req.file.buffer.length === 0
      ) {
        return res.status(400).json({
          success: false,
          message: "The selected image is empty",
        });
      }

      const imageType = identifyImageType(
        req.file.buffer
      );

      if (!imageType) {
        return res.status(400).json({
          success: false,
          message:
            "Only WebP, PNG and JPEG images are supported",
        });
      }

      const displayOrderText = String(
        req.body.displayOrder ?? "0"
      ).trim();

      const displayOrder = Number(displayOrderText);

      if (
        !Number.isInteger(displayOrder) ||
        displayOrder < 0 || displayOrder > 2147483647
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Display order must be zero or a positive integer",
        });
      }

      const altText =
        String(req.body.altText || "").trim() || null;

      if (altText && altText.length > 500) {
        return res.status(400).json({
          success: false,
          message:
            "Alt text cannot exceed 500 characters",
        });
      }

      const currentUser =
        String(req.body.updatedBy || "POSTMAN")
          .trim()
          .slice(0, 100);

      const imageName = String(
        req.file.originalname || "website-image"
      ).slice(0, 255);

      const pool = await ensureWebsitePageImages();

      transaction = new sql.Transaction(pool);

      await transaction.begin(sql.ISOLATION_LEVEL.SERIALIZABLE);

      const request = new sql.Request(transaction);

      const result = await request
        .input(
          "pageCode",
          sql.VarChar(50),
          pageCode
        )
        .input(
          "sectionCode",
          sql.VarChar(100),
          sectionCode
        )
        .input(
          "imageName",
          sql.NVarChar(255),
          imageName
        )
        .input(
          "imageType",
          sql.VarChar(100),
          imageType
        )
        .input(
          "imageData",
          sql.VarBinary(sql.MAX),
          req.file.buffer
        )
        .input(
          "imageSizeBytes",
          sql.BigInt,
          req.file.buffer.length
        )
        .input(
          "altText",
          sql.NVarChar(500),
          altText
        )
        .input(
          "displayOrder",
          sql.Int,
          displayOrder
        )
        .input(
          "currentUser",
          sql.VarChar(100),
          currentUser
        )
        .query(`
          SET NOCOUNT ON;
          SET XACT_ABORT ON;

          DECLARE @operation VARCHAR(10);

          UPDATE ${DATABASE_TABLE} WITH (UPDLOCK, HOLDLOCK)
          SET
              image_name = @imageName,
              image_type = @imageType,
              image_data = @imageData,
              image_size_bytes = @imageSizeBytes,
              alt_text = @altText,
              display_order = @displayOrder,
              is_active = 1,
              updated_by = @currentUser,
              updated_at = SYSDATETIME()
          WHERE page_code = @pageCode
            AND section_code = @sectionCode;

          IF @@ROWCOUNT > 0
          BEGIN
              SET @operation = 'UPDATED';
          END
          ELSE
          BEGIN
              INSERT INTO ${DATABASE_TABLE}
              (
                  page_code,
                  section_code,
                  image_name,
                  image_type,
                  image_data,
                  image_size_bytes,
                  alt_text,
                  display_order,
                  is_active,
                  created_by
              )
              VALUES
              (
                  @pageCode,
                  @sectionCode,
                  @imageName,
                  @imageType,
                  @imageData,
                  @imageSizeBytes,
                  @altText,
                  @displayOrder,
                  1,
                  @currentUser
              );

              SET @operation = 'INSERTED';
          END;

          SELECT
              @operation AS operation,
              image_id,
              page_code,
              section_code,
              image_name,
              image_type,
              image_size_bytes,
              alt_text,
              display_order,
              is_active,
              created_by,
              created_at,
              updated_by,
              updated_at
          FROM ${DATABASE_TABLE}
          WHERE page_code = @pageCode
            AND section_code = @sectionCode;
        `);

      await transaction.commit();
      transaction = null;

      const savedImage = result.recordset[0];

      return res.status(200).json({
        success: true,

        message:
          savedImage.operation === "INSERTED"
            ? "Image uploaded successfully"
            : "Image replaced successfully",

        data: savedImage,

        url:
          `/api/website/page-images/` +
          `${encodeURIComponent(pageCode)}/` +
          `${encodeURIComponent(sectionCode)}`,
      });
    } catch (error) {
      if (transaction) {
        try {
          await transaction.rollback();
        } catch (rollbackError) {
          console.error(
            "Website image rollback error:",
            rollbackError.message
          );
        }
      }

      next(error);
    }
  }
);

// Content shares this router and its error handler with the existing image API.
const ALLOWED_PAGE_CODES = new Set([
  "COMPANY_PROFILE", "MANAGEMENT_TEAM", "CSR", "GLOBAL_PRESENCE",
  "TEXTILE", "EDUCATION", "NATURAL_ENERGY", "BRANDS",
  "SPINNING", "KNITTING", "WEAVING", "GARMENTING", "HOME_TEXTILES",
  "COTTON_YARN", "KNITTED_FABRICS", "WOVEN_FABRICS", "GARMENTS",
]);
const CONTENT_TABLE = "SVSM_IT.dbo.NW_WebsitePageContent";
const CONTENT_COLUMNS = `content_id, page_code, section_code, heading, subheading,
  body_content, button_text, button_url, display_order, is_active,
  created_by, created_at, updated_by, updated_at`;

function validateContentParams(req, res, next) {
  const { pageCode, sectionCode } = req.params;
  if (pageCode.length > 50 || !ALLOWED_PAGE_CODES.has(pageCode)) {
    return res.status(400).json({ success: false, message: "Invalid page code" });
  }
  if (sectionCode !== undefined && !/^[A-Z0-9_]{1,100}$/.test(sectionCode)) {
    return res.status(400).json({ success: false, message: "Section code must contain 1–100 uppercase letters, numbers or underscores" });
  }
  next();
}

function contentRequest(pool, params) {
  const request = pool.request().input("pageCode", sql.VarChar(50), params.pageCode);
  if (params.sectionCode !== undefined) request.input("sectionCode", sql.VarChar(100), params.sectionCode);
  return request;
}

function validateContentBody(body) {
  if (!body || typeof body !== "object" || Array.isArray(body)) return "A JSON object is required";
  const limits = { heading: 250, subheading: 500, buttonText: 100, buttonUrl: 500, updatedBy: 100 };
  for (const [key, max] of Object.entries(limits)) {
    if (body[key] != null && (typeof body[key] !== "string" || body[key].length > max)) {
      return `${key} must be text with at most ${max} characters, or null`;
    }
  }
  if (body.bodyContent != null && typeof body.bodyContent !== "string") return "bodyContent must be text or null";
  if (body.displayOrder !== undefined && (!Number.isInteger(body.displayOrder) || body.displayOrder < 0 || body.displayOrder > 2147483647)) return "displayOrder must be a non-negative SQL integer";
  if (body.isActive !== undefined && typeof body.isActive !== "boolean") return "isActive must be Boolean";
  if (body.buttonUrl && !/^(\/(?!\/)|https?:\/\/)[^\s\\]*$/i.test(body.buttonUrl)) return "buttonUrl must be an internal path or HTTP(S) URL";
  return null;
}

router.get("/page-content/:pageCode", validateContentParams, async (req, res, next) => {
  try {
    const result = await contentRequest(await getPool(), req.params).query(`
      SELECT ${CONTENT_COLUMNS} FROM ${CONTENT_TABLE}
      WHERE page_code=@pageCode AND is_active=1 ORDER BY display_order, content_id;`);
    res.json({ success: true, data: result.recordset });
  } catch (error) { next(error); }
});

router.get("/page-content/:pageCode/:sectionCode", validateContentParams, async (req, res, next) => {
  try {
    const result = await contentRequest(await getPool(), req.params).query(`
      SELECT ${CONTENT_COLUMNS} FROM ${CONTENT_TABLE}
      WHERE page_code=@pageCode AND section_code=@sectionCode AND is_active=1;`);
    if (!result.recordset[0]) return res.status(404).json({ success: false, message: "Content section not found" });
    res.json({ success: true, data: result.recordset[0] });
  } catch (error) { next(error); }
});

router.put("/page-content/:pageCode/:sectionCode", validateContentParams, allowLocalDevelopmentUpload, async (req, res, next) => {
  let transaction;
  try {
    const message = validateContentBody(req.body);
    if (message) return res.status(400).json({ success: false, message });
    const body = req.body;
    transaction = new sql.Transaction(await getPool());
    await transaction.begin(sql.ISOLATION_LEVEL.SERIALIZABLE);
    const request = new sql.Request(transaction)
      .input("pageCode", sql.VarChar(50), req.params.pageCode)
      .input("sectionCode", sql.VarChar(100), req.params.sectionCode);
    for (const [key, length] of Object.entries({ heading: 250, subheading: 500, bodyContent: sql.MAX, buttonText: 100, buttonUrl: 500 })) {
      request.input(key, sql.NVarChar(length), body[key] ?? null);
    }
    const result = await request
      .input("displayOrder", sql.Int, body.displayOrder ?? 0)
      .input("isActive", sql.Bit, body.isActive ?? true)
      .input("updatedBy", sql.VarChar(100), body.updatedBy ?? null)
      .query(`
        SET NOCOUNT ON; SET XACT_ABORT ON;
        DECLARE @inserted BIT = 0;
        UPDATE ${CONTENT_TABLE} WITH (UPDLOCK, HOLDLOCK)
        SET heading=@heading, subheading=@subheading, body_content=@bodyContent,
          button_text=@buttonText, button_url=@buttonUrl, display_order=@displayOrder,
          is_active=@isActive, updated_by=@updatedBy, updated_at=SYSDATETIME()
        WHERE page_code=@pageCode AND section_code=@sectionCode;
        IF @@ROWCOUNT = 0
        BEGIN
          INSERT INTO ${CONTENT_TABLE}
            (page_code, section_code, heading, subheading, body_content, button_text, button_url, display_order, is_active, created_by)
          VALUES (@pageCode, @sectionCode, @heading, @subheading, @bodyContent, @buttonText, @buttonUrl, @displayOrder, @isActive, @updatedBy);
          SET @inserted = 1;
        END;
        SELECT ${CONTENT_COLUMNS}, @inserted AS inserted FROM ${CONTENT_TABLE}
        WHERE page_code=@pageCode AND section_code=@sectionCode;
      `);
    await transaction.commit();
    transaction = null;
    const { inserted, ...data } = result.recordset[0];
    res.status(inserted ? 201 : 200).json({ success: true, message: "Content saved successfully", data });
  } catch (error) {
    if (transaction) await transaction.rollback().catch(() => {});
    next(error);
  }
});

router.delete("/page-content/:pageCode/:sectionCode", validateContentParams, allowLocalDevelopmentUpload, async (req, res, next) => {
  try {
    const updatedBy = req.body?.updatedBy ?? null;
    if (updatedBy !== null && (typeof updatedBy !== "string" || updatedBy.length > 100)) return res.status(400).json({ success: false, message: "updatedBy must be text with at most 100 characters, or null" });
    const result = await contentRequest(await getPool(), req.params)
      .input("updatedBy", sql.VarChar(100), updatedBy).query(`
        UPDATE ${CONTENT_TABLE} SET is_active=0, updated_by=@updatedBy, updated_at=SYSDATETIME()
        WHERE page_code=@pageCode AND section_code=@sectionCode;`);
    if (!result.rowsAffected[0]) return res.status(404).json({ success: false, message: "Content section not found" });
    res.json({ success: true, message: "Content deactivated successfully" });
  } catch (error) { next(error); }
});

/*
|--------------------------------------------------------------------------
| Error handler
|--------------------------------------------------------------------------
*/

router.use((error, req, res, next) => {
  if (res.headersSent) return next(error);
  console.error(
    "Website API error:",
    error.message
  );

  if (error instanceof multer.MulterError) {
    if (error.code === "LIMIT_FILE_SIZE") {
      return res.status(413).json({
        success: false,
        message: "Image must be 600 KB or smaller",
      });
    }

    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }

  return res.status(500).json({
    success: false,
    message: req.path.startsWith("/page-content/")
      ? "Unable to process website content"
      : "Unable to access website images",
  });
});

export default router;
