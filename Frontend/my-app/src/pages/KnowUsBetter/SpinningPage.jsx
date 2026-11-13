import InnerPage from './InnerPage.jsx'

// Source: existing Sivaraj website. Confirm current facts in the database before publishing
// names, capacity, dates, certifications, impact statistics or product specifications.
const config = {
  "pageCode": "SPINNING",
  "title": "Spinning",
  "category": "Framework",
  "parent": "/framework",
  "intro": "From selected cotton to finished yarn, explore the connected stages of spinning and quality control.",
  "sections": [
    {
      "code": "PROCESS_FLOW",
      "title": "Cotton to Yarn, Step by Step",
      "body": "",
      "image": false,
      "type": "process"
    },
    {
      "code": "MACHINERY",
      "title": "Technology Across the Spinning Floor",
      "body": "The published infrastructure story describes bale preparation, carding, combing, drawing, roving, ring spinning and winding machinery.",
      "image": true
    },
    {
      "code": "QUALITY_CONTROL",
      "title": "Attention at Every Production Stage",
      "body": "Raw cotton inspection, contamination removal, trained operators and yarn conditioning support the published quality approach.",
      "image": true
    },
    {
      "code": "CAPABILITIES",
      "title": "Connected Spinning Capabilities",
      "body": "Discuss current yarn specifications, available processes and production requirements with our team.",
      "image": false
    }
  ],
  "process": [
    "Blow Room",
    "Carding",
    "Pre-comber Drawing",
    "Unilap",
    "Combing",
    "Finisher Drawing",
    "Roving",
    "Spinning",
    "Auto-cone Winding",
    "Yarn Conditioning",
    "Packing"
  ],
  "related": [
    [
      "Cotton Yarn",
      "/goods/cotton-yarn"
    ],
    [
      "Textile",
      "/enlightenment/textile"
    ]
  ],
  "heroAlt": "Spinning production floor",
  "introAlt": "Cotton preparation and yarn production"
}

export default function SpinningPage() {
  return <InnerPage config={config} />
}
