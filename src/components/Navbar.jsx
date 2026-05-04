import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => setOpen(false), [location]);

  const isActive = path => location.pathname === path;
  const links = [
    { to: '/', label: 'Inicio' },
    { to: '/categorias', label: 'Guías' },
    { to: '/blog', label: 'Blog' },
    { to: '/tienda', label: 'Tienda' },
    { to: '/contacto', label: 'Contacto' },
  ];

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
      background: scrolled ? 'rgba(3,3,10,0.88)' : 'transparent',
      borderBottom: scrolled ? '1px solid rgba(255,200,80,0.1)' : '1px solid transparent',
      backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
      transition: 'all 0.5s cubic-bezier(.22,1,.36,1)',
      fontFamily: "'Syne', sans-serif",
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 68 }}>
        
        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <polygon points="11,1 14,8 21,8 15.5,13 17.5,20 11,16 4.5,20 6.5,13 1,8 8,8" 
              fill="none" stroke="#ffd060" strokeWidth="1.2" strokeLinejoin="round"/>
            <polygon points="11,6 12.5,10 16.5,10 13.2,12.5 14.5,16.5 11,14 7.5,16.5 8.8,12.5 5.5,10 9.5,10"
              fill="#ffd060" opacity="0.4"/>
          </svg>
          <span style={{
            fontWeight: 900, fontSize: 16, letterSpacing: '0.12em',
            background: 'linear-gradient(120deg,#ffd060,#ffb830,#ffe8a0)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}>STARGUIDES</span>
        </Link>

        {/* Desktop links */}
        <div style={{ display: 'flex', gap: 40, alignItems: 'center' }} className="sg-nav-desktop">
          {links.map(l => (
            <Link key={l.to} to={l.to} style={{
              textDecoration: 'none', fontSize: 12, fontWeight: 700,
              letterSpacing: '0.1em', textTransform: 'uppercase',
              color: isActive(l.to) ? '#ffd060' : 'rgba(200,210,255,0.6)',
              transition: 'color 0.2s',
              position: 'relative',
            }}
              onMouseEnter={e => { if (!isActive(l.to)) e.target.style.color = 'rgba(255,200,80,0.9)'; }}
              onMouseLeave={e => { if (!isActive(l.to)) e.target.style.color = 'rgba(200,210,255,0.6)'; }}
            >
              {l.label}
              {isActive(l.to) && (
                <span style={{ position: 'absolute', bottom: -4, left: 0, right: 0, height: 1, background: '#ffd060', borderRadius: 1 }} />
              )}
            </Link>
          ))}
          <a href="https://discord.wstars.lat" target="_blank" rel="noreferrer" className="sg-btn-ghost"
            style={{ padding: '8px 18px', fontSize: 11 }}>
            Discord ✦
          </a>
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)}
          style={{ background: 'none', border: 'none', color: '#ffd060', cursor: 'pointer', padding: 4 }}
          className="sg-nav-mobile">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div style={{
          background: 'rgba(3,3,10,0.97)', borderTop: '1px solid rgba(255,200,80,0.08)',
          padding: '24px 5% 28px', display: 'flex', flexDirection: 'column', gap: 22,
        }}>
          {links.map(l => (
            <Link key={l.to} to={l.to} style={{
              textDecoration: 'none', fontSize: 18, fontWeight: 700,
              color: isActive(l.to) ? '#ffd060' : 'rgba(200,210,255,0.7)',
              letterSpacing: '0.06em',
            }}>{l.label}</Link>
          ))}
          <a href="https://discord.wstars.lat" target="_blank" rel="noreferrer"
            style={{ color: '#ffd060', textDecoration: 'none', fontWeight: 700, fontSize: 16 }}>
            Discord ✦
          </a>
        </div>
      )}

      <style>{`
        @media(min-width:768px){.sg-nav-mobile{display:none!important}}
        @media(max-width:767px){.sg-nav-desktop{display:none!important}}
      `}</style>
    </nav>
  );
}
