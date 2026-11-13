import InnerPage from './InnerPage.jsx'

// Source: existing Sivaraj website. Confirm current facts in the database before publishing
// names, capacity, dates, certifications, impact statistics or product specifications.
const config = {
  "pageCode": "TEXTILE",
  "title": "Textile",
  "category": "Enlightenment",
  "parent": "/enlightenment",
  "intro": "An integrated textile journey linking yarn, fabrics and garments with product development and customer partnerships.",
  "sections": [
    {
      "code": "SPINNING",
      "title": "The Beginning of Every Fabric",
      "body": "Cotton selection and spinning create the yarn that connects our textile capabilities.",
      "image": true,
      "link": "/framework/spinning"
    },
    {
      "code": "KNITTING",
      "title": "Structures Designed for Comfort",
      "body": "Knitting connects yarn with fabrics for apparel and other textile requirements.",
      "image": true,
      "link": "/framework/knitting"
    },
    {
      "code": "WEAVING",
      "title": "Fabric Made With Precision",
      "body": "Weaving brings preparation, loom operations and inspection together.",
      "image": true,
      "link": "/framework/weaving"
    },
    {
      "code": "GARMENTING",
      "title": "From Fabric to Finished Apparel",
      "body": "Design, cutting, sewing and finishing connect textile production with finished garments.",
      "image": true,
      "link": "/framework/garmenting"
    },
    {
      "code": "HOME_TEXTILES",
      "title": "Explore Home Textile Possibilities",
      "body": "Speak with our team about approved home-textile capabilities and sourcing requirements.",
      "image": true,
      "link": "/framework/home-textiles"
    },
    {
      "code": "PROCESS_FLOW",
      "title": "An Integrated Supply Chain",
      "body": "",
      "image": false,
      "type": "process"
    }
  ],
  "process": [
    "Research & Development",
    "Design Partnership",
    "Integrated Manufacturing",
    "Cut & Sew",
    "Product Promotion",
    "Distribution"
  ],
  "related": [
    [
      "Spinning",
      "/framework/spinning"
    ],
    [
      "Garments",
      "/goods/garments"
    ]
  ],
  "heroAlt": "Integrated textile manufacturing",
  "introAlt": "Yarn, fabric and garment manufacturing"
}

export default function TextilePage() {
  return <InnerPage config={config} />
}
