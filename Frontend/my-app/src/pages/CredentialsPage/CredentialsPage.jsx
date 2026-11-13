import { Card, Col, Container, Row } from 'react-bootstrap'
import weavingImage from '../../assets/slideshow/weaving.png'

const credentials = [
  ['01', 'Certified processes', 'The knitting operation is presented by Sivaraj as a GOTS organic-certified unit.'],
  ['02', 'Quality at every stage', 'Cotton selection, modern machinery and process controls support consistent textile performance.'],
  ['03', 'Integrated capability', 'A connected setup spanning yarn, fabric, garmenting and retail supports end-to-end execution.'],
  ['04', 'Responsible progress', 'Wind and solar initiatives form part of the wider group’s long-term approach to manufacturing.'],
]

export default function CredentialsPage() {
  return <main style={{ color: '#1D2926', background: '#F8F6F0' }}>
    <section className="position-relative overflow-hidden d-flex align-items-end" style={{ minHeight: 'clamp(430px, 62vh, 650px)' }}>
      <img src={weavingImage} alt="Precision weaving at Sivaraj Group" className="position-absolute w-100 h-100" style={{ objectFit: 'cover' }} />
      <div className="position-absolute w-100 h-100" style={{ background: 'linear-gradient(90deg,rgba(2,40,33,.94),rgba(2,40,33,.55),rgba(2,40,33,.15))' }} />
      <Container className="position-relative text-white pb-5 mb-lg-4">
        <p className="text-uppercase fw-semibold mb-3" style={{ color: '#D7AE68', letterSpacing: '.18em', fontSize: 12 }}>Credentials</p>
        <h1 className="display-2 mb-3" style={{ fontFamily: 'Georgia,serif', maxWidth: 760 }}>Proof behind every promise.</h1>
        <p className="fs-5 mb-0" style={{ maxWidth: 620, color: 'rgba(255,255,255,.78)' }}>Quality is built through disciplined processes, responsible choices and an integrated manufacturing ecosystem.</p>
      </Container>
    </section>

    <section className="py-5"><Container className="py-lg-5">
      <Row className="align-items-end mb-5 g-4"><Col lg={7}>
        <p className="text-uppercase fw-semibold" style={{ color: '#B88A3B', letterSpacing: '.16em', fontSize: 11 }}>Built to earn confidence</p>
        <h2 className="display-5 mb-0" style={{ fontFamily: 'Georgia,serif' }}>Standards that travel through every thread.</h2>
      </Col><Col lg={5}><p className="mb-0 text-secondary lh-lg">Our credentials area is designed to become the single source for approved certificates, profiles, catalogues and sustainability documents.</p></Col></Row>
      <Row className="g-4">{credentials.map(([number,title,copy]) => <Col md={6} key={title}><Card className="h-100 border-0 rounded-0 p-3 p-lg-4" style={{ background: '#FFFFFF', boxShadow: '0 18px 50px rgba(20,50,42,.07)' }}><Card.Body>
        <div className="d-flex justify-content-between align-items-start mb-4"><span className="fs-5" style={{ color: '#B88A3B' }}>{number}</span><span style={{ width: 48, height: 1, background: '#B88A3B', marginTop: 13 }} /></div>
        <h3 className="h3 mb-3" style={{ fontFamily: 'Georgia,serif' }}>{title}</h3><p className="text-secondary lh-lg mb-0">{copy}</p>
      </Card.Body></Card></Col>)}</Row>
    </Container></section>

    <section className="py-5 text-white" style={{ background: '#063F35' }}><Container className="py-lg-4"><Row className="align-items-center g-4">
      <Col lg={7}><p className="text-uppercase mb-2" style={{ color: '#D7AE68', letterSpacing: '.16em', fontSize: 11 }}>Document centre</p><h2 className="display-6 mb-2" style={{ fontFamily: 'Georgia,serif' }}>Official documents, coming next.</h2><p className="mb-0" style={{ color: 'rgba(255,255,255,.7)' }}>Approved PDF certificates and company publications can be connected here without changing this page layout.</p></Col>
      <Col lg={5} className="text-lg-end"><span className="d-inline-block border px-4 py-3" style={{ borderColor: '#B88A3B !important', color: '#D7AE68' }}>Awaiting approved documents</span></Col>
    </Row></Container></section>
  </main>
}
