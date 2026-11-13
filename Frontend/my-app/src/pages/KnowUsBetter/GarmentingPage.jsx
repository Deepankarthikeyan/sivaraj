import InnerPage from './InnerPage.jsx'

// Source: existing Sivaraj website. Confirm current facts in the database before publishing
// names, capacity, dates, certifications, impact statistics or product specifications.
const config = {
  "pageCode": "GARMENTING",
  "title": "Garmenting",
  "category": "Framework",
  "parent": "/framework",
  "intro": "Explore the connection between fabric, design and finished apparel.",
  "sections": [
    {
      "code": "DESIGN_DEVELOPMENT",
      "title": "Ideas Shaped Into Apparel",
      "body": "Discuss fabric selection, style development and current garment requirements with our team.",
      "image": true
    },
    {
      "code": "PRODUCTION_FLOW",
      "title": "From Design to Finished Garment",
      "body": "",
      "image": false,
      "type": "process"
    },
    {
      "code": "QUALITY_CONTROL",
      "title": "Care Through the Making Process",
      "body": "Speak with our team about garment specifications, inspection and finishing requirements.",
      "image": true
    },
    {
      "code": "PRODUCT_CAPABILITIES",
      "title": "Apparel for Different Occasions",
      "body": "The published garmenting story includes shirts, trousers, innerwear, T-shirts, casualwear and traditional wear.",
      "image": false,
      "type": "cards",
      "items": [
        "Shirts & Trousers",
        "Innerwear",
        "T-shirts & Casualwear",
        "Traditional Wear"
      ]
    }
  ],
  "process": [
    "Design",
    "Fabric Selection",
    "Cutting",
    "Sewing",
    "Finishing",
    "Inspection"
  ],
  "related": [
    [
      "Garments",
      "/goods/garments"
    ],
    [
      "Brands",
      "/enlightenment/brands"
    ]
  ],
  "heroAlt": "Garment manufacturing floor",
  "introAlt": "Apparel cutting and sewing"
}

export default function GarmentingPage() {
  return <InnerPage config={config} />
}
