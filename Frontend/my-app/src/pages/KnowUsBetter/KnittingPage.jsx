import InnerPage from './InnerPage.jsx'

// Source: existing Sivaraj website. Confirm current facts in the database before publishing
// names, capacity, dates, certifications, impact statistics or product specifications.
const config = {
  "pageCode": "KNITTING",
  "title": "Knitting",
  "category": "Framework",
  "parent": "/framework",
  "intro": "Yarn transformed into knitted structures for fabric and apparel requirements.",
  "sections": [
    {
      "code": "PROCESS_FLOW",
      "title": "From Yarn to Knitted Fabric",
      "body": "",
      "image": false,
      "type": "process"
    },
    {
      "code": "MACHINERY",
      "title": "Inside the Knitting Facility",
      "body": "The published infrastructure story describes circular knitting, open-width and high-leg machines.",
      "image": true
    },
    {
      "code": "FABRIC_CAPABILITIES",
      "title": "Structures for Different Requirements",
      "body": "The company website lists single jersey, rib, interlock, fleece and terry among its knitted fabrics.",
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
      "code": "QUALITY_CONTROL",
      "title": "A Focus on Fabric Consistency",
      "body": "Speak with our team about current fabric specifications and quality requirements.",
      "image": true
    }
  ],
  "process": [
    "Yarn Preparation",
    "Knitting",
    "Fabric Inspection",
    "Finishing",
    "Delivery"
  ],
  "related": [
    [
      "Knitted Fabrics",
      "/goods/knitted-fabrics"
    ],
    [
      "Textile",
      "/enlightenment/textile"
    ]
  ],
  "heroAlt": "Knitting facility production",
  "introAlt": "Circular knitting machines"
}

export default function KnittingPage() {
  return <InnerPage config={config} />
}
