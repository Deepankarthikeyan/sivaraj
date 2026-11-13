import { Carousel, Col, Container, Row } from 'react-bootstrap'
import spinningImage from '../../assets/slideshow/spinning-oe.png'

const capabilities = ['Ring Yarn', 'Open-End Yarn', 'Knitted Fabrics', 'Woven Fabrics', 'Garmenting', 'Retail', 'Renewable Energy', 'Education']

export default function LogoMarqueePage() {
  const groups = [capabilities.slice(0, 4), capabilities.slice(4)]
  return <main style={{ color: '#1D2926', background: '#FBFAF6' }}>
    <section className="position-relative overflow-hidden" style={{ minHeight: 560 }}>
      <img src={spinningImage} alt="Sivaraj textile manufacturing network" className="position-absolute w-100 h-100" style={{ objectFit: 'cover' }} />
      <div className="position-absolute w-100 h-100" style={{ background: 'linear-gradient(90deg,rgba(2,38,31,.95),rgba(2,38,31,.72),rgba(2,38,31,.3))' }} />
      <Container className="position-relative text-white d-flex align-items-center" style={{ minHeight: 560 }}><div style={{ maxWidth: 720 }}>
        <p className="text-uppercase fw-semibold mb-3" style={{ color: '#D7AE68', letterSpacing: '.18em', fontSize: 12 }}>One group. Many strengths.</p>
        <h1 className="display-2 mb-4" style={{ fontFamily: 'Georgia,serif', lineHeight: 1.04 }}>Connected by purpose. Built for possibility.</h1>
        <p className="fs-5 mb-0" style={{ maxWidth: 620, color: 'rgba(255,255,255,.76)' }}>An integrated ecosystem bringing together textile expertise, responsible energy and community-focused institutions.</p>
      </div></Container>
    </section>

    <section className="py-5"><Container className="py-lg-5 text-center">
      <p className="text-uppercase fw-semibold" style={{ color: '#B88A3B', letterSpacing: '.18em', fontSize: 11 }}>The Sivaraj ecosystem</p>
      <h2 className="display-5 mb-3" style={{ fontFamily: 'Georgia,serif' }}>Strength across the value chain.</h2>
      <p className="text-secondary mx-auto mb-5" style={{ maxWidth: 680 }}>These refined placeholders can later be replaced with approved company, certification, customer or partner logos.</p>
      <Carousel interval={3000} controls={false} indicators pause="hover" className="pb-5">
        {groups.map((group, groupIndex) => <Carousel.Item key={groupIndex}><Row className="g-3 justify-content-center px-2">
          {group.map((name, index) => <Col xs={6} lg={3} key={name}><div className="bg-white h-100 d-flex flex-column align-items-center justify-content-center p-4 p-lg-5" style={{ minHeight: 190, border: '1px solid #E6E2DA', boxShadow: '0 15px 40px rgba(30,50,44,.05)' }}>
            <div className="rounded-circle d-grid mb-3" style={{ width: 52, height: 52, placeItems: 'center', border: '1px solid #B88A3B', color: '#B88A3B', fontFamily: 'Georgia,serif', fontSize: 19 }}>{String(groupIndex * 4 + index + 1).padStart(2, '0')}</div>
            <h3 className="h6 mb-0 text-uppercase" style={{ letterSpacing: '.08em' }}>{name}</h3>
          </div></Col>)}
        </Row></Carousel.Item>)}
      </Carousel>
    </Container></section>

    <section className="py-5 text-white text-center" style={{ background: '#063F35' }}><Container className="py-lg-4">
      <p className="text-uppercase" style={{ color: '#D7AE68', letterSpacing: '.18em', fontSize: 11 }}>Global mindset</p>
      <h2 className="display-5 mb-3" style={{ fontFamily: 'Georgia,serif' }}>Made in India. Connected to the world.</h2>
      <p className="mx-auto mb-0" style={{ maxWidth: 650, color: 'rgba(255,255,255,.7)' }}>A platform ready to showcase the approved relationships and marks that represent Sivaraj Group’s reach.</p>
    </Container></section>
  </main>
}
