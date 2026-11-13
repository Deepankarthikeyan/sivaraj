import { useEffect, useState } from 'react'
import { Alert, Col, Container, Row, Spinner } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

const API_URL = import.meta.env.VITE_API_URL?.trim().replace(/\/$/, '')
const palette = { green: '#063F35', dark: '#082F28', gold: '#B88A3B', ivory: '#F6F2E9', text: '#1D2926', muted: '#66736F' }
const headingStyle = { fontFamily: 'Georgia, serif', lineHeight: 1.15 }
const actionStyle = { background: palette.green, color: '#fff', borderRadius: 0, padding: '12px 24px' }
const endpoint = (pageCode, sectionCode) => `${API_URL}/api/website/page-images/${pageCode}/${sectionCode}`

function normalise(row) {
  return { code: row.section_code, title: row.heading, label: row.subheading, body: row.body_content, action: row.button_text, url: row.button_url }
}
function validUrl(url) {
  return typeof url === 'string' && /^(\/(?!\/)|https?:\/\/)[^\s\\]*$/i.test(url)
}
function Image({ pageCode, code, alt, background = false, initials }) {
  const [failed, setFailed] = useState(false)
  return <div className={background ? 'position-absolute w-100 h-100' : 'position-relative overflow-hidden'} style={{
    ...(background ? { inset: 0 } : { aspectRatio: initials ? '4 / 5' : '4 / 3', minHeight: 220 }),
    background: `linear-gradient(135deg, ${palette.dark}, #637A6D)`,
  }}>
    {initials && <span aria-hidden="true" className="position-absolute top-50 start-50 translate-middle display-3 text-white">{initials}</span>}
    {API_URL && !failed && <img src={endpoint(pageCode, code)} alt={alt} loading={code === 'PAGE_HERO' ? 'eager' : 'lazy'}
      onError={() => setFailed(true)} className="position-absolute w-100 h-100" style={{ inset: 0, objectFit: 'cover' }} />}
  </div>
}
function Label({ children, light = false }) {
  return <p className="small text-uppercase fw-semibold mb-3" style={{ letterSpacing: '.14em', color: light ? '#E8C58E' : '#806024' }}>{children}</p>
}
function Copy({ text, light = false }) {
  // Preserve every paragraph visibly; database editors supply concise section copy.
  return text ? <div style={{ color: light ? '#E5ECE8' : palette.muted }}>{text.split(/\n\s*\n/).map((paragraph, index) => <p key={index} style={{ whiteSpace: 'pre-line', lineHeight: 1.8 }}>{paragraph}</p>)}</div> : null
}
function Action({ url, children, light = false }) {
  if (!validUrl(url)) return null
  const style = light ? { ...actionStyle, background: '#E8C58E', color: palette.dark } : actionStyle
  return url.startsWith('/') ? <NavLink className="btn" to={url} style={style}>{children}</NavLink> : <a className="btn" href={url} style={style}>{children}</a>
}
function Content({ item, titleTag: Title = 'h2' }) {
  return <>{item.label && <Label>{item.label}</Label>}<Title className={Title === 'h3' ? 'h4 mb-3' : 'display-6 mb-4'} style={headingStyle}>{item.title}</Title><Copy text={item.body} />{item.action && <Action url={item.url}>{item.action} →</Action>}</>
}
function Process({ steps }) {
  return <Row as="ol" className="list-unstyled g-3 mt-4">{steps.map((step, index) => <Col as="li" xs={6} md={4} lg key={index}><div className="h-100 p-3 bg-white border"><span className="small fw-semibold" style={{ color: '#806024' }}>{String(index + 1).padStart(2, '0')}</span><p className="fw-semibold mt-2 mb-0">{step.replace(/^[-•]\s*/, '')}</p></div></Col>)}</Row>
}

export default function InnerPage({ config }) {
  // A keyed view clears both content and failed-image state when switching pages.
  return <PageView key={config.pageCode} config={config} />
}
function PageView({ config }) {
  const { pageCode, title, category, parent, intro, sections, process, related } = config
  const [state, setState] = useState({ loading: true, error: false, rows: [] })
  useEffect(() => {
    const controller = new AbortController()
    let active = true
    async function load() {
      try {
        if (!API_URL) throw new Error('Unavailable')
        const response = await fetch(`${API_URL}/api/website/page-content/${pageCode}`, { signal: controller.signal })
        const result = await response.json()
        const rows = Array.isArray(result) ? result : Array.isArray(result.data) ? result.data : result.data?.data
        if (!response.ok || result.success === false || !Array.isArray(rows)) throw new Error('Unavailable')
        if (active) setState({ loading: false, error: false, rows: rows.filter(row => typeof row.section_code === 'string').map(normalise) })
      } catch {
        if (active) setState({ loading: false, error: true, rows: [] })
      }
    }
    load()
    const previousTitle = document.title
    document.title = `${title} | Sivaraj Group`
    let meta = document.querySelector('meta[name="description"]')
    const existed = Boolean(meta)
    const previousDescription = meta?.getAttribute('content')
    if (!meta) { meta = document.createElement('meta'); meta.name = 'description'; document.head.append(meta) }
    meta.content = `Explore Sivaraj Group’s ${title.toLowerCase()}, capabilities and commitments. ${intro}`
    return () => {
      active = false; controller.abort(); document.title = previousTitle
      if (!existed) meta.remove()
      else if (previousDescription === null) meta.removeAttribute('content')
      else meta.content = previousDescription
    }
  }, [pageCode, title, intro])
  const lookup = Object.fromEntries(state.rows.map(row => [row.code, row]))
  const get = (code, fallbackTitle, fallbackBody) => lookup[code] || { code, title: fallbackTitle, body: fallbackBody }
  const hero = get('PAGE_HERO', title, intro)
  const introduction = get('INTRODUCTION', `Discover ${title}`, intro)
  const enquiry = get('ENQUIRY_BANNER', 'Let’s Build Something Together', 'Speak with our team about your requirements and explore the next step.')
  const members = state.rows.filter(row => /^(MANAGEMENT_MEMBER_|TEAM_MEMBER_)/.test(row.code))
  const knownCodes = new Set(['PAGE_HERO', 'INTRODUCTION', 'ENQUIRY_BANNER', ...sections.map(section => section.code), ...members.map(member => member.code)])
  const extraSections = state.rows.filter(row => !knownCodes.has(row.code))
  return <main style={{ background: palette.ivory, color: palette.text, overflowWrap: 'anywhere' }} aria-busy={state.loading}>
    <section className="position-relative overflow-hidden text-white" style={{ background: palette.dark }}>
      <Image pageCode={pageCode} code="PAGE_HERO" alt={`${title}: ${config.heroAlt}`} background />
      <div className="position-absolute w-100 h-100" style={{ inset: 0, background: 'linear-gradient(90deg,rgba(8,47,40,.96),rgba(8,47,40,.52))' }} />
      <Container className="position-relative d-flex align-items-center py-5" style={{ minHeight: 'clamp(460px, 68vh, 640px)' }}><div style={{ maxWidth: 800 }}>
        <nav aria-label="Breadcrumb" className="small mb-5"><NavLink to="/" className="text-white">Home</NavLink><span> / </span><NavLink to={parent} className="text-white">{category}</NavLink><span aria-current="page"> / {title}</span></nav>
        <Label light>{hero.label || category}</Label><h1 className="mb-4" style={{ ...headingStyle, fontSize: 'clamp(2.8rem, 6vw, 5rem)' }}>{hero.title}</h1><div style={{ maxWidth: 640 }}><Copy text={hero.body} light /></div>
        {hero.action && <Action url={hero.url} light>{hero.action} →</Action>}
      </div></Container>
    </section>
    <Container>{state.loading && <div role="status" className="py-4 d-flex gap-3 align-items-center"><Spinner size="sm" animation="border" /><span>Loading {title.toLowerCase()}…</span></div>}{state.error && <Alert variant="light" className="mt-4">Latest updates are temporarily unavailable. Explore the overview below or contact our team.</Alert>}</Container>
    <section className="py-5"><Container><Row className="g-5 align-items-center"><Col lg={6}><Image pageCode={pageCode} code="INTRODUCTION" alt={config.introAlt} /></Col><Col lg={6}><Label>{category} / {title}</Label><Content item={introduction} /></Col></Row></Container></section>
    {sections.map((section, index) => {
      const item = get(section.code, section.title, section.body)
      if (section.type === 'members') return <section key={section.code} className="py-5 bg-white"><Container><Label>Our management</Label><h2 className="display-6 mb-4" style={headingStyle}>People Behind Our Direction</h2>{members.length ? <Row className="g-4">{members.map(member => <Col md={6} xl={4} key={member.code}><article className="h-100 border"><Image pageCode={pageCode} code={member.code} alt={member.title ? `Portrait of ${member.title}` : 'Management portrait'} initials={member.title?.replace(/^Shri[.\s]*/i, '').split(/\s+/).map(word => word[0]).slice(0, 2).join('') || 'SSM'} /><div className="p-4"><h3 className="h4" style={headingStyle}>{member.title}</h3>{member.label && <p className="fw-semibold">{member.label}</p>}<Copy text={member.body} /></div></article></Col>)}</Row> : <p style={{ color: palette.muted }}>Contact our team for current leadership and management information.</p>}</Container></section>
      if (section.type === 'document') return <section key={section.code} className="py-5"><Container><div className="p-4 p-lg-5 border bg-white"><Content item={{ ...item, action: null }} />{validUrl(item.url) ? <div className="d-flex flex-wrap gap-3"><Action url={item.url}>Preview Report</Action><a href={item.url} download className="btn border" style={{ color: palette.green }}>Download PDF</a></div> : <><p className="small">Reports will be available soon.</p><button className="btn" style={actionStyle} disabled>Preview Report</button><button className="btn border ms-2" disabled>Download PDF</button></>}</div></Container></section>
      if (section.type === 'statistics' && !lookup[section.code]) return null
      const steps = section.type === 'process' ? (lookup[section.code]?.body ? lookup[section.code].body.split(/\r?\n/).filter(Boolean) : process || []) : []
      return <section key={section.code} className={`py-5 ${index % 2 === 0 ? 'bg-white' : ''}`}><Container>
        {section.image ? <Row className="g-5 align-items-center"><Col lg={6} className={index % 2 ? 'order-lg-2' : ''}><Image pageCode={pageCode} code={section.code} alt={section.alt || `${title}: ${section.title.toLowerCase()}`} /></Col><Col lg={6}><Label>{section.label || title}</Label><Content item={item} />{section.link && <Action url={section.link}>{section.linkLabel || 'Explore related capabilities'} →</Action>}</Col></Row>
          : <><Label>{section.label || title}</Label><Content item={section.type === 'process' || (section.type === 'cards' && lookup[section.code]?.body) ? { ...item, body: null } : item} />{steps.length > 0 && <Process steps={steps} />}
            {section.type === 'cards' && <Row className="g-3 mt-3">{(lookup[section.code]?.body ? lookup[section.code].body.split(/\r?\n/).filter(Boolean) : section.items || []).map((text, cardIndex) => <Col sm={6} lg={4} key={cardIndex}><div className="p-4 h-100 border" style={{ background: palette.ivory }}><span className="small" style={{ color: '#806024' }}>{String(cardIndex + 1).padStart(2, '0')}</span><p className="mb-0 mt-2" style={{ whiteSpace: 'pre-line' }}>{text.replace(/^[-•]\s*/, '')}</p></div></Col>)}</Row>}
          </>}
      </Container></section>
    })}
    {extraSections.map(item => <section className="py-5" key={item.code}><Container><Content item={item} /></Container></section>)}
    <section className="py-5" aria-label="Related pages"><Container><Label>Continue exploring</Label><h2 className="h2 mb-4" style={headingStyle}>Connected Expertise</h2><div className="d-flex flex-wrap gap-3">{related.map(([label, url]) => <Action key={url} url={url}>{label} →</Action>)}</div></Container></section>
    <section className="position-relative overflow-hidden text-white" style={{ background: palette.dark }}><Image pageCode={pageCode} code="ENQUIRY_BANNER" alt={`${title} detail for business enquiries`} background /><div className="position-absolute w-100 h-100" style={{ inset: 0, background: 'rgba(8,47,40,.9)' }} /><Container className="position-relative py-5"><Row className="g-4 align-items-center"><Col lg={9}><Label light>Start a conversation</Label><h2 className="display-5 mb-3" style={headingStyle}>{enquiry.title}</h2><Copy text={enquiry.body} light /></Col><Col lg={3}><Action url="/lets-talk" light>{enquiry.action || 'Let’s Talk'} →</Action></Col></Row></Container></section>
  </main>
}
