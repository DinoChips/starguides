import { Link } from 'react-router-dom';
import { Github, Youtube, MessageCircle, Mail } from 'lucide-react';

export function Footer() {
  const links = [
    { label: 'Inicio', to: '/' },
    { label: 'Guías', to: '/categorias' },
    { label: 'Blog', to: '/blog' },
    { label: 'Tienda', to: '/tienda' },
    { label: 'Contacto', to: '/contacto' },
  ];
  const cats = ['Minecraft Servers', 'IT & Networking', 'Web Development', 'HumanOS'];

  return (
    <footer style={{ background: 'var(--void)', borderTop: '1px solid rgba(255,200,80,0.08)', fontFamily: 'var(--font-ui)' }}>
      {/* Top strip */}
      <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(255,200,80,0.35), transparent)' }} />
      
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '64px 5% 40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 48, marginBottom: 56 }}>
          
          {/* Brand */}
          <div style={{ gridColumn: 'span 1' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
              <svg width="20" height="20" viewBox="0 0 22 22" fill="none">
                <polygon points="11,1 14,8 21,8 15.5,13 17.5,20 11,16 4.5,20 6.5,13 1,8 8,8"
                  fill="none" stroke="#ffd060" strokeWidth="1.2" strokeLinejoin="round"/>
              </svg>
              <span style={{
                fontWeight: 900, fontSize: 14, letterSpacing: '0.12em',
                background: 'linear-gradient(120deg,#ffd060,#ffb830,#ffe8a0)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>STARGUIDES</span>
            </div>
            <p style={{ fontSize: 13, color: 'rgba(200,210,255,0.38)', lineHeight: 1.7, maxWidth: 220 }}>
              Hub educativo de IT, Minecraft, Web Dev y desarrollo humano. Sin relleno.
            </p>
            <div style={{ display: 'flex', gap: 16, marginTop: 24 }}>
              {[Youtube, Github, MessageCircle, Mail].map((Icon, i) => (
                <a key={i} href="#" style={{ color: 'rgba(200,210,255,0.3)', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#ffd060'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(200,210,255,0.3)'}>
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <div className="label-mono" style={{ marginBottom: 20 }}>Navegación</div>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
              {links.map(l => (
                <li key={l.to}>
                  <Link to={l.to} style={{ color: 'rgba(200,210,255,0.4)', textDecoration: 'none', fontSize: 13, fontWeight: 600, transition: 'color 0.2s' }}
                    onMouseEnter={e => e.target.style.color = '#ffd060'}
                    onMouseLeave={e => e.target.style.color = 'rgba(200,210,255,0.4)'}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <div className="label-mono" style={{ marginBottom: 20 }}>Categorías</div>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
              {cats.map(c => (
                <li key={c}>
                  <Link to="/categorias" style={{ color: 'rgba(200,210,255,0.4)', textDecoration: 'none', fontSize: 13, fontWeight: 600, transition: 'color 0.2s' }}
                    onMouseEnter={e => e.target.style.color = '#ffd060'}
                    onMouseLeave={e => e.target.style.color = 'rgba(200,210,255,0.4)'}>
                    {c}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Discord CTA */}
          <div>
            <div className="label-mono" style={{ marginBottom: 20 }}>Comunidad</div>
            <p style={{ fontSize: 13, color: 'rgba(200,210,255,0.38)', lineHeight: 1.7, marginBottom: 20 }}>
              Pregunta, comparte y abre tickets de soporte especializado.
            </p>
            <a href="https://discord.wstars.lat" target="_blank" rel="noreferrer" className="sg-btn-primary"
              style={{ fontSize: 11, padding: '10px 20px' }}>
              Únete ✦
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="gold-line" style={{ marginBottom: 28 }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <span style={{ fontSize: 12, color: 'rgba(200,210,255,0.22)', fontFamily: 'var(--font-mono)' }}>
            © 2026 StarGuides — todos los derechos reservados
          </span>
          <div style={{ display: 'flex', gap: 24 }}>
            {[['Privacidad', '/legal/privacidad'], ['Términos', '/legal/terminos']].map(([t, to]) => (
              <Link key={t} to={to} style={{ fontSize: 12, color: 'rgba(200,210,255,0.22)', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => e.target.style.color = 'rgba(255,200,80,0.6)'}
                onMouseLeave={e => e.target.style.color = 'rgba(200,210,255,0.22)'}>
                {t}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
