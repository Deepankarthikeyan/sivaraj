import InnerPage from './InnerPage.jsx'

// Source: existing Sivaraj website. Confirm current facts in the database before publishing
// names, capacity, dates, certifications, impact statistics or product specifications.
const config = {
  "pageCode": "BRANDS",
  "title": "Brands",
  "category": "Enlightenment",
  "parent": "/enlightenment",
  "intro": "Explore the connection between textile expertise, apparel and the Chennis brand.",
  "sections": [
    {
      "code": "BRAND_PORTFOLIO",
      "title": "A Textile Story in Everyday Wear",
      "body": "The existing company website identifies Chennis as a brand of Sivaraj Spinning Mills.",
      "image": false,
      "type": "cards",
      "items": [
        "Chennis"
      ]
    },
    {
      "code": "CHENNIS",
      "title": "Chennis: Style for Everyday Life",
      "body": "The published Chennis story focuses on casual and lifestyle apparel, with shirts, trousers, T-shirts and traditional wear.",
      "image": true
    },
    {
      "code": "BRAND_VALUES",
      "title": "Designed Around the Customer",
      "body": "Style, fit and changing customer requirements shape the published brand story.",
      "image": true
    },
    {
      "code": "MARKET_PRESENCE",
      "title": "Connect With Our Brand Team",
      "body": "Contact our team for current brand availability, approved collections and partnership opportunities.",
      "image": false
    }
  ],
  "process": [],
  "related": [
    [
      "Garments",
      "/goods/garments"
    ],
    [
      "Garmenting",
      "/framework/garmenting"
    ]
  ],
  "heroAlt": "Approved Chennis apparel photograph",
  "introAlt": "Apparel collection without unapproved logos"
}

export default function BrandsPage() {
  return <InnerPage config={config} />
}
