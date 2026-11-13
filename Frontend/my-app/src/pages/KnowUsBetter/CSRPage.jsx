import InnerPage from './InnerPage.jsx'

// Source: existing Sivaraj website. Confirm current facts in the database before publishing
// names, capacity, dates, certifications, impact statistics or product specifications.
const config = {
  "pageCode": "CSR",
  "title": "CSR",
  "category": "Know Us Better",
  "parent": "/know-us-better",
  "intro": "Explore our approach to social commitment, community support and environmental responsibility.",
  "sections": [
    {
      "code": "EDUCATION",
      "title": "Learning for Future Generations",
      "body": "The existing company story describes educational support for workforce families and neighbouring communities.",
      "image": true
    },
    {
      "code": "HEALTHCARE",
      "title": "Care for Community Wellbeing",
      "body": "Speak with our team for information about current healthcare initiatives.",
      "image": true
    },
    {
      "code": "COMMUNITY",
      "title": "Spaces That Bring People Together",
      "body": "The company story describes charitable support for community gatherings and food distribution.",
      "image": true
    },
    {
      "code": "ENVIRONMENT",
      "title": "Responsibility Within Our Operations",
      "body": "Rainwater harvesting, tree planting and wind-energy initiatives form part of the published company story.",
      "image": true
    },
    {
      "code": "CSR_IMPACT",
      "title": "Our Community Impact",
      "body": null,
      "image": false,
      "type": "statistics"
    },
    {
      "code": "CSR_REPORTS",
      "title": "Explore Our CSR Reports",
      "body": "Discover approved information about our social commitments.",
      "image": false,
      "type": "document"
    }
  ],
  "process": [],
  "related": [
    [
      "Education",
      "/enlightenment/education"
    ],
    [
      "Natural Energy",
      "/enlightenment/natural-energy"
    ]
  ],
  "heroAlt": "Community and environmental initiatives",
  "introAlt": "Approved community support activity"
}

export default function CSRPage() {
  return <InnerPage config={config} />
}
