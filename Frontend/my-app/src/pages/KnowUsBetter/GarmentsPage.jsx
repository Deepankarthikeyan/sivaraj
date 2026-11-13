import InnerPage from './InnerPage.jsx'

// Source: existing Sivaraj website. Confirm current facts in the database before publishing
// names, capacity, dates, certifications, impact statistics or product specifications.
const config = {
  "pageCode": "GARMENTS",
  "title": "Garments",
  "category": "Goods",
  "parent": "/goods",
  "intro": "Explore apparel possibilities connected to the group’s textile and garmenting expertise.",
  "sections": [
    {
      "code": "PRODUCT_RANGE",
      "title": "Apparel for Everyday and Occasion",
      "body": "The published garmenting portfolio includes shirts, trousers, innerwear, T-shirts, casualwear and traditional wear. Confirm current collections with our team.",
      "image": true
    },
    {
      "code": "DESIGN",
      "title": "Style Begins With Your Requirements",
      "body": "Discuss fit, fabric, colour and design requirements with our apparel team.",
      "image": false
    },
    {
      "code": "MANUFACTURING",
      "title": "Connected With Garmenting Expertise",
      "body": "Explore the making process from fabric selection through cutting, sewing and finishing.",
      "image": true,
      "link": "/framework/garmenting"
    },
    {
      "code": "QUALITY",
      "title": "Details That Shape the Finished Product",
      "body": "Speak with our team about product specifications and quality expectations.",
      "image": false
    }
  ],
  "process": [],
  "related": [
    [
      "Garmenting",
      "/framework/garmenting"
    ],
    [
      "Brands",
      "/enlightenment/brands"
    ]
  ],
  "heroAlt": "Approved garment collection",
  "introAlt": "Finished apparel and fabric detail"
}

export default function GarmentsPage() {
  return <InnerPage config={config} />
}
