import { Link } from 'react-router-dom';
import { blogPosts } from '../data/articles';
import { useEffect } from 'react';
import { useSEO } from '../App';

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.08 });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  });
}

export function Blog() {
  useReveal();
  useSEO({
    title: 'Blog',
    description: 'Pensamientos sin filtro sobre IT, Minecraft y desarrollo personal. Errores reales, lecciones reales.',
    url: 'https://starguides.dev/blog',
  });

  return (
    <div className="sg-page">
      <div style={{ position: 'absolute', top: 80, right: -200, width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle,rgba(255,200,80,0.04) 0%,transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: 200, left: -200, width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle,rgba(100,50,200,0.04) 0%,transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 5%', position: 'relative', zIndex: 1 }}>

        <div style={{ padding: '80px 0 100px' }}>
          <div className="label-mono reveal" style={{ marginBottom: 24 }}>// Blog</div>
          <h1 className="reveal" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3rem, 7vw, 7rem)', fontWeight: 300, lineHeight: 0.93, letterSpacing: '-0.02em', marginBottom: 32 }}>
            Pensamientos<br />
            <em style={{ fontStyle: 'italic', background: 'linear-gradient(120deg,#ffd060,#ffb830,#fff0a0)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              sin filtro.
            </em>
          </h1>
          <p className="reveal" style={{ fontSize: 16, color: 'rgba(200,210,255,0.45)', maxWidth: 560, lineHeight: 1.8, fontFamily: 'var(--font-ui)' }}>
            Esto no es una guía técnica. Aquí escribo sobre lo que aprendo, los errores que cometo, y las cosas que nadie te cuenta sobre IT y el desarrollo personal.
          </p>
        </div>

        <div className="reveal" style={{ background: 'rgba(255,200,80,0.03)', border: '1px solid rgba(255,200,80,0.1)', borderRadius: 10, padding: '28px 32px', marginBottom: 72, fontFamily: 'var(--font-mono)', fontSize: 13 }}>
          <div style={{ color: 'rgba(255,200,80,0.6)', marginBottom: 10, letterSpacing: '0.06em' }}>$ cat about_this_blog.md</div>
          <p style={{ color: 'rgba(200,210,255,0.5)', lineHeight: 1.7, marginBottom: 10 }}>Las guías de StarGuides son técnicas, estructuradas, al punto.</p>
          <p style={{ color: 'rgba(200,210,255,0.5)', lineHeight: 1.7, marginBottom: 10 }}>El blog es diferente: proceso, errores, opiniones. Sin filtros, sin estructura perfecta.</p>
          <p style={{ lineHeight: 1.7 }}>
            <span style={{ color: 'rgba(255,200,80,0.7)' }}>Si buscas tutoriales → </span>
            <Link to="/categorias" style={{ color: 'rgba(255,200,80,0.9)', textDecoration: 'underline' }}>ve a Guías</Link>
          </p>
        </div>

        <div style={{ marginBottom: 100 }}>
          {blogPosts.map((post, index) => (
            <div key={post.id} className={`reveal reveal-delay-${(index % 4) + 1}`}>
              <Link to={`/blog/${post.id}`} style={{ textDecoration: 'none', display: 'block' }}>
                <div
                  style={{ padding: '40px 0', borderBottom: '1px solid rgba(255,255,255,0.04)', cursor: 'pointer', transition: 'padding-left 0.3s', display: 'grid', gridTemplateColumns: '56px 1fr', gap: 24, alignItems: 'start' }}
                  onMouseEnter={e => { e.currentTarget.style.paddingLeft = '12px'; e.currentTarget.querySelector('.post-title').style.color = '#ffd060'; }}
                  onMouseLeave={e => { e.currentTarget.style.paddingLeft = '0'; e.currentTarget.querySelector('.post-title').style.color = 'rgba(240,240,255,0.88)'; }}
                >
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 42, color: 'rgba(255,200,80,0.12)', fontWeight: 300, lineHeight: 1, paddingTop: 4 }}>
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  <div>
                    <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 12, flexWrap: 'wrap' }}>
                      <span style={{ fontSize: 20 }}>{post.image}</span>
                      <span className="label-mono" style={{ fontSize: 9, opacity: 0.4 }}>{post.readTime}</span>
                      <span className="label-mono" style={{ fontSize: 9, opacity: 0.3 }}>{post.date}</span>
                    </div>
                    <h2 className="post-title" style={{ fontSize: 'clamp(17px, 2vw, 22px)', fontWeight: 700, color: 'rgba(240,240,255,0.88)', marginBottom: 12, lineHeight: 1.3, transition: 'color 0.25s', letterSpacing: '-0.01em' }}>
                      {post.title}
                    </h2>
                    <p style={{ fontSize: 14, color: 'rgba(200,210,255,0.38)', lineHeight: 1.7, marginBottom: 18 }}>{post.excerpt}</p>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
                      {post.tags.map(tag => (
                        <span key={tag} style={{ fontSize: 10, letterSpacing: '0.1em', fontFamily: 'var(--font-mono)', padding: '4px 10px', border: '1px solid rgba(255,200,80,0.18)', color: 'rgba(255,200,80,0.55)', borderRadius: 2 }}>#{tag}</span>
                      ))}
                    </div>
                    <span style={{ fontSize: 11, color: 'rgba(255,200,80,0.5)', letterSpacing: '0.1em', fontFamily: 'var(--font-mono)' }}>LEER ENTRADA →</span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        <div className="reveal" style={{ border: '1px solid rgba(255,200,80,0.14)', borderRadius: 12, padding: 'clamp(40px,6vw,64px)', textAlign: 'center', marginBottom: 120, background: 'linear-gradient(135deg,rgba(255,200,80,0.03),rgba(80,30,140,0.03))', backdropFilter: 'blur(20px)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -80, right: -80, width: 250, height: 250, borderRadius: '50%', background: 'radial-gradient(circle,rgba(255,200,80,0.06),transparent 70%)', pointerEvents: 'none' }} />
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 36, color: '#ffd060', marginBottom: 16 }}>✦</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.6rem, 3vw, 2.8rem)', fontWeight: 300, marginBottom: 14 }}>No te pierdas ninguna entrada</h2>
          <p style={{ fontSize: 14, color: 'rgba(200,210,255,0.4)', marginBottom: 36, lineHeight: 1.7 }}>Suscríbete y recibe nuevas entradas directamente en tu correo.</p>
          <div style={{ display: 'flex', gap: 12, maxWidth: 440, margin: '0 auto', flexWrap: 'wrap', justifyContent: 'center' }}>
            <input type="email" placeholder="tu@correo.com" style={{ flex: 1, minWidth: 220, padding: '12px 18px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,200,80,0.18)', borderRadius: 3, color: 'var(--text-primary)', fontSize: 14, fontFamily: 'var(--font-ui)', outline: 'none', transition: 'border-color 0.2s' }}
              onFocus={e => e.target.style.borderColor = 'rgba(255,200,80,0.5)'}
              onBlur={e => e.target.style.borderColor = 'rgba(255,200,80,0.18)'}
            />
            <button className="sg-btn-primary" style={{ whiteSpace: 'nowrap' }}>Suscribir →</button>
          </div>
        </div>
      </div>
    </div>
  );
}
