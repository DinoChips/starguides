import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Blog } from './pages/Blog';
import { BlogPost } from './pages/BlogPost';
import { Categories } from './pages/Categories';
import { Article } from './pages/Article';
import { Contact } from './pages/Contact';
import { Store } from './pages/Store';
import { Legal } from './pages/Legal';
import './index.css';

// ── Hook SEO: actualiza <title> y meta tags por ruta ──────
export function useSEO({ title, description, url, type = 'website' }) {
  useEffect(() => {
    const base = 'StarGuides';
    const fullTitle = title ? `${title} — ${base}` : `${base} — Guías técnicas de IT, Minecraft y Web Dev`;
    const desc = description || 'StarGuides: guías técnicas de Minecraft, IT, networking y desarrollo web.';
    const canonical = url || window.location.href;

    document.title = fullTitle;
    setMeta('name', 'description', desc);
    setMeta('property', 'og:title', fullTitle);
    setMeta('property', 'og:description', desc);
    setMeta('property', 'og:url', canonical);
    setMeta('property', 'og:type', type);
    setMeta('name', 'twitter:title', fullTitle);
    setMeta('name', 'twitter:description', desc);
    setLink('canonical', canonical);
  }, [title, description, url, type]);
}

function setMeta(attr, key, value) {
  let el = document.querySelector(`meta[${attr}="${key}"]`);
  if (!el) { el = document.createElement('meta'); el.setAttribute(attr, key); document.head.appendChild(el); }
  el.setAttribute('content', value);
}

function setLink(rel, href) {
  let el = document.querySelector(`link[rel="${rel}"]`);
  if (!el) { el = document.createElement('link'); el.setAttribute('rel', rel); document.head.appendChild(el); }
  el.setAttribute('href', href);
}

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
        <Route path="/blog/:id" element={<BlogPost />} />
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
