import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Blog } from './pages/Blog';
import { Categories } from './pages/Categories';
import { Article } from './pages/Article';
import { Contact } from './pages/Contact';
import { Store } from './pages/Store';
import { Legal } from './pages/Legal';
import './index.css';

function Layout() {
  return (
    <>
      {/* Film grain overlay */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 9999, pointerEvents: 'none', opacity: 0.025,
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        backgroundSize: '180px',
      }} />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/categorias" element={<Categories />} />
        <Route path="/articulo/:id" element={<Article />} />
        <Route path="/contacto" element={<Contact />} />
        <Route path="/tienda" element={<Store />} />
        <Route path="/legal/:type" element={<Legal />} />
      </Routes>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}
