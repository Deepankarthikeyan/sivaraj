import { useEffect, useState } from 'react'
import { Alert, Container, Row, Col, Spinner } from 'react-bootstrap'
import { NavLink as Link } from 'react-router-dom'

const API_URL = import.meta.env.VITE_API_URL?.trim().replace(/\/$/, '')
const api = resource => `${API_URL}/api/website/${resource}/COMPANY_PROFILE`
const colors = { green: '#063F35', dark: '#082F28', gold: '#B88A3B', ivory: '#F6F2E9', ink: '#1D2926', muted: '#66736F', border: '#E6E2DA' }
const heading = { fontFamily: 'Georgia, serif', lineHeight: 1.15 }
const button = { background: colors.green, color: '#fff', borderRadius: 0, padding: '13px 24px' }
const capabilities = ['Cotton Yarn', 'Knitted Fabrics', 'Woven Fabrics', 'Garments']
const values = ['Innovation', 'Customer Focus', 'Operational Excellence', 'Respect', 'Transparency', 'Environmental Responsibility']
const journey = [
  ['Foundation', 'A foundation of textile experience and customer relationships.'],
  ['Manufacturing Growth', 'Continued focus on technology and manufacturing expertise.'],
  ['Integrated Textiles', 'Connecting yarn, fabric and garment capabilities.'],
  ['Global Reach', 'Building long-term partnerships across international markets.'],
  ['Responsible Future', 'Guided by innovation, respect and environmental responsibility.'],
]
// Neutral editorial fallbacks; no unverified dates, capacities or numerical claims.
const fallback = {
  PAGE_HERO: ['Textile Excellence, Woven Through Generations', 'An integrated textile group creating yarn, fabrics and garments through experience, innovation and responsible manufacturing.'],
  WHO_WE_ARE: ['Built on Experience. Driven by Innovation.', 'Sivaraj Spinning Mills is part of Sri Shanmugavel Mills Group, bringing together textile experience, modern manufacturing and a commitment to customer requirements.\n\nIts integrated capabilities cover cotton yarn, knitted fabrics, woven fabrics and garments for Indian and international markets.'],
  OUR_JOURNEY: ['A Journey of Continuous Progress', 'Experience, investment and lasting relationships shape our way forward.'],
  FIBRE_TO_FASHION: ['From Fibre to Finished Fashion', 'Connected manufacturing capabilities help maintain quality and consistency across every stage of production.'],
  VISION: ['Vision', 'To become a globally preferred textile brand and a trusted sourcing partner.'],
  MISSION: ['Mission', 'To progress through innovation and deliver a dependable, premium customer experience.'],
  CORE_VALUES: ['Core Values', values.join('\n')],
  BUSINESS_CAPABILITIES: ['Integrated Capabilities. One Trusted Group.', 'Four product portfolios, connected by a commitment to quality and customer service.'],
  GLOBAL_PRESENCE: ['Crafted in India. Connected to the World.', 'Our textile products serve customers across international markets through a focus on quality, reliability and long-term partnerships.'],
  CORPORATE_PROFILE: ['Discover the Complete SSM Group Story', 'Explore our organisation, capabilities, products and global market presence.'],
  ENQUIRY_BANNER: ['Let’s Weave the Future Together', 'Speak with our team about yarn, fabric, garment and business requirements.'],
}

function normalise(row) {
  return { code: row.section_code, title: row.heading, label: row.subheading, body: row.body_content, action: row.button_text, url: row.button_url }
}
function safeUrl(url) {
  return typeof url === 'string' && /^(\/(?!\/)|https?:\/\/)[^\s\\]*$/i.test(url) ? url : null
}
function Label({ children, light = false }) {
  return <p className="small text-uppercase fw-semibold mb-3" style={{ color: light ? '#E8C58E' : '#806024', letterSpacing: '.16em' }}>{children}</p>
}
function Copy({ text, light = false }) {
  return text ? <p style={{ whiteSpace: 'pre-line', lineHeight: 1.8, color: light ? '#E5ECE8' : colors.muted }}>{text}</p> : null
}
function PageImage({ code, alternateCode, alt, background = false }) {
  const [attempt, setAttempt] = useState(0)
  const imageCode = attempt === 1 && alternateCode ? alternateCode : code
  const failed = attempt >= (alternateCode ? 2 : 1)
  return <div className={background ? 'position-absolute w-100 h-100' : 'position-relative overflow-hidden'}
    style={{ ...(background ? { inset: 0 } : { aspectRatio: '5 / 4', minHeight: 240 }), background: `linear-gradient(135deg, ${colors.dark}, #60766A)` }}>
    {API_URL && !failed && <img src={`${api('page-images')}/${imageCode}`} alt={alt}
      loading={code === 'PAGE_HERO' ? 'eager' : 'lazy'} onError={() => setAttempt(value => value + 1)}
      className="w-100 h-100 position-absolute" style={{ inset: 0, objectFit: 'cover' }} />}
  </div>
}
function Action({ url, children, className = '', style = button }) {
  const target = safeUrl(url)
  if (!target) return null
  return target.startsWith('/') ? <Link to={target} className={`btn ${className}`} style={style}>{children}</Link>
    : <a href={target} className={`btn ${className}`} style={style}>{children}</a>
}

export default function CompanyProfilePage() {
  const [state, setState] = useState({ loading: true, error: false, sections: [] })
  useEffect(() => {
    const controller = new AbortController()
    let active = true
    async function load() {
      try {
        if (!API_URL) throw new Error('API unavailable')
        const response = await fetch(api('page-content'), { signal: controller.signal })
        const result = await response.json()
        const rows = Array.isArray(result) ? result : Array.isArray(result.data) ? result.data : result.data?.data
        if (!response.ok || result.success === false || !Array.isArray(rows)) throw new Error('Content unavailable')
        if (active) setState({ loading: false, error: false, sections: rows.filter(row => typeof row.section_code === 'string').map(normalise) })
      } catch {
        if (active) setState({ loading: false, error: true, sections: [] })
      }
    }
    load()
    const previousTitle = document.title
    document.title = 'Company Profile | Sivaraj Group'
    let meta = document.querySelector('meta[name="description"]')
    const existed = Boolean(meta)
    const previousDescription = meta?.getAttribute('content')
    if (!meta) { meta = document.createElement('meta'); meta.name = 'description'; document.head.append(meta) }
    meta.content = 'Discover Sivaraj Group’s textile experience, integrated manufacturing capabilities, values and global presence.'
    return () => {
      active = false; controller.abort(); document.title = previousTitle
      if (!existed) meta.remove()
      else if (previousDescription === null) meta.removeAttribute('content')
      else meta.content = previousDescription
    }
  }, [])
  const lookup = Object.fromEntries(state.sections.map(section => [section.code, section]))
  const get = code => lookup[code] || { title: fallback[code]?.[0], body: fallback[code]?.[1] }
  const group = prefix => state.sections.filter(section => section.code?.startsWith(prefix))
  const hero = get('PAGE_HERO')
  const who = lookup.WHO_WE_ARE || lookup.INTRODUCTION || get('WHO_WE_ARE')
  const story = lookup.OUR_JOURNEY || lookup.MILESTONES || get('OUR_JOURNEY')
  const fibre = get('FIBRE_TO_FASHION')
  // GLOBAL_REACH is current; preserve existing GLOBAL_PRESENCE database content.
  const global = lookup.GLOBAL_REACH || get('GLOBAL_PRESENCE')
  const profile = get('CORPORATE_PROFILE')
  const enquiry = get('ENQUIRY_BANNER')
  const milestones = group('MILESTONE_')
  // Supply editorially verified numerical facts using STAT_* or COMPANY_STATISTIC* database sections.
  const statistics = [...group('STAT_'), ...group('COMPANY_STATISTIC')]
  const globalStats = group('GLOBAL_STAT_')
  const profileUrl = safeUrl(profile.url)
  const timeline = milestones.length ? milestones : journey.map(([title, body]) => ({ title, body }))
  const coreValues = lookup.CORE_VALUES ? (lookup.CORE_VALUES.body || '').split(/\r?\n|;/).map(value => value.trim()).filter(Boolean) : values
  const handledCodes = new Set(['PAGE_HERO', 'WHO_WE_ARE', 'INTRODUCTION', 'OUR_JOURNEY', 'MILESTONES', 'FIBRE_TO_FASHION', 'VISION', 'MISSION', 'CORE_VALUES', 'BUSINESS_CAPABILITIES', 'GLOBAL_REACH', 'GLOBAL_PRESENCE', 'CORPORATE_PROFILE', 'ENQUIRY_BANNER'])
  const additionalSections = state.sections.filter(item => !handledCodes.has(item.code) && !/^(STAT_|COMPANY_STATISTIC|GLOBAL_STAT_|MILESTONE_)/.test(item.code) && !/^(CAPABILITY|PRODUCT)_[1-4]$/.test(item.code))
  return <main style={{ background: colors.ivory, color: colors.ink, overflowWrap: 'anywhere' }} aria-busy={state.loading}>
    <section className="position-relative overflow-hidden text-white" style={{ background: colors.dark }}>
      <PageImage code="PAGE_HERO" alt="Sivaraj textile manufacturing floor" background />
      <div className="position-absolute w-100 h-100" style={{ inset: 0, background: 'linear-gradient(90deg,rgba(8,47,40,.96),rgba(8,47,40,.55))' }} />
      <Container className="position-relative py-5" style={{ minHeight: 'clamp(540px, 75vh, 660px)', display: 'flex', alignItems: 'center' }}>
        <div style={{ maxWidth: 820 }}>
          <nav aria-label="Breadcrumb" className="small mb-5"><Link className="text-white" to="/">Home</Link><span> / </span><Link className="text-white" to="/know-us-better">Know Us Better</Link><span aria-current="page"> / Company Profile</span></nav>
          <Label light>{hero.label || 'Know Us Better'}</Label>
          <h1 className="mb-4" style={{ ...heading, fontSize: 'clamp(2.6rem, 5.5vw, 4.8rem)' }}>{hero.title}</h1>
          <div style={{ maxWidth: 620 }}><Copy text={hero.body} light /></div>
          {safeUrl(hero.url) ? <Action url={hero.url} className="mt-3" style={{ ...button, background: '#E8C58E', color: colors.dark }}>{hero.action || 'Explore Our Journey'} →</Action>
            : <Link to="#our-journey" onClick={() => document.getElementById('our-journey')?.scrollIntoView()}
              className="btn mt-3" style={{ ...button, background: '#E8C58E', color: colors.dark }}>{hero.action || 'Explore Our Journey'} <span aria-hidden="true">↓</span></Link>}
        </div>
      </Container>
    </section>
    <section className="bg-white border-bottom py-4" aria-label="Company at a glance"><Container><Row className="g-4">
      {(statistics.length ? statistics : ['Decades of Textile Experience', 'Integrated Manufacturing', 'Global Market Reach', 'Responsible Growth'].map(title => ({ title }))).map((item, index) => <Col xs={6} lg key={item.code || index}>
        <p className="fw-semibold mb-1" style={{ color: colors.green }}>{item.title}</p>{item.label && <p className="small mb-1">{item.label}</p>}<Copy text={item.body} />
      </Col>)}
    </Row></Container></section>
    <Container className="py-3">
      {state.loading && <div role="status" className="d-flex align-items-center gap-3 py-3"><Spinner size="sm" animation="border" /><span>Loading company profile…</span></div>}
      {state.error && <Alert variant="light" className="mt-3">Company updates are temporarily unavailable. You can still explore our profile below.</Alert>}
    </Container>
    <section className="py-5"><Container><Row className="g-5 align-items-center">
      <Col lg={6}><PageImage code="WHO_WE_ARE" alt="Textile machinery and integrated manufacturing facility" /></Col>
      <Col lg={6}><Label>{who.label || 'Who we are'}</Label><h2 className="display-5 mb-4" style={heading}>{who.title}</h2><Copy text={who.body} />
        <div className="d-flex flex-wrap gap-2 mt-4">{capabilities.map(label => <span key={label} className="px-3 py-2 small border bg-white">{label}</span>)}</div>
      </Col>
    </Row></Container></section>
    <section id="our-journey" className="py-5 bg-white" style={{ scrollMarginTop: 90 }}><Container><Label>{story.label || 'Our journey'}</Label><h2 className="display-5 mb-3" style={heading}>{story.title}</h2><Copy text={story.body} />
      <Row as="ol" className="list-unstyled g-4 mt-4">{timeline.map((item, index) => <Col as="li" xs={12} lg key={item.code || index}>
        <article className="h-100 ps-4 pt-3" style={{ borderLeft: `2px solid ${colors.gold}` }}><span className="small fw-semibold" style={{ color: '#806024' }}>{item.label || String(index + 1).padStart(2, '0')}</span><h3 className="h5 mt-3">{item.title}</h3><Copy text={item.body} /></article>
      </Col>)}</Row>
    </Container></section>
    <section className="py-5"><Container><Row className="g-5 align-items-center"><Col lg={5}><Label>{fibre.label || 'Fibre to fashion'}</Label><h2 className="display-5 mb-3" style={heading}>{fibre.title}</h2><Copy text={fibre.body} /></Col><Col lg={7}><PageImage code="FIBRE_TO_FASHION" alt="Cotton, yarn and fabric production" /></Col></Row>
      <Row as="ol" className="list-unstyled g-3 mt-4">{['Cotton', 'Spinning', 'Yarn', 'Knitting / Weaving', 'Garmenting', 'Global Delivery'].map((step, index) => <Col as="li" xs={6} lg={2} key={step}><div className="h-100 bg-white p-3 border"><span className="small" style={{ color: '#806024' }}>{String(index + 1).padStart(2, '0')}</span><p className="fw-semibold mt-2 mb-0">{step}</p></div></Col>)}</Row>
    </Container></section>
    <section className="py-5 bg-white" aria-label="Vision, mission and values"><Container><Row className="g-4">
      {['VISION', 'MISSION', 'CORE_VALUES'].map(code => { const item = get(code); return <Col lg={4} key={code}><article className="h-100 p-4 p-xl-5" style={{ background: colors.ivory, borderTop: `3px solid ${colors.gold}` }}><Label>What guides us</Label><h2 className="h2 mb-4" style={heading}>{item.title}</h2>{code === 'CORE_VALUES' ? <ul className="list-unstyled mb-0">{coreValues.map((value, index) => <li key={index} className="py-2 border-bottom">{value.replace(/^[-•]\s*/, '')}</li>)}</ul> : <Copy text={item.body} />}</article></Col> })}
    </Row></Container></section>
    <section className="py-5"><Container><Label>What we create</Label><h2 className="display-5 mb-3" style={heading}>{get('BUSINESS_CAPABILITIES').title}</h2><Copy text={get('BUSINESS_CAPABILITIES').body} /><Row className="g-3 mt-3">
      {capabilities.map((title, index) => { const item = lookup[`CAPABILITY_${index + 1}`] || lookup[`PRODUCT_${index + 1}`]; return <Col sm={6} lg={3} key={title}><article className="p-4 h-100 text-white" style={{ background: index % 2 ? colors.dark : colors.green, minHeight: 210 }}><p style={{ color: '#E8C58E' }}>{String(index + 1).padStart(2, '0')} /</p><h3 className="h4" style={heading}>{item ? item.title : title}</h3><Copy light text={item ? item.body : ['Quality yarn for diverse textile requirements.', 'Versatile fabrics for comfort and performance.', 'Fabrics crafted for consistent quality.', 'Bringing fabric to finished apparel.'][index]} /><Action url={['/goods/cotton-yarn', '/goods/knitted-fabrics', '/goods/woven-fabrics', '/goods/garments'][index]} style={{ color: '#fff', padding: 0 }}>Explore products <span aria-hidden="true">→</span></Action></article></Col> })}
    </Row></Container></section>
    <section className="py-5 text-white" style={{ background: colors.dark }}><Container><Row className="g-5 align-items-center"><Col lg={6}><PageImage code="GLOBAL_REACH" alternateCode="GLOBAL_PRESENCE" alt="Textile products prepared for international delivery" /></Col><Col lg={6}><Label light>{global.label || 'Global presence'}</Label><h2 className="display-5 mb-4" style={heading}>{global.title}</h2><Copy light text={global.body} />{globalStats.map(item => <div key={item.code}><h3 className="h4">{item.title}</h3><Copy light text={item.body} /></div>)}<Action url="/lets-talk" style={{ ...button, background: '#E8C58E', color: colors.dark }}>Business Enquiry →</Action></Col></Row></Container></section>
    <section className="py-5"><Container><div className="p-4 p-lg-5 bg-white border"><Row className="g-4 align-items-center"><Col lg={8}><Label>Corporate profile</Label><h2 className="h1 mb-3" style={heading}>{profile.title}</h2><Copy text={profile.body} />{!profileUrl && <p className="small mb-0">Corporate profile will be available soon</p>}</Col><Col lg={4}><div className="d-flex flex-wrap gap-3">
      {profileUrl ? <><Action url={profileUrl}>Preview Profile</Action><a className="btn border" href={profileUrl} download style={{ color: colors.green }}>Download PDF</a></> : <><button className="btn" style={button} disabled>Preview Profile</button><button className="btn border" disabled>Download PDF</button></>}
    </div></Col></Row></div></Container></section>
    {additionalSections.map(item => <section className="py-5" key={item.code}><Container>{item.label && <Label>{item.label}</Label>}<h2 className="display-6 mb-4" style={heading}>{item.title}</h2><Copy text={item.body} />{item.action && <Action url={item.url}>{item.action}</Action>}</Container></section>)}
    <section className="py-5" aria-label="Related pages"><Container><Label>Continue exploring</Label><h2 className="h2 mb-4" style={heading}>Meet the Wider Sivaraj Story</h2><div className="d-flex flex-wrap gap-3"><Action url="/know-us-better/management-team">Management Team →</Action><Action url="/know-us-better/csr">CSR →</Action><Action url="/know-us-better/global-presence">Global Presence →</Action></div></Container></section>
    <section className="position-relative overflow-hidden text-white" style={{ background: colors.dark }}><PageImage code="ENQUIRY_BANNER" alt="Textile fabric texture" background /><div className="position-absolute w-100 h-100" style={{ inset: 0, background: 'rgba(8,47,40,.88)' }} /><Container className="position-relative py-5"><Row className="g-4 align-items-center"><Col lg={9}><Label light>Start a conversation</Label><h2 className="display-5 mb-3" style={heading}>{enquiry.title}</h2><Copy text={enquiry.body} light /></Col><Col lg={3}><Action url="/lets-talk" style={{ ...button, background: '#E8C58E', color: colors.dark }}>{enquiry.action || 'Let’s Talk'} →</Action></Col></Row></Container></section>
  </main>
}


