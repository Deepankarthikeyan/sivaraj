import InnerPage from './InnerPage.jsx'

// Source: existing Sivaraj website. Confirm current facts in the database before publishing
// names, capacity, dates, certifications, impact statistics or product specifications.
const config = {
  "pageCode": "EDUCATION",
  "title": "Education",
  "category": "Enlightenment",
  "parent": "/enlightenment",
  "intro": "Discover the group’s education interests and commitment to learning.",
  "sections": [
    {
      "code": "INSTITUTIONS",
      "title": "Education With a Shared Purpose",
      "body": "Contact our team for current institution information and approved programmes.",
      "image": true
    },
    {
      "code": "LEARNING_ENVIRONMENT",
      "title": "Creating Space for Learning",
      "body": "Explore approved information about learning environments and educational support.",
      "image": true
    },
    {
      "code": "STUDENT_DEVELOPMENT",
      "title": "Supporting the Next Generation",
      "body": "Speak with our team about student development and learning opportunities.",
      "image": false
    },
    {
      "code": "SOCIAL_COMMITMENT",
      "title": "Learning Within the Community",
      "body": "The company story describes education support for workforce families and neighbouring communities.",
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
      "Company Profile",
      "/know-us-better/company-profile"
    ]
  ],
  "heroAlt": "Education and learning environment",
  "introAlt": "Approved educational institution or learning space"
}

export default function EducationPage() {
  return <InnerPage config={config} />
}
