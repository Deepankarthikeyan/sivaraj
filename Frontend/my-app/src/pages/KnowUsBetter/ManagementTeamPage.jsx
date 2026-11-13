import InnerPage from './InnerPage.jsx'

// Source: existing Sivaraj website. Confirm current facts in the database before publishing
// names, capacity, dates, certifications, impact statistics or product specifications.
const config = {
  "pageCode": "MANAGEMENT_TEAM",
  "title": "Management Team",
  "category": "Know Us Better",
  "parent": "/know-us-better",
  "intro": "Leadership shaped by experience and a shared focus on customer requirements.",
  "sections": [
    {
      "code": "LEADERSHIP_MESSAGE",
      "title": "Leadership With a Shared Purpose",
      "body": "Our management brings together strategy, operational experience and a focus on customer satisfaction.",
      "image": true
    },
    {
      "code": "MANAGEMENT_MEMBERS",
      "title": "Our Management",
      "body": null,
      "image": false,
      "type": "members"
    },
    {
      "code": "LEADERSHIP_VALUES",
      "title": "Principles That Guide Our Decisions",
      "body": "Customer focus, respect and transparent business practices guide our approach to leadership.",
      "image": false,
      "type": "cards",
      "items": [
        "Customer Focus",
        "Respect",
        "Transparency",
        "Operational Excellence"
      ]
    }
  ],
  "process": [],
  "related": [
    [
      "Company Profile",
      "/know-us-better/company-profile"
    ],
    [
      "CSR",
      "/know-us-better/csr"
    ]
  ],
  "heroAlt": "Textile leadership and operations",
  "introAlt": "Textile team working together"
}

export default function ManagementTeamPage() {
  return <InnerPage config={config} />
}
