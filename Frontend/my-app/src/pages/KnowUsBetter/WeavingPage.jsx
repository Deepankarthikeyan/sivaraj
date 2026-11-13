import InnerPage from './InnerPage.jsx'

// Source: existing Sivaraj website. Confirm current facts in the database before publishing
// names, capacity, dates, certifications, impact statistics or product specifications.
const config = {
  "pageCode": "WEAVING",
  "title": "Weaving",
  "category": "Framework",
  "parent": "/framework",
  "intro": "Explore the preparation, weaving and inspection stages that connect yarn with finished woven fabric.",
  "sections": [
    {
      "code": "PROCESS_FLOW",
      "title": "A Connected Weaving Journey",
      "body": "",
      "image": false,
      "type": "process"
    },
    {
      "code": "MACHINERY",
      "title": "Prepared for Precision Weaving",
      "body": "The published infrastructure story includes direct and sectional warping, sizing and Toyota and Picanol looms.",
      "image": true
    },
    {
      "code": "FABRIC_CAPABILITIES",
      "title": "Fabric Built Around Requirements",
      "body": "Discuss current weave constructions, fabric widths, finishes and sourcing requirements with our team.",
      "image": false
    },
    {
      "code": "QUALITY_CONTROL",
      "title": "Inspection From Loom to Delivery",
      "body": "The company story describes checks during production and physical fabric inspection, followed by roll, bale or pallet packing.",
      "image": true
    }
  ],
  "process": [
    "Warping",
    "Sizing",
    "Weaving",
    "Inspection",
    "Packing"
  ],
  "related": [
    [
      "Woven Fabrics",
      "/goods/woven-fabrics"
    ],
    [
      "Textile",
      "/enlightenment/textile"
    ]
  ],
  "heroAlt": "Weaving looms in operation",
  "introAlt": "Yarn preparation and loom production"
}

export default function WeavingPage() {
  return <InnerPage config={config} />
}
