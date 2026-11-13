import InnerPage from './InnerPage.jsx'

// Source: existing Sivaraj website. Confirm current facts in the database before publishing
// names, capacity, dates, certifications, impact statistics or product specifications.
const config = {
  "pageCode": "COTTON_YARN",
  "title": "Cotton Yarn",
  "category": "Goods",
  "parent": "/goods",
  "intro": "Yarn offerings shaped around textile requirements, with cotton and speciality yarn options described in the company’s published portfolio.",
  "sections": [
    {
      "code": "PRODUCT_RANGE",
      "title": "Yarn for Different Textile Needs",
      "body": "The published portfolio includes cotton, slub, melange, dyed, zero-twist and blended speciality yarns. Contact our team for current availability.",
      "image": true
    },
    {
      "code": "APPLICATIONS",
      "title": "Connecting Yarn With Fabric",
      "body": "The published portfolio identifies cotton yarn for knitted fabric. Discuss your intended use and specification with our team.",
      "image": false
    },
    {
      "code": "QUALITY",
      "title": "Quality Starts With the Fibre",
      "body": "Cotton selection, contamination removal and process checks form part of the published spinning approach.",
      "image": true
    },
    {
      "code": "MANUFACTURING",
      "title": "Follow the Cotton-to-Yarn Journey",
      "body": "Explore the preparation and manufacturing stages behind yarn production.",
      "image": false,
      "link": "/framework/spinning"
    }
  ],
  "process": [],
  "related": [
    [
      "Spinning",
      "/framework/spinning"
    ],
    [
      "Knitted Fabrics",
      "/goods/knitted-fabrics"
    ]
  ],
  "heroAlt": "Cotton yarn cones",
  "introAlt": "Cotton yarn and speciality yarn"
}

export default function CottonYarnPage() {
  return <InnerPage config={config} />
}
