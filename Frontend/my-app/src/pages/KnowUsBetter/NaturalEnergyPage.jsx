import InnerPage from './InnerPage.jsx'

// Source: existing Sivaraj website. Confirm current facts in the database before publishing
// names, capacity, dates, certifications, impact statistics or product specifications.
const config = {
  "pageCode": "NATURAL_ENERGY",
  "title": "Natural Energy",
  "category": "Enlightenment",
  "parent": "/enlightenment",
  "intro": "Explore the group’s natural-energy interests and approach to responsible operations.",
  "sections": [
    {
      "code": "ENERGY_SOURCES",
      "title": "Energy From Natural Resources",
      "body": "The company’s published story includes wind-energy initiatives in Tamil Nadu.",
      "image": true
    },
    {
      "code": "RESPONSIBLE_OPERATIONS",
      "title": "A Focus on Responsible Operations",
      "body": "Speak with our team for current information about energy initiatives and operating practices.",
      "image": true
    },
    {
      "code": "ENVIRONMENTAL_COMMITMENT",
      "title": "Care for Our Shared Environment",
      "body": "The published company story describes rainwater harvesting and tree-planting initiatives alongside natural energy.",
      "image": false
    },
    {
      "code": "FUTURE_VISION",
      "title": "Looking Towards the Future",
      "body": "Contact our team to learn more about approved energy plans and priorities.",
      "image": false
    }
  ],
  "process": [],
  "related": [
    [
      "CSR",
      "/know-us-better/csr"
    ],
    [
      "Textile",
      "/enlightenment/textile"
    ]
  ],
  "heroAlt": "Approved natural-energy infrastructure",
  "introAlt": "Wind-energy initiative"
}

export default function NaturalEnergyPage() {
  return <InnerPage config={config} />
}
