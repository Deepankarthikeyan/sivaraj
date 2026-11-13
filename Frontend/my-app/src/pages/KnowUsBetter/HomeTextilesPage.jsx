import InnerPage from './InnerPage.jsx'

// Source: existing Sivaraj website. Confirm current facts in the database before publishing
// names, capacity, dates, certifications, impact statistics or product specifications.
const config = {
  "pageCode": "HOME_TEXTILES",
  "title": "Home Textiles",
  "category": "Framework",
  "parent": "/framework",
  "intro": "Discuss home-textile requirements with our team and explore approved materials, construction and finishing options.",
  "sections": [
    {
      "code": "PRODUCT_CAPABILITIES",
      "title": "Explore Home Textile Requirements",
      "body": "Contact our team for the current approved home-textile offering.",
      "image": true
    },
    {
      "code": "MATERIALS",
      "title": "Begin With the Right Material",
      "body": "Discuss materials, construction and intended use with our team.",
      "image": true
    },
    {
      "code": "DESIGN_AND_FINISHING",
      "title": "Considered Design and Finishing",
      "body": "Share your design and finishing requirements to explore suitable options.",
      "image": false
    },
    {
      "code": "QUALITY",
      "title": "Quality Around Your Requirements",
      "body": "Speak with our team about specifications and quality expectations.",
      "image": false
    }
  ],
  "process": [],
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
  "heroAlt": "Approved home-textile photograph",
  "introAlt": "Approved home-textile materials"
}

export default function HomeTextilesPage() {
  return <InnerPage config={config} />
}
