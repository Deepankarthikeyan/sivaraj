import InnerPage from './InnerPage.jsx'

// Source: existing Sivaraj website. Confirm current facts in the database before publishing
// names, capacity, dates, certifications, impact statistics or product specifications.
const config = {
  "pageCode": "WOVEN_FABRICS",
  "title": "Woven Fabrics",
  "category": "Goods",
  "parent": "/goods",
  "intro": "Explore woven fabric requirements and the manufacturing stages that support them.",
  "sections": [
    {
      "code": "PRODUCT_RANGE",
      "title": "Explore Our Woven Fabric Offering",
      "body": "Contact our team for current woven fabric options and specifications.",
      "image": true
    },
    {
      "code": "CONSTRUCTIONS",
      "title": "Construction Around Your Requirements",
      "body": "Discuss weave, width, materials and finishing requirements with our team.",
      "image": false
    },
    {
      "code": "APPLICATIONS",
      "title": "Designed for Your Intended Use",
      "body": "Share your application to explore suitable fabric choices.",
      "image": false
    },
    {
      "code": "QUALITY",
      "title": "Inspected Before the Next Stage",
      "body": "The published weaving story describes production checks and physical fabric inspection before packing and delivery.",
      "image": true
    }
  ],
  "process": [],
  "related": [
    [
      "Weaving",
      "/framework/weaving"
    ],
    [
      "Garmenting",
      "/framework/garmenting"
    ]
  ],
  "heroAlt": "Woven fabric rolls",
  "introAlt": "Woven fabric texture and construction"
}

export default function WovenFabricsPage() {
  return <InnerPage config={config} />
}
