import InnerPage from './InnerPage.jsx'

// Source: existing Sivaraj website. Confirm current facts in the database before publishing
// names, capacity, dates, certifications, impact statistics or product specifications.
const config = {
  "pageCode": "GLOBAL_PRESENCE",
  "title": "Global Presence",
  "category": "Know Us Better",
  "parent": "/know-us-better",
  "intro": "Textile expertise from India, connected to customers through long-term international relationships.",
  "sections": [
    {
      "code": "WORLD_MAP",
      "title": "A View of Our Global Reach",
      "body": "Our team can help you explore current markets and export requirements.",
      "image": true
    },
    {
      "code": "EXPORT_MARKETS",
      "title": "Built Around Lasting Partnerships",
      "body": "Quality, dependable service and an understanding of customer requirements support our international relationships.",
      "image": true
    },
    {
      "code": "GLOBAL_STATISTICS",
      "title": "Our Reach in Numbers",
      "body": null,
      "image": false,
      "type": "statistics"
    },
    {
      "code": "MARKET_REGIONS",
      "title": "Connecting Across Markets",
      "body": "Contact our team for current regional availability and business support.",
      "image": false
    },
    {
      "code": "CORPORATE_OFFICE",
      "title": "Connect With Our Corporate Team",
      "body": "Speak with our team about product sourcing, export requirements and business enquiries.",
      "image": false
    }
  ],
  "process": [],
  "related": [
    [
      "Textile",
      "/enlightenment/textile"
    ],
    [
      "Cotton Yarn",
      "/goods/cotton-yarn"
    ]
  ],
  "heroAlt": "Textile exports and global delivery",
  "introAlt": "Textile products prepared for export"
}

export default function GlobalPresencePage() {
  return <InnerPage config={config} />
}
