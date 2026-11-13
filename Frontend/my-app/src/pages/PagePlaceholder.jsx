import { Container } from 'react-bootstrap'
export default function PagePlaceholder({ title, message = 'Page development will be added in the next phase.' }) {
  return <main style={{ minHeight: 'calc(100vh - 74px)', paddingTop: 72, color: '#1D2926' }}><Container>
    <h1 className="display-5 mb-3">{title}</h1><p className="lead">{message}</p>
  </Container></main>
}
