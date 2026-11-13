import { Navigate, Route, Routes } from 'react-router-dom'
import PublicLayout from './layouts/PublicLayout/PublicLayout.jsx'
import WelcomeWayPage from './pages/WelcomeWayPage/WelcomeWayPage.jsx'
import CompanyProfilePage from './pages/KnowUsBetter/CompanyProfilePage.jsx'
import ManagementTeamPage from './pages/KnowUsBetter/ManagementTeamPage.jsx'
import CSRPage from './pages/KnowUsBetter/CSRPage.jsx'
import GlobalPresencePage from './pages/KnowUsBetter/GlobalPresencePage.jsx'
import TextilePage from './pages/KnowUsBetter/TextilePage.jsx'
import EducationPage from './pages/KnowUsBetter/EducationPage.jsx'
import NaturalEnergyPage from './pages/KnowUsBetter/NaturalEnergyPage.jsx'
import BrandsPage from './pages/KnowUsBetter/BrandsPage.jsx'
import SpinningPage from './pages/KnowUsBetter/SpinningPage.jsx'
import KnittingPage from './pages/KnowUsBetter/KnittingPage.jsx'
import WeavingPage from './pages/KnowUsBetter/WeavingPage.jsx'
import GarmentingPage from './pages/KnowUsBetter/GarmentingPage.jsx'
import HomeTextilesPage from './pages/KnowUsBetter/HomeTextilesPage.jsx'
import CottonYarnPage from './pages/KnowUsBetter/CottonYarnPage.jsx'
import KnittedFabricsPage from './pages/KnowUsBetter/KnittedFabricsPage.jsx'
import WovenFabricsPage from './pages/KnowUsBetter/WovenFabricsPage.jsx'
import GarmentsPage from './pages/KnowUsBetter/GarmentsPage.jsx'
import CredentialsPage from './pages/CredentialsPage/CredentialsPage.jsx'
import LogoMarqueePage from './pages/LogoMarqueePage/LogoMarqueePage.jsx'
import LetsTalkPage from './pages/LetsTalkPage/LetsTalkPage.jsx'
import NotFoundPage from './pages/NotFoundPage/NotFoundPage.jsx'

export default function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route index element={<WelcomeWayPage />} />
        <Route path="know-us-better" element={<Navigate to="/know-us-better/company-profile" replace />} />
        <Route path="know-us-better/company-profile" element={<CompanyProfilePage />} />
        <Route path="enlightenment" element={<Navigate to="/enlightenment/textile" replace />} />
        <Route path="framework" element={<Navigate to="/framework/spinning" replace />} />
        <Route path="goods" element={<Navigate to="/goods/cotton-yarn" replace />} />
        <Route path="know-us-better/management-team" element={<ManagementTeamPage />} />
        <Route path="know-us-better/csr" element={<CSRPage />} />
        <Route path="know-us-better/global-presence" element={<GlobalPresencePage />} />
        <Route path="enlightenment/textile" element={<TextilePage />} />
        <Route path="enlightenment/education" element={<EducationPage />} />
        <Route path="enlightenment/natural-energy" element={<NaturalEnergyPage />} />
        <Route path="enlightenment/brands" element={<BrandsPage />} />
        <Route path="framework/spinning" element={<SpinningPage />} />
        <Route path="framework/knitting" element={<KnittingPage />} />
        <Route path="framework/weaving" element={<WeavingPage />} />
        <Route path="framework/garmenting" element={<GarmentingPage />} />
        <Route path="framework/home-textiles" element={<HomeTextilesPage />} />
        <Route path="goods/cotton-yarn" element={<CottonYarnPage />} />
        <Route path="goods/knitted-fabrics" element={<KnittedFabricsPage />} />
        <Route path="goods/woven-fabrics" element={<WovenFabricsPage />} />
        <Route path="goods/garments" element={<GarmentsPage />} />
        <Route path="credentials" element={<CredentialsPage />} />
        <Route path="logo-marquee" element={<LogoMarqueePage />} />
        <Route path="lets-talk" element={<LetsTalkPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
