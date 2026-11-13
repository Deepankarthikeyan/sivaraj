import { Carousel } from 'react-bootstrap'
import mdImage from '../../assets/slideshow/md-placeholder.png'
import cottonImage from '../../assets/slideshow/cotton.png'
import spinningImage from '../../assets/slideshow/spinning-oe.png'
import weavingImage from '../../assets/slideshow/weaving.png'
import knittingImage from '../../assets/slideshow/knitting.png'
import garmentsImage from '../../assets/slideshow/garments-pos.png'
import homeTextilesImage from '../../assets/slideshow/home-textiles.png'

const fabricImage = `${import.meta.env.VITE_API_BASE_URL || ''}/api/website/page-images/welcome-way/fabric-rolls`
const slides = [
  { image: fabricImage, fallback: mdImage, eyebrow: 'Our Fabrics', title: 'Colour, quality and possibilities.', description: 'Discover the textile expertise of Sivaraj Group.', position: 'center' },
  { image: mdImage, eyebrow: 'Leadership', title: 'A vision woven into every possibility.', description: 'Guiding Sivaraj Group with purpose, progress and enduring values.', position: 'center' },
  { image: cottonImage, eyebrow: 'Cotton', title: 'Rooted in nature. Refined by expertise.', description: 'Responsible fibre is where our journey begins.', position: 'center' },
  { image: spinningImage, eyebrow: 'Spinning & OE', title: 'Precision in every strand.', description: 'Advanced spinning technology engineered for consistent quality.', position: 'center' },
  { image: weavingImage, eyebrow: 'Weaving', title: 'Crafting strength into every weave.', description: 'Modern looms bring performance and possibility together.', position: 'center' },
  { image: knittingImage, eyebrow: 'Knitting', title: 'Innovation shaped for comfort.', description: 'Fine knitted fabrics made with care, speed and precision.', position: 'center' },
  { image: garmentsImage, eyebrow: 'Garments & POS', title: 'From thoughtful design to the marketplace.', description: 'Contemporary apparel and retail solutions created to connect.', position: 'center' },
  { image: homeTextilesImage, eyebrow: 'Home Textiles', title: 'Comfort, beautifully woven.', description: 'Elevated home collections with natural texture and timeless appeal.', position: 'center' },
]

export default function WelcomeWayPage() {
  return (
    <main className="bg-dark">
      <Carousel fade interval={5000} pause="hover" touch keyboard aria-label="Sivaraj Group highlights">
        {slides.map((slide, index) => (
          <Carousel.Item key={slide.eyebrow}>
            <div style={{ height: 'clamp(480px, calc(100vh - 74px), 760px)', position: 'relative', overflow: 'hidden' }}>
              <img
                src={slide.image}
                onError={slide.fallback ? (event) => {
                  if (event.currentTarget.getAttribute('src') !== slide.fallback) event.currentTarget.src = slide.fallback
                } : undefined}
                alt={`${slide.eyebrow} at Sivaraj Group`}
                className="d-block w-100 h-100"
                style={{ objectFit: 'cover', objectPosition: slide.position }}
              />
              <div aria-hidden="true" className="position-absolute top-0 start-0 w-100 h-100"
                style={{ background: 'linear-gradient(90deg, rgba(3,35,30,.92) 0%, rgba(3,35,30,.62) 42%, rgba(3,35,30,.08) 78%)' }} />
            </div>
            <Carousel.Caption className="text-start start-0 end-0 h-100 bottom-0 p-0">
              <div className="container-xl h-100 d-flex align-items-center px-4 px-xl-2">
                <div style={{ maxWidth: 650, paddingBottom: 25 }}>
                  <div className="d-flex align-items-center gap-3 mb-3">
                    <span style={{ width: 38, height: 1, background: '#B88A3B' }} />
                    <span className="text-uppercase fw-semibold" style={{ color: '#D8AE65', letterSpacing: '.16em', fontSize: 12 }}>{slide.eyebrow}</span>
                  </div>
                  <h1 className="display-3 fw-normal mb-3" style={{ fontFamily: 'Georgia, serif', lineHeight: 1.08, textShadow: '0 2px 18px rgba(0,0,0,.2)' }}>{slide.title}</h1>
                  <p className="fs-5 mb-4" style={{ maxWidth: 570, color: 'rgba(255,255,255,.82)' }}>{slide.description}</p>
                  <div className="d-flex align-items-center gap-3">
                    <span className="fw-semibold" style={{ color: '#D8AE65' }}>{String(index + 1).padStart(2, '0')}</span>
                    <span style={{ width: 54, height: 1, background: 'rgba(255,255,255,.5)' }} />
                    <span style={{ color: 'rgba(255,255,255,.65)' }}>{String(slides.length).padStart(2, '0')}</span>
                  </div>
                </div>
              </div>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </main>
  )
}
