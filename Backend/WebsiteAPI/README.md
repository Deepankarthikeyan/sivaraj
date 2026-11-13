# Website content and images

The existing `WebsiteAPI/websiteRoutes.js` contains all website content and image endpoints, using its original router and a single error handler. It is already registered once in `server.js` under `/api/website`.

Text uses `SVSM_IT.dbo.NW_WebsitePageContent`; images use `SVSM_IT.dbo.NW_WebsitePageImages`. No new tables, backend route files, SQL files, page component files, CSS files or packages were added. No CREATE TABLE or ALTER TABLE statements were executed. The image helper now uses the existing connection without attempting schema creation.

## Existing files modified

- `Backend/WebsiteAPI/websiteRoutes.js`: content GET/PUT/DELETE, validation, serializable update-first upserts, shared error handler, four additional image page codes, existing-table-only image access.
- `Frontend/my-app/src/App.jsx`: existing route definitions updated. This workspace has no WebRoutes.jsx, so no duplicate routing file was created.
- `Frontend/my-app/src/Components/SiteHeader/SiteHeader.jsx`: responsive click dropdown, NavLink items, active styling, outside-click dismissal, keyboard support and ARIA attributes using React Bootstrap.
- `Frontend/my-app/src/pages/KnowUsBetterPage/KnowUsBetterPage.jsx`: one route-driven page with four layouts, database text/images, loading/error/empty states, safe text and buttons. Keyed page views clear old content on navigation and abort outstanding requests.
- `Frontend/my-app/src/layouts/PublicLayout/PublicLayout.jsx`: corrected the existing Components import casing for case-sensitive systems.
- `Backend/WebsiteAPI/README.md`: this guide.

## Configuration

The existing `Frontend/my-app/.env.local` already contains:

```dotenv
VITE_API_URL=http://localhost:3003
```

Use the backend origin only, without `/api/website`. Vite reads this file in the app root; restart Vite after changes. For deployment, replace the origin with your deployed backend origin and rebuild. Set `SERVERNAME` and `DB_PASSWORD` in `Backend/.env`; `db.js` selects `SVSM_IT` and reads the database password from `DB_PASSWORD`.

**Restart the existing backend on port 3003 to load these changes.** During verification it was still serving the older router and returned 404 for the new content endpoint. The updated router was tested separately with a temporary HTTP listener against the real database. Process identification permission was declined, so the existing process was not stopped.

```powershell
# Stop your existing backend with Ctrl+C in its terminal, then from Backend:
node server.js
```

Writes retain the existing local-development API-client restriction. Use Postman Desktop on the backend machine, without an Origin header; NODE_ENV must not be production. The supplied updatedBy is an audit label, not authentication. Production editing would require your authenticated administrator middleware.

## Routes and dropdown

| Dropdown item | Frontend route | Database page code |
| --- | --- | --- |
| Company Profile | /know-us-better/company-profile | COMPANY_PROFILE |
| Management Team | /know-us-better/management-team | MANAGEMENT_TEAM |
| CSR | /know-us-better/csr | CSR |
| Global Presence | /know-us-better/global-presence | GLOBAL_PRESENCE |

`/know-us-better` redirects with replace to Company Profile. Unknown slugs render the existing Not Found page. Welcome Way remains at `/`; other navigation tabs are unchanged. Production hosting must serve index.html for frontend deep links while preserving API/static-file routing.

## Section mapping

All pages support `PAGE_HERO`, `INTRODUCTION`, `ENQUIRY_BANNER` text rows. Hero/enquiry images use the same section codes. All displayed content is read from active database rows. Missing optional text sections are hidden; empty pages show a preparation message. No names, statistics or countries are fabricated.

| Page code | Main text sections | Additional repeatable content |
| --- | --- | --- |
| COMPANY_PROFILE | OUR_STORY, VISION, MISSION, CORE_VALUES, BUSINESS_CAPABILITIES, MILESTONES, CORPORATE_PROFILE | STAT_1…, COMPANY_STATISTIC_1…, MILESTONE_1…, PROCESS_1…, VALUE_1…, CAPABILITY_1…, PRODUCT_1… |
| MANAGEMENT_TEAM | LEADERSHIP_MESSAGE, LEADERSHIP_PRINCIPLES | TEAM_MEMBER_1…, PRINCIPLE_1… |
| CSR | EDUCATION, HEALTHCARE, COMMUNITY, ENVIRONMENT, CSR_REPORTS | STAT_1…, CSR_STATISTIC_1…, REPORT_1… |
| GLOBAL_PRESENCE | WORLD_MAP, EXPORT_MARKETS, GLOBAL_STATISTICS, CORPORATE_OFFICE | STAT_1…, MARKET_1…, REGION_1… |

`CONTACT` is also accepted as the older fallback for CORPORATE_OFFICE. Within repeatable groups, display_order then content_id controls order; main sections follow the page-specific visual layout.

Images: Company Profile uses OUR_STORY, BUSINESS_CAPABILITIES, and each CAPABILITY_/PRODUCT_ content section code. Management uses LEADERSHIP_FEATURE and `TEAM_MEMBER_{content_id}`. CSR uses EDUCATION, HEALTHCARE, COMMUNITY, ENVIRONMENT. Global Presence uses WORLD_MAP and EXPORT_MARKETS.

For a team card, use heading=name, subheading=designation, bodyContent=biography. Save the text first and use its returned content_id to name the photo section; this ID may differ from the numeric suffix of its text section code. For statistics, use only approved database values in heading/subheading. For reports/profile downloads, use buttonText and a valid existing HTTP(S) document URL in buttonUrl. This phase does not implement document upload.

## Backend endpoints

Prefix: `http://localhost:3003/api/website`

| Method | Path | Result |
| --- | --- | --- |
| GET | /page-content/:pageCode | Active sections ordered by display_order, content_id; empty page = 200 with data: [] |
| GET | /page-content/:pageCode/:sectionCode | Active section; 404 if missing/inactive |
| PUT | /page-content/:pageCode/:sectionCode | Insert (201) or update (200), returning saved row |
| DELETE | /page-content/:pageCode/:sectionCode | Soft delete; 404 if nonexistent |
| GET | /page-images/:pageCode/:sectionCode | Existing raw image endpoint |
| PUT | /page-images/:pageCode/:sectionCode | Existing multipart upload/replacement endpoint |
| GET | /page-images/:pageCode | Existing image metadata endpoint, without image_data |

Content response fields use the actual snake_case column names, including content_id, page_code, section_code and body_content. PUT accepts the camelCase JSON below. PUT replaces the whole section: omitted text becomes null, displayOrder defaults to 0, isActive defaults to true, updatedBy defaults to null. Send all fields when editing. The unique key plus serializable UPDATE-first transaction prevents duplicate page/section rows.

Only the four exact uppercase page codes are accepted for content. Section codes are 1–100 uppercase letters, numbers or underscores. Invalid values return 400. Unexpected content errors use the shared handler and do not expose database details. Existing Welcome Way image aliases remain supported.

## Exact Postman tests

1. **Save the introduction**

PUT `http://localhost:3003/api/website/page-content/COMPANY_PROFILE/INTRODUCTION`

Header: `Content-Type: application/json`. Body → raw → JSON:

```json
{
  "heading": "Built on Experience. Driven by Innovation.",
  "subheading": "Integrated textile manufacturing",
  "bodyContent": "Replace this text with verified Sivaraj company information.",
  "buttonText": "Let’s Talk",
  "buttonUrl": "/lets-talk",
  "displayOrder": 1,
  "isActive": true,
  "updatedBy": "219926"
}
```

This is an example for review; it was not written to your INTRODUCTION row. Repeat PUT and confirm the returned content_id stays the same.

2. **Read the whole page**

GET `http://localhost:3003/api/website/page-content/COMPANY_PROFILE`

3. **Read one section**

GET `http://localhost:3003/api/website/page-content/COMPANY_PROFILE/INTRODUCTION`

4. **Upload/replace the hero**

PUT `http://localhost:3003/api/website/page-images/COMPANY_PROFILE/PAGE_HERO`

Body → form-data:

| Key | Type | Example |
| --- | --- | --- |
| image | File | Select a WebP, PNG or JPEG, maximum 614400 bytes (600 KB) |
| altText | Text | Approved description of the image |
| displayOrder | Text | 0 |
| updatedBy | Text | 219926 |

Do not manually set Content-Type; Postman supplies the multipart boundary. Repeating the request updates the same image row. Images are stored as VARBINARY(MAX) and served as raw bytes, never Base64.

5. **Read the hero**

GET `http://localhost:3003/api/website/page-images/COMPANY_PROFILE/PAGE_HERO`

6. **Optional soft delete**

DELETE `http://localhost:3003/api/website/page-content/COMPANY_PROFILE/INTRODUCTION`

Body → raw → JSON: `{ "updatedBy": "219926" }`. The row remains in SQL with is_active=0. PUT with isActive=true restores it.

## Verification results

- Frontend lint: passed (`npm run lint`).
- Backend JavaScript syntax check: passed.
- Live tests of the updated router: **56 assertions passed**, using an isolated listener and SVSM_IT. Checks covered all four lists, missing sections/images, invalid page codes, field validation, insertion, concurrent updates preserving ID and uniqueness, nullable updatedBy, soft deletion retaining the row, write protection, image byte round-trip, same-row image replacement, size/type validation, and metadata without image_data.
- Existing Welcome Way raw image and metadata returned 200 from the updated router.
- Uniquely named verification rows were removed afterward; no existing page content/images were overwritten. No schema statements were executed.
- Port 3003 currently needs a backend restart to load the changed router (see above).
- Production build: blocked by sandbox `spawn EPERM`; outside-sandbox build permission was declined. Run `npm run build` locally from Frontend/my-app.
- Browser interaction could not be exercised here. Verify the dropdown at desktop/tablet/mobile widths, keyboard focus and Escape, outside click, active parent/child, and each route/refresh before deployment. React Bootstrap supplies the dropdown keyboard/outside-click behavior.


## Current 17-page website implementation (October 2026)

This section supersedes the earlier frontend layout and section-code mappings. The existing Company Profile layout is preserved and enhanced under `Frontend/my-app/src/pages/KnowUsBetter/`. All 17 requested page components are directly in that folder; one `InnerPage.jsx` shares loading, image handling and rendering across the other 16 pages. Previous page source files remain in place. Routes remain in the existing `App.jsx` because this project has no `WebRoutes.jsx`. No additional route, backend, CSS or SQL files were created.

Navigation: Welcome Way → Know Us Better → Enlightenment → Framework → Goods → Credentials → Logo Marquee → Search → Let’s Talk. The four groups are dropdowns; unrelated destination pages and Welcome Way are unchanged. The header collapses below 1200px to accommodate the additional group. A shared footer is rendered by PublicLayout.

Parent redirects use Navigate with replace:

- `/know-us-better` → `/know-us-better/company-profile`
- `/enlightenment` → `/enlightenment/textile`
- `/framework` → `/framework/spinning`
- `/goods` → `/goods/cotton-yarn`

### Routes and database content sections

Every page reads `GET /api/website/page-content/:pageCode` from NW_WebsitePageContent. Images use `GET /api/website/page-images/:pageCode/:sectionCode` from NW_WebsitePageImages. The frontend origin comes only from VITE_API_URL. Content is plain text; newlines are preserved. Provide concise paragraphs or one item per line for process/card sections. Database content takes priority; neutral source-based fallback copy is used for missing sections. Additional database sections remain visible.

All pages have PAGE_HERO and ENQUIRY_BANNER. Every page except Company Profile also has INTRODUCTION.

| Route | page_code | Additional text section_code values |
| --- | --- | --- |
| `/know-us-better/company-profile` | COMPANY_PROFILE | WHO_WE_ARE, OUR_JOURNEY, FIBRE_TO_FASHION, VISION, MISSION, CORE_VALUES, BUSINESS_CAPABILITIES, GLOBAL_REACH, CORPORATE_PROFILE; optional STAT_*, COMPANY_STATISTIC*, GLOBAL_STAT_*, MILESTONE_*, CAPABILITY_1–4, PRODUCT_1–4 |
| `/know-us-better/management-team` | MANAGEMENT_TEAM | LEADERSHIP_MESSAGE, MANAGEMENT_MEMBER_01, MANAGEMENT_MEMBER_02, MANAGEMENT_MEMBER_03 (and further MANAGEMENT_MEMBER_* rows), LEADERSHIP_VALUES |
| `/know-us-better/csr` | CSR | EDUCATION, HEALTHCARE, COMMUNITY, ENVIRONMENT, CSR_IMPACT, CSR_REPORTS |
| `/know-us-better/global-presence` | GLOBAL_PRESENCE | WORLD_MAP, EXPORT_MARKETS, GLOBAL_STATISTICS, MARKET_REGIONS, CORPORATE_OFFICE |
| `/enlightenment/textile` | TEXTILE | SPINNING, KNITTING, WEAVING, GARMENTING, HOME_TEXTILES, PROCESS_FLOW |
| `/enlightenment/education` | EDUCATION | INSTITUTIONS, LEARNING_ENVIRONMENT, STUDENT_DEVELOPMENT, SOCIAL_COMMITMENT |
| `/enlightenment/natural-energy` | NATURAL_ENERGY | ENERGY_SOURCES, RESPONSIBLE_OPERATIONS, ENVIRONMENTAL_COMMITMENT, FUTURE_VISION |
| `/enlightenment/brands` | BRANDS | BRAND_PORTFOLIO, CHENNIS, BRAND_VALUES, MARKET_PRESENCE |
| `/framework/spinning` | SPINNING | PROCESS_FLOW, MACHINERY, QUALITY_CONTROL, CAPABILITIES |
| `/framework/knitting` | KNITTING | PROCESS_FLOW, MACHINERY, FABRIC_CAPABILITIES, QUALITY_CONTROL |
| `/framework/weaving` | WEAVING | PROCESS_FLOW, MACHINERY, FABRIC_CAPABILITIES, QUALITY_CONTROL |
| `/framework/garmenting` | GARMENTING | DESIGN_DEVELOPMENT, PRODUCTION_FLOW, QUALITY_CONTROL, PRODUCT_CAPABILITIES |
| `/framework/home-textiles` | HOME_TEXTILES | PRODUCT_CAPABILITIES, MATERIALS, DESIGN_AND_FINISHING, QUALITY |
| `/goods/cotton-yarn` | COTTON_YARN | PRODUCT_RANGE, APPLICATIONS, QUALITY, MANUFACTURING |
| `/goods/knitted-fabrics` | KNITTED_FABRICS | PRODUCT_RANGE, CONSTRUCTIONS, APPLICATIONS, QUALITY |
| `/goods/woven-fabrics` | WOVEN_FABRICS | PRODUCT_RANGE, CONSTRUCTIONS, APPLICATIONS, QUALITY |
| `/goods/garments` | GARMENTS | PRODUCT_RANGE, DESIGN, MANUFACTURING, QUALITY |

Company Profile accepts legacy INTRODUCTION/MILESTONES text when WHO_WE_ARE/OUR_JOURNEY is missing. GLOBAL_REACH is preferred; legacy GLOBAL_PRESENCE content and image remain supported. Existing image records do not need to be removed.

Management member heading = approved name, subheading = designation, body_content = biography. The exact member section_code also selects the portrait. No names or random portraits are supplied by fallback code. Missing portraits show initials. All additional MANAGEMENT_MEMBER_* and legacy TEAM_MEMBER_* records are shown.

For statistics, only approved database values are displayed; the code does not infer numbers or dates. For corporate-profile and CSR-report panels, button_url must contain a real internal document path or HTTP(S) URL; otherwise the document buttons remain disabled. External document hosting may control whether the browser downloads or opens a PDF.

### Image mapping and exact Postman upload URLs

The currently configured backend is http://localhost:3003 (reachable during verification). Restart it after changing websiteRoutes.js so the expanded page-code allowlists take effect.

For every PUT request below: Body → form-data. `image` = File, `altText` = Text (approved descriptive alt text), `displayOrder` = Text (for example 1), `updatedBy` = Text (your existing editor identifier). Do not manually set Content-Type. Repeating a PUT replaces the same image row. WebP is preferred; JPEG/PNG are accepted. The existing 600 KB limit is unchanged.

Recommended dimensions: PAGE_HERO 1920 × 850; introduction 1200 × 900; feature 1400 × 900; card/management portrait 900 × 650 or an appropriate portrait crop; ENQUIRY_BANNER 1600 × 600. Text is rendered by React, not embedded in the files.

**COMPANY_PROFILE** — matching page_code in both database tables.

- PUT `http://localhost:3003/api/website/page-images/COMPANY_PROFILE/PAGE_HERO`
- PUT `http://localhost:3003/api/website/page-images/COMPANY_PROFILE/WHO_WE_ARE`
- PUT `http://localhost:3003/api/website/page-images/COMPANY_PROFILE/FIBRE_TO_FASHION`
- PUT `http://localhost:3003/api/website/page-images/COMPANY_PROFILE/GLOBAL_REACH`
- PUT `http://localhost:3003/api/website/page-images/COMPANY_PROFILE/ENQUIRY_BANNER`

**MANAGEMENT_TEAM** — matching page_code in both database tables.

- PUT `http://localhost:3003/api/website/page-images/MANAGEMENT_TEAM/PAGE_HERO`
- PUT `http://localhost:3003/api/website/page-images/MANAGEMENT_TEAM/INTRODUCTION`
- PUT `http://localhost:3003/api/website/page-images/MANAGEMENT_TEAM/LEADERSHIP_MESSAGE`
- PUT `http://localhost:3003/api/website/page-images/MANAGEMENT_TEAM/ENQUIRY_BANNER`
- PUT `http://localhost:3003/api/website/page-images/MANAGEMENT_TEAM/MANAGEMENT_MEMBER_01` (approved portrait only)
- PUT `http://localhost:3003/api/website/page-images/MANAGEMENT_TEAM/MANAGEMENT_MEMBER_02` (approved portrait only)
- PUT `http://localhost:3003/api/website/page-images/MANAGEMENT_TEAM/MANAGEMENT_MEMBER_03` (approved portrait only)

**CSR** — matching page_code in both database tables.

- PUT `http://localhost:3003/api/website/page-images/CSR/PAGE_HERO`
- PUT `http://localhost:3003/api/website/page-images/CSR/INTRODUCTION`
- PUT `http://localhost:3003/api/website/page-images/CSR/EDUCATION`
- PUT `http://localhost:3003/api/website/page-images/CSR/HEALTHCARE`
- PUT `http://localhost:3003/api/website/page-images/CSR/COMMUNITY`
- PUT `http://localhost:3003/api/website/page-images/CSR/ENVIRONMENT`
- PUT `http://localhost:3003/api/website/page-images/CSR/ENQUIRY_BANNER`

**GLOBAL_PRESENCE** — matching page_code in both database tables.

- PUT `http://localhost:3003/api/website/page-images/GLOBAL_PRESENCE/PAGE_HERO`
- PUT `http://localhost:3003/api/website/page-images/GLOBAL_PRESENCE/INTRODUCTION`
- PUT `http://localhost:3003/api/website/page-images/GLOBAL_PRESENCE/WORLD_MAP`
- PUT `http://localhost:3003/api/website/page-images/GLOBAL_PRESENCE/EXPORT_MARKETS`
- PUT `http://localhost:3003/api/website/page-images/GLOBAL_PRESENCE/ENQUIRY_BANNER`

**TEXTILE** — matching page_code in both database tables.

- PUT `http://localhost:3003/api/website/page-images/TEXTILE/PAGE_HERO`
- PUT `http://localhost:3003/api/website/page-images/TEXTILE/INTRODUCTION`
- PUT `http://localhost:3003/api/website/page-images/TEXTILE/SPINNING`
- PUT `http://localhost:3003/api/website/page-images/TEXTILE/KNITTING`
- PUT `http://localhost:3003/api/website/page-images/TEXTILE/WEAVING`
- PUT `http://localhost:3003/api/website/page-images/TEXTILE/GARMENTING`
- PUT `http://localhost:3003/api/website/page-images/TEXTILE/HOME_TEXTILES`
- PUT `http://localhost:3003/api/website/page-images/TEXTILE/ENQUIRY_BANNER`

**EDUCATION** — matching page_code in both database tables.

- PUT `http://localhost:3003/api/website/page-images/EDUCATION/PAGE_HERO`
- PUT `http://localhost:3003/api/website/page-images/EDUCATION/INTRODUCTION`
- PUT `http://localhost:3003/api/website/page-images/EDUCATION/INSTITUTIONS`
- PUT `http://localhost:3003/api/website/page-images/EDUCATION/LEARNING_ENVIRONMENT`
- PUT `http://localhost:3003/api/website/page-images/EDUCATION/ENQUIRY_BANNER`

**NATURAL_ENERGY** — matching page_code in both database tables.

- PUT `http://localhost:3003/api/website/page-images/NATURAL_ENERGY/PAGE_HERO`
- PUT `http://localhost:3003/api/website/page-images/NATURAL_ENERGY/INTRODUCTION`
- PUT `http://localhost:3003/api/website/page-images/NATURAL_ENERGY/ENERGY_SOURCES`
- PUT `http://localhost:3003/api/website/page-images/NATURAL_ENERGY/RESPONSIBLE_OPERATIONS`
- PUT `http://localhost:3003/api/website/page-images/NATURAL_ENERGY/ENQUIRY_BANNER`

**BRANDS** — matching page_code in both database tables.

- PUT `http://localhost:3003/api/website/page-images/BRANDS/PAGE_HERO`
- PUT `http://localhost:3003/api/website/page-images/BRANDS/INTRODUCTION`
- PUT `http://localhost:3003/api/website/page-images/BRANDS/CHENNIS`
- PUT `http://localhost:3003/api/website/page-images/BRANDS/BRAND_VALUES`
- PUT `http://localhost:3003/api/website/page-images/BRANDS/ENQUIRY_BANNER`

**SPINNING** — matching page_code in both database tables.

- PUT `http://localhost:3003/api/website/page-images/SPINNING/PAGE_HERO`
- PUT `http://localhost:3003/api/website/page-images/SPINNING/INTRODUCTION`
- PUT `http://localhost:3003/api/website/page-images/SPINNING/MACHINERY`
- PUT `http://localhost:3003/api/website/page-images/SPINNING/QUALITY_CONTROL`
- PUT `http://localhost:3003/api/website/page-images/SPINNING/ENQUIRY_BANNER`

**KNITTING** — matching page_code in both database tables.

- PUT `http://localhost:3003/api/website/page-images/KNITTING/PAGE_HERO`
- PUT `http://localhost:3003/api/website/page-images/KNITTING/INTRODUCTION`
- PUT `http://localhost:3003/api/website/page-images/KNITTING/MACHINERY`
- PUT `http://localhost:3003/api/website/page-images/KNITTING/QUALITY_CONTROL`
- PUT `http://localhost:3003/api/website/page-images/KNITTING/ENQUIRY_BANNER`

**WEAVING** — matching page_code in both database tables.

- PUT `http://localhost:3003/api/website/page-images/WEAVING/PAGE_HERO`
- PUT `http://localhost:3003/api/website/page-images/WEAVING/INTRODUCTION`
- PUT `http://localhost:3003/api/website/page-images/WEAVING/MACHINERY`
- PUT `http://localhost:3003/api/website/page-images/WEAVING/QUALITY_CONTROL`
- PUT `http://localhost:3003/api/website/page-images/WEAVING/ENQUIRY_BANNER`

**GARMENTING** — matching page_code in both database tables.

- PUT `http://localhost:3003/api/website/page-images/GARMENTING/PAGE_HERO`
- PUT `http://localhost:3003/api/website/page-images/GARMENTING/INTRODUCTION`
- PUT `http://localhost:3003/api/website/page-images/GARMENTING/DESIGN_DEVELOPMENT`
- PUT `http://localhost:3003/api/website/page-images/GARMENTING/QUALITY_CONTROL`
- PUT `http://localhost:3003/api/website/page-images/GARMENTING/ENQUIRY_BANNER`

**HOME_TEXTILES** — matching page_code in both database tables.

- PUT `http://localhost:3003/api/website/page-images/HOME_TEXTILES/PAGE_HERO`
- PUT `http://localhost:3003/api/website/page-images/HOME_TEXTILES/INTRODUCTION`
- PUT `http://localhost:3003/api/website/page-images/HOME_TEXTILES/PRODUCT_CAPABILITIES`
- PUT `http://localhost:3003/api/website/page-images/HOME_TEXTILES/MATERIALS`
- PUT `http://localhost:3003/api/website/page-images/HOME_TEXTILES/ENQUIRY_BANNER`

**COTTON_YARN** — matching page_code in both database tables.

- PUT `http://localhost:3003/api/website/page-images/COTTON_YARN/PAGE_HERO`
- PUT `http://localhost:3003/api/website/page-images/COTTON_YARN/INTRODUCTION`
- PUT `http://localhost:3003/api/website/page-images/COTTON_YARN/PRODUCT_RANGE`
- PUT `http://localhost:3003/api/website/page-images/COTTON_YARN/QUALITY`
- PUT `http://localhost:3003/api/website/page-images/COTTON_YARN/ENQUIRY_BANNER`

**KNITTED_FABRICS** — matching page_code in both database tables.

- PUT `http://localhost:3003/api/website/page-images/KNITTED_FABRICS/PAGE_HERO`
- PUT `http://localhost:3003/api/website/page-images/KNITTED_FABRICS/INTRODUCTION`
- PUT `http://localhost:3003/api/website/page-images/KNITTED_FABRICS/PRODUCT_RANGE`
- PUT `http://localhost:3003/api/website/page-images/KNITTED_FABRICS/QUALITY`
- PUT `http://localhost:3003/api/website/page-images/KNITTED_FABRICS/ENQUIRY_BANNER`

**WOVEN_FABRICS** — matching page_code in both database tables.

- PUT `http://localhost:3003/api/website/page-images/WOVEN_FABRICS/PAGE_HERO`
- PUT `http://localhost:3003/api/website/page-images/WOVEN_FABRICS/INTRODUCTION`
- PUT `http://localhost:3003/api/website/page-images/WOVEN_FABRICS/PRODUCT_RANGE`
- PUT `http://localhost:3003/api/website/page-images/WOVEN_FABRICS/QUALITY`
- PUT `http://localhost:3003/api/website/page-images/WOVEN_FABRICS/ENQUIRY_BANNER`

**GARMENTS** — matching page_code in both database tables.

- PUT `http://localhost:3003/api/website/page-images/GARMENTS/PAGE_HERO`
- PUT `http://localhost:3003/api/website/page-images/GARMENTS/INTRODUCTION`
- PUT `http://localhost:3003/api/website/page-images/GARMENTS/PRODUCT_RANGE`
- PUT `http://localhost:3003/api/website/page-images/GARMENTS/MANUFACTURING`
- PUT `http://localhost:3003/api/website/page-images/GARMENTS/ENQUIRY_BANNER`

### Verification and remaining data

- Frontend lint passes.
- Vite serves all 17 child URLs, four parent URLs and Welcome Way (22 responses). All 21 checked JSX modules compile through the running dev server without error.
- React server rendering succeeds for all 17 child routes; every rendered page has one h1, at least three API image positions, and the shared footer.
- Backend syntax check passes.
- Production build attempt is blocked by Windows sandbox spawn EPERM; escalation was declined. Run npm run build in Frontend/my-app from your terminal to validate the updated production bundle.
- The live Company Profile content API returned success with an empty array. Its four original required images and optional enquiry image returned 404. Upload approved images and populate database text using the existing administration workflow.
- The running backend returned 400 for TEXTILE before restart, consistent with the earlier allowlist. After restarting it, verify the new page-code API requests against the database.
- Browser interaction, actual mobile overflow, image error events, and client redirects have not been tested in a real browser. Vite's nested URL fallback is reachable; production hosting must also serve index.html for client routes.

Current names/designations/biographies, institution details, healthcare initiatives, home-textile product range, region/country lists, numerical statistics, current capacities, approved certifications, achievements, and document URLs need verified database content. Some old pages could not be retrieved. Fallbacks never invent these details. Source context was reviewed on the existing company site’s Company Profile, Textile, CSR, Brands, Cotton Yarn and Infrastructure pages. Historical production figures and dated expansion goals are intentionally not published as current facts.

