import { Outlet } from 'react-router-dom'
import SiteHeader from '../../Components/SiteHeader/SiteHeader.jsx'
import { NavLink } from 'react-router-dom'
export default function PublicLayout() {
  return <><SiteHeader /><Outlet /><footer className="py-5 text-white" style={{ background: '#082F28' }}>
    <div className="container"><div className="row g-4"><div className="col-lg-6"><p className="h4 mb-3" style={{ fontFamily: 'Georgia, serif' }}>Sivaraj Group</p><p className="small mb-0">Textile expertise. Connected possibilities.</p></div>
      <nav aria-label="Footer navigation" className="col-lg-6 d-flex flex-wrap align-items-start gap-4">
        <NavLink className="text-white" to="/know-us-better/company-profile">Company Profile</NavLink><NavLink className="text-white" to="/enlightenment/textile">Textile</NavLink><NavLink className="text-white" to="/framework/spinning">Framework</NavLink><NavLink className="text-white" to="/goods/cotton-yarn">Goods</NavLink><NavLink className="text-white" to="/lets-talk">Let’s Talk</NavLink>
      </nav></div></div>
  </footer></>
}
