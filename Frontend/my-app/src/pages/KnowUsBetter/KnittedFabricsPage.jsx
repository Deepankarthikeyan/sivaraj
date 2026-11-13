import InnerPage from './InnerPage.jsx'

// Source: existing Sivaraj website. Confirm current facts in the database before publishing
// names, capacity, dates, certifications, impact statistics or product specifications.
const config = {
  "pageCode": "KNITTED_FABRICS",
  "title": "Knitted Fabrics",
  "category": "Goods",
  "parent": "/goods",
  "intro": "Explore knitted fabric structures and discuss the right specification for your application.",
  "sections": [
    {
      "code": "PRODUCT_RANGE",
      "title": "Explore Knitted Fabric Possibilities",
      "body": "The company’s knitting story lists single jersey, rib, interlock, fleece and terry. Confirm current availability with our team.",
      "image": true
    },
    {
      "code": "CONSTRUCTIONS",
      "title": "Structures With Different Characteristics",
      "body": "Discuss fabric construction, materials and finishing requirements with our team.",
      "image": false,
      "type": "cards",
      "items": [
        "Single Jersey",
        "Rib",
        "Interlock",
        "Fleece",
        "Terry"
      ]
    },
    {
      "code": "APPLICATIONS",
      "title": "From Fabric to Everyday Apparel",
      "body": "The published knitting story describes fabrics used for T-shirts and innerwear.",
      "image": false
    },
    {
      "code": "QUALITY",
      "title": "A Focus on Fabric Requirements",
      "body": "Share your specification and quality requirements with our textile team.",
      "image": true
    }
  ],
  "process": [],
  "related": [
    [
      "Knitting",
      "/framework/knitting"
    ],
    [
      "Garments",
      "/goods/garments"
    ]
  ],
  "heroAlt": "Knitted fabric rolls",
  "introAlt": "Knitted fabric texture and structure"
}

export default function KnittedFabricsPage() {
  return <InnerPage config={config} />
}
