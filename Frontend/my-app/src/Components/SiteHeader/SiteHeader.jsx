import { useState } from 'react'
import { Container, Dropdown, Nav, Navbar } from 'react-bootstrap'
import { NavLink, useLocation } from 'react-router-dom'
import logo from '../../assets/sivaraj-spinning-mills-logo.png'

const links = [
  ['Welcome Way', '/'], ['Know Us Better', '/know-us-better'],
  ['Enlightenment', '/enlightenment'], ['Framework', '/framework'], ['Goods', '/goods'],
  ['Credentials', '/credentials'], ['Logo Marquee', '/logo-marquee'],
]
const colors = { green: '#063F35', gold: '#B88A3B', text: '#1D2926', border: '#E6E2DA' }
const dropdowns = {
  '/know-us-better': [['Company Profile', 'company-profile'], ['Management Team', 'management-team'], ['CSR', 'csr'], ['Global Presence', 'global-presence']],
  '/enlightenment': [['Textile', 'textile'], ['Education', 'education'], ['Natural Energy', 'natural-energy'], ['Brands', 'brands']],
  '/framework': [['Spinning', 'spinning'], ['Knitting', 'knitting'], ['Weaving', 'weaving'], ['Garmenting', 'garmenting'], ['Home Textiles', 'home-textiles']],
  '/goods': [['Cotton Yarn', 'cotton-yarn'], ['Knitted Fabrics', 'knitted-fabrics'], ['Woven Fabrics', 'woven-fabrics'], ['Garments', 'garments']],
}

export default function SiteHeader() {
  const { pathname } = useLocation()
  const [dropdownOpen, setDropdownOpen] = useState(null)
  const [expanded, setExpanded] = useState(false)
  const closeMenu = () => { setExpanded(false); setDropdownOpen(null) }
  return (
    <Navbar expand="xl" expanded={expanded} className="bg-white sticky-top py-0"
      style={{ minHeight: 74, borderBottom: `1px solid ${colors.border}`, boxShadow: '0 3px 15px rgba(29,41,38,.06)', zIndex: 1030 }}>
      <Container fluid className="px-3 px-xl-4">
        <Navbar.Brand as={NavLink} to="/" onClick={closeMenu} className="me-auto me-lg-4 py-1">
          <img src={logo} alt="Sivaraj Group" style={{ width: 184, height: 60, objectFit: 'contain' }} />
        </Navbar.Brand>
        <div className="d-flex d-xl-none align-items-center gap-2">
          <button type="button" aria-label="Search" className="btn border-0 p-2" style={{ color: colors.text }}><SearchIcon /></button>
          <Navbar.Toggle aria-label={expanded ? 'Close navigation menu' : 'Open navigation menu'}
            onClick={() => { setExpanded((value) => !value); setDropdownOpen(null) }} className="border-0 shadow-none p-2" />
        </div>
        <Navbar.Collapse className="pb-3 pb-xl-0">
          <Nav className="ms-auto align-items-stretch align-items-xl-center">
            {links.map(([label, path]) => dropdowns[path] ? (
              <Dropdown as={Nav.Item} key={path} show={dropdownOpen === path} onToggle={open => setDropdownOpen(open ? path : null)} focusFirstItemOnShow="keyboard"
                style={{ '--bs-dropdown-link-color': colors.green, '--bs-dropdown-link-hover-color': '#fff', '--bs-dropdown-link-hover-bg': colors.green, '--bs-dropdown-link-active-bg': colors.green }}>
                <Dropdown.Toggle as="button" type="button" id={`${path.slice(1)}-dropdown`} aria-haspopup="true" aria-expanded={dropdownOpen === path}
                  className="nav-link px-2 py-3 py-xl-4 text-nowrap w-100 text-start"
                  style={{ background: 'transparent', border: 0, borderRadius: 0, color: pathname === path || pathname.startsWith(path + '/') ? colors.green : colors.text, fontSize: 13, fontWeight: pathname === path || pathname.startsWith(path + '/') ? 600 : 400, borderBottom: pathname === path || pathname.startsWith(path + '/') ? `2px solid ${colors.gold}` : '2px solid transparent' }}>
                  {label}
                </Dropdown.Toggle>
                <Dropdown.Menu className="shadow-sm rounded-0 p-2" style={{ minWidth: 230, borderColor: colors.border, borderTop: `3px solid ${colors.gold}` }}>
                  {dropdowns[path].map(([title, slug]) => <Dropdown.Item as={NavLink} key={slug} to={path + '/' + slug}
                    className="py-3 px-3" onClick={closeMenu} active={pathname.replace(/\/$/, '') === path + '/' + slug}>{title}</Dropdown.Item>)}
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <Nav.Link key={path} as={NavLink} to={path} end={path === '/'} onClick={closeMenu}
                className="px-2 py-3 py-xl-4 text-nowrap"
                style={({ isActive }) => ({ color: isActive ? colors.green : colors.text, fontSize: 13,
                  fontWeight: isActive ? 600 : 400, borderBottom: isActive ? `2px solid ${colors.gold}` : '2px solid transparent' })}>
                {label}
              </Nav.Link>
            ))}
            <button type="button" aria-label="Search" className="btn border-0 d-none d-xl-flex align-items-center px-2" style={{ color: colors.text }}><SearchIcon /></button>
            <Nav.Link as={NavLink} to="/lets-talk" onClick={closeMenu}
              className="rounded-0 px-3 py-3 py-xl-2 ms-xl-2 text-center text-nowrap"
              style={({ isActive }) => ({ color: '#FFFFFF', background: colors.green,
                border: isActive ? `2px solid ${colors.gold}` : '2px solid transparent' })}>
              Let&apos;s Talk
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

function SearchIcon() {
  return <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" />
  </svg>
}
