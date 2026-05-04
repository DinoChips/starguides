import { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';

/* ─── CANVAS: Particle Field ─── */
function ParticleField() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animId, W, H, particles = [], mouse = { x: 0, y: 0 };

    const resize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };

    const init = () => {
      particles = Array.from({ length: 180 }, () => ({
        x: Math.random() * W, y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.15, vy: (Math.random() - 0.5) * 0.08,
        r: Math.random() * 1.4 + 0.2,
        alpha: Math.random() * 0.6 + 0.15,
        twinkle: Math.random() * Math.PI * 2,
        gold: Math.random() < 0.15,
        speed: Math.random() * 0.8 + 0.3,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      const t = Date.now() * 0.001;

      // Ambient radial glow
      const gx = W * 0.5 + Math.cos(t * 0.07) * 120;
      const gy = H * 0.38 + Math.sin(t * 0.05) * 70;
      const g = ctx.createRadialGradient(gx, gy, 0, gx, gy, W * 0.6);
      g.addColorStop(0, 'rgba(140, 90, 10, 0.055)');
      g.addColorStop(0.6, 'rgba(60, 20, 100, 0.025)');
      g.addColorStop(1, 'transparent');
      ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);

      particles.forEach(p => {
        p.twinkle += 0.008;
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;

        const mx = (mouse.x / W - 0.5) * 4 * p.r;
        const my = (mouse.y / H - 0.5) * 3 * p.r;
        const op = p.alpha * (0.6 + 0.4 * Math.sin(p.twinkle));

        ctx.beginPath();
        ctx.arc(p.x + mx, p.y + my, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.gold
          ? `rgba(255, 200, 80, ${op})`
          : `rgba(180, 200, 255, ${op * 0.6})`;
        ctx.fill();

        if (p.gold && p.r > 1.0) {
          ctx.beginPath();
          ctx.arc(p.x + mx, p.y + my, p.r * 4, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 200, 80, ${op * 0.06})`;
          ctx.fill();
        }
      });

      // Connection lines between close gold particles
      const goldP = particles.filter(p => p.gold);
      for (let i = 0; i < goldP.length; i++) {
        for (let j = i + 1; j < goldP.length; j++) {
          const dx = goldP[i].x - goldP[j].x;
          const dy = goldP[i].y - goldP[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 180) {
            ctx.beginPath();
            ctx.moveTo(goldP[i].x, goldP[i].y);
            ctx.lineTo(goldP[j].x, goldP[j].y);
            ctx.strokeStyle = `rgba(255, 200, 80, ${(1 - dist / 180) * 0.06})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(draw);
    };

    resize(); init(); draw();
    window.addEventListener('resize', () => { resize(); init(); });
    window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });
    return () => cancelAnimationFrame(animId);
  }, []);

  return <canvas ref={canvasRef} style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }} />;
}

/* ─── CANVAS: Hero Geo Orb (3D-ish rotating rings) ─── */
function HeroOrb({ size = 440 }) {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext('2d');
    canvas.width = size; canvas.height = size;
    let animId;
    const cx = size / 2, cy = size / 2;

    const draw = () => {
      ctx.clearRect(0, 0, size, size);
      const t = Date.now() * 0.001;

      // Outer glow
      const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, size * 0.5);
      glow.addColorStop(0, 'rgba(255, 200, 80, 0.04)');
      glow.addColorStop(0.5, 'rgba(200, 140, 30, 0.02)');
      glow.addColorStop(1, 'transparent');
      ctx.fillStyle = glow; ctx.fillRect(0, 0, size, size);

      // Rotating polygon rings
      const rings = [
        { r: 55,  sides: 3,  speed: 0.4,  alpha: 0.35, lw: 0.8 },
        { r: 88,  sides: 4,  speed: -0.25, alpha: 0.22, lw: 0.7 },
        { r: 122, sides: 6,  speed: 0.18, alpha: 0.18, lw: 0.7 },
        { r: 158, sides: 8,  speed: -0.12, alpha: 0.12, lw: 0.6 },
        { r: 195, sides: 12, speed: 0.08, alpha: 0.07, lw: 0.5 },
        { r: 210, sides: 24, speed: -0.05, alpha: 0.04, lw: 0.4 },
      ];

      rings.forEach((ring, ri) => {
        const rot = t * ring.speed + ri * 0.6;
        ctx.beginPath();
        for (let i = 0; i <= ring.sides; i++) {
          const a = (i / ring.sides) * Math.PI * 2 + rot;
          const px = cx + Math.cos(a) * ring.r;
          const py = cy + Math.sin(a) * ring.r;
          i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
        }
        ctx.strokeStyle = `rgba(255, 200, 80, ${ring.alpha + Math.sin(t * 0.5 + ri) * 0.04})`;
        ctx.lineWidth = ring.lw;
        ctx.stroke();
      });

      // Spoke lines
      for (let i = 0; i < 8; i++) {
        const a = (i / 8) * Math.PI * 2 + t * 0.06;
        ctx.beginPath();
        ctx.moveTo(cx + Math.cos(a) * 18, cy + Math.sin(a) * 18);
        ctx.lineTo(cx + Math.cos(a) * 210, cy + Math.sin(a) * 210);
        ctx.strokeStyle = 'rgba(255, 200, 80, 0.025)';
        ctx.lineWidth = 0.5; ctx.stroke();
      }

      // Diagonal cross pattern
      for (let i = 0; i < 4; i++) {
        const a = (i / 4) * Math.PI * 2 + t * -0.09;
        ctx.beginPath();
        ctx.moveTo(cx + Math.cos(a) * 38, cy + Math.sin(a) * 38);
        ctx.lineTo(cx + Math.cos(a + Math.PI) * 38, cy + Math.sin(a + Math.PI) * 38);
        ctx.strokeStyle = 'rgba(255, 200, 80, 0.18)';
        ctx.lineWidth = 0.6; ctx.stroke();
      }

      // Inner core
      const core = ctx.createRadialGradient(cx, cy, 0, cx, cy, 22);
      core.addColorStop(0, 'rgba(255, 235, 150, 0.95)');
      core.addColorStop(0.4, 'rgba(255, 200, 80, 0.7)');
      core.addColorStop(1, 'rgba(200, 120, 20, 0)');
      ctx.fillStyle = core;
      ctx.beginPath(); ctx.arc(cx, cy, 22, 0, Math.PI * 2); ctx.fill();

      // Pulse ring
      const pulseR = 30 + Math.sin(t * 1.8) * 8;
      ctx.beginPath(); ctx.arc(cx, cy, pulseR, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(255, 200, 80, ${0.22 + Math.sin(t * 1.8) * 0.1})`;
      ctx.lineWidth = 0.8; ctx.stroke();

      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(animId);
  }, [size]);

  return <canvas ref={ref} style={{ width: size, height: size }} />;
}

/* ─── CANVAS: Section Orb (smaller, for page sections) ─── */
function SectionOrb({ size = 220, color = '#ffd060', speed = 1 }) {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext('2d');
    canvas.width = size; canvas.height = size;
    let animId;
    const cx = size / 2, cy = size / 2;
    const draw = () => {
      ctx.clearRect(0, 0, size, size);
      const t = Date.now() * 0.001 * speed;
      [0.42, 0.62, 0.82].forEach((frac, i) => {
        const r = size * frac * 0.5;
        const sides = 6 + i * 3;
        const rot = t * (i % 2 === 0 ? 0.3 : -0.22) + i;
        ctx.beginPath();
        for (let j = 0; j <= sides; j++) {
          const a = (j / sides) * Math.PI * 2 + rot;
          j === 0 ? ctx.moveTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r)
                  : ctx.lineTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r);
        }
        ctx.strokeStyle = `rgba(255,200,80,${0.08 + i * 0.06})`;
        ctx.lineWidth = 0.7; ctx.stroke();
      });
      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, size * 0.35);
      g.addColorStop(0, 'rgba(255,200,80,0.12)');
      g.addColorStop(1, 'transparent');
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, size * 0.35, 0, Math.PI * 2); ctx.fill();
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(animId);
  }, [size, speed]);
  return <canvas ref={ref} style={{ width: size, height: size }} />;
}

/* ─── SCROLL REVEAL HOOK ─── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.08 });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }); // ← no tiene array de dependencias, se re-ejecuta en cada render
}

/* ─── DATA ─── */
const CATS = [
  { id: 'minecraft', sym: '⬡', name: 'Minecraft Servers', desc: 'Paper, plugins, optimización, troubleshooting avanzado', accent: '#ffd060', dim: 'rgba(255,208,96,0.06)' },
  { id: 'it',        sym: '◈', name: 'IT & Networking',   desc: 'Subnetting, Linux, automatización, seguridad',        accent: '#a78bfa', dim: 'rgba(167,139,250,0.06)' },
  { id: 'web-dev',   sym: '◎', name: 'Web Development',   desc: 'Frontend, backend, APIs, arquitectura',               accent: '#60efff', dim: 'rgba(96,239,255,0.06)' },
  { id: 'humanos',   sym: '◉', name: 'HumanOS',           desc: 'Hábitos, productividad, mente y cuerpo',             accent: '#fb923c', dim: 'rgba(251,146,60,0.06)' },
];

const FEATURED = [
  { id: 1, sym: '⬡', title: 'Configurar Paper con plugins avanzados', cat: 'Minecraft', time: '8 min', accent: '#ffd060' },
  { id: 2, sym: '◈', title: 'Subnetting en Linux paso a paso',         cat: 'IT',        time: '10 min', accent: '#a78bfa' },
  { id: 3, sym: '◉', title: 'Hábitos que reprograman tu mente',        cat: 'HumanOS',   time: '8 min', accent: '#fb923c' },
  { id: 5, sym: '◈', title: 'Automatización con Bash Scripts',         cat: 'IT',        time: '9 min', accent: '#a78bfa' },
];

const MARQUEE_ITEMS = ['STARGUIDES', '✦', 'IT & NETWORKING', '✦', 'MINECRAFT', '✦', 'WEB DEVELOPMENT', '✦', 'HUMANOS', '✦', 'STARGUIDES', '✦', 'IT & NETWORKING', '✦', 'MINECRAFT', '✦', 'WEB DEVELOPMENT', '✦', 'HUMANOS', '✦'];

/* ─── HOME PAGE ─── */
export function Home() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const fn = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useReveal();

  const heroOpacity = Math.max(0, 1 - scrollY / 500);
  const heroParallax = scrollY * 0.18;

  return (
    <div style={{ background: 'var(--void)', minHeight: '100vh', overflowX: 'hidden', color: 'var(--text-primary)', fontFamily: 'var(--font-ui)' }}>
      <ParticleField />

      {/* ═══════════════════════════════ HERO ═══════════════════════════════ */}
      <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', zIndex: 1 }}>

        {/* Orb – right side, parallax */}
        <div style={{
          position: 'absolute', right: '-2%', top: '50%',
          transform: `translateY(-50%) translateY(${heroParallax}px)`,
          opacity: heroOpacity * 0.85,
          pointerEvents: 'none',
        }}>
          <HeroOrb size={500} />
        </div>

        {/* Vertical rule */}
        <div style={{ position: 'absolute', left: '5%', top: '15%', bottom: '15%', width: 1, background: 'linear-gradient(180deg, transparent, rgba(255,200,80,0.18) 40%, rgba(255,200,80,0.18) 60%, transparent)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: 1280, width: '100%', margin: '0 auto', padding: '0 5%', paddingTop: 100 }}>
          <div style={{ maxWidth: 780 }}>

            {/* Label */}
            <div className="label-mono" style={{ marginBottom: 32, display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ display: 'inline-block', width: 28, height: 1, background: 'rgba(255,200,80,0.5)' }} />
              S T A R G U I D E S — by Star
            </div>

            {/* Main headline */}
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(4.5rem, 12vw, 10rem)', fontWeight: 300, lineHeight: 0.9, letterSpacing: '-0.02em', marginBottom: 36 }}>
              Aprende.<br />
              <em style={{ fontStyle: 'italic', background: 'linear-gradient(120deg,#ffd060 0%,#ffb830 35%,#fff0a0 65%,#ffd060 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Construye.
              </em><br />
              Domina.
            </h1>

            {/* Sub */}
            <p style={{ fontSize: 'clamp(14px, 1.4vw, 18px)', color: 'rgba(200,210,255,0.52)', maxWidth: 500, lineHeight: 1.75, marginBottom: 52, fontFamily: 'var(--font-ui)', fontWeight: 400 }}>
              Guías profundas sobre servidores Minecraft, IT, desarrollo web y crecimiento personal.&nbsp;
              <span style={{ color: 'rgba(255,200,80,0.7)' }}>Sin relleno. Sin mediocridad.</span>
            </p>

            {/* CTAs */}
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 72 }}>
              <Link to="/categorias" className="sg-btn-primary">
                Explorar guías →
              </Link>
              <a href="https://discord.wstars.lat" target="_blank" rel="noreferrer" className="sg-btn-ghost">
                Discord ✦
              </a>
            </div>

            {/* Stats */}
            <div style={{ display: 'flex', gap: 56, flexWrap: 'wrap' }}>
              {[['4', 'Categorías'], ['8+', 'Guías'], ['∞', 'En progreso']].map(([n, l]) => (
                <div key={l} style={{ position: 'relative' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 300, color: '#ffd060', lineHeight: 1 }}>{n}</div>
                  <div className="label-mono" style={{ marginTop: 8, opacity: 0.5 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="anim-bounce-y" style={{ position: 'absolute', bottom: 40, left: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <span className="label-mono" style={{ opacity: 0.35 }}>scroll</span>
          <div style={{ width: 1, height: 40, background: 'linear-gradient(180deg, rgba(255,200,80,0.4), transparent)' }} />
        </div>
      </section>

      {/* ═══════════════════════════════ MARQUEE STRIP ═══════════════════════════════ */}
      <div style={{ position: 'relative', zIndex: 2, borderTop: '1px solid rgba(255,200,80,0.08)', borderBottom: '1px solid rgba(255,200,80,0.08)', padding: '14px 0', overflow: 'hidden' }}>
        <div className="sg-marquee-track">
          {MARQUEE_ITEMS.concat(MARQUEE_ITEMS).map((item, i) => (
            <span key={i} style={{
              fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.22em',
              color: item === '✦' ? 'rgba(255,200,80,0.8)' : 'rgba(200,210,255,0.2)',
              paddingRight: 32,
            }}>
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════ ABOUT / MISSION ═══════════════════════════════ */}
      <section style={{ position: 'relative', zIndex: 2, padding: '140px 5%', maxWidth: 1280, margin: '0 auto' }}>
        <div className="reveal" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
          
          <div>
            <div className="label-mono" style={{ marginBottom: 24 }}>// Misión</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 5vw, 5.5rem)', fontWeight: 300, lineHeight: 0.95, marginBottom: 32 }}>
              Conocimiento que <em className="text-gold" style={{ fontStyle: 'italic' }}>transforma</em>.
            </h2>
            <p style={{ fontSize: 15, color: 'rgba(200,210,255,0.48)', lineHeight: 1.85, marginBottom: 24 }}>
              StarGuides no es otro blog técnico. Es un arsenal. Cada guía está diseñada para que salgas con algo que puedes aplicar hoy, no mañana.
            </p>
            <p style={{ fontSize: 15, color: 'rgba(200,210,255,0.48)', lineHeight: 1.85 }}>
              Desde configurar un servidor Paper hasta reestructurar tu sistema de hábitos: el mismo estándar de excelencia, sin excepciones.
            </p>
          </div>

          <div style={{ position: 'relative' }}>
            {/* Decorative geo */}
            <div style={{ position: 'absolute', top: -40, right: -40, opacity: 0.6, pointerEvents: 'none' }}>
              <SectionOrb size={280} />
            </div>
            <div style={{ background: 'rgba(255,200,80,0.04)', border: '1px solid rgba(255,200,80,0.12)', borderRadius: 12, padding: '40px 36px', backdropFilter: 'blur(20px)' }}>
              {[
                ['Profundidad real', 'Sin shallow content. Cada guía va al núcleo del tema.'],
                ['Actualización continua', 'El conocimiento evoluciona. Las guías también.'],
                ['Comunidad activa', 'Discord con soporte técnico especializado, no genérico.'],
              ].map(([title, desc], i) => (
                <div key={title} style={{ display: 'flex', gap: 16, marginBottom: i < 2 ? 32 : 0 }}>
                  <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#ffd060', boxShadow: '0 0 8px #ffd060', marginTop: 8, flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: 'rgba(240,240,255,0.9)', marginBottom: 6, letterSpacing: '0.02em' }}>{title}</div>
                    <div style={{ fontSize: 13, color: 'rgba(200,210,255,0.4)', lineHeight: 1.65 }}>{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════ CATEGORIES ═══════════════════════════════ */}
      <section style={{ position: 'relative', zIndex: 2, padding: '80px 5% 140px', maxWidth: 1280, margin: '0 auto' }}>
        <div className="reveal" style={{ marginBottom: 64 }}>
          <div className="label-mono" style={{ marginBottom: 18 }}>// Categorías</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 5vw, 5rem)', fontWeight: 300, lineHeight: 0.95 }}>
            Cuatro caminos.<br />
            <span style={{ color: 'rgba(200,210,255,0.28)', fontWeight: 300 }}>Un solo destino.</span>
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
          {CATS.map((cat, i) => (
            <Link key={cat.id} to={`/categorias?cat=${cat.id}`} style={{ textDecoration: 'none' }}>
              <div className={`sg-card reveal reveal-delay-${i + 1}`} style={{ padding: '36px 32px', cursor: 'pointer' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = cat.accent + '40'; e.currentTarget.style.background = cat.dim; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,200,80,0.12)'; e.currentTarget.style.background = 'rgba(255,255,255,0.018)'; }}>
                
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 36, color: cat.accent, marginBottom: 20, lineHeight: 1 }}>{cat.sym}</div>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: 'rgba(240,240,255,0.9)', marginBottom: 10, letterSpacing: '0.02em' }}>{cat.name}</h3>
                <p style={{ fontSize: 13, color: 'rgba(200,210,255,0.38)', lineHeight: 1.6, marginBottom: 24 }}>{cat.desc}</p>
                <span style={{ fontSize: 11, color: cat.accent, letterSpacing: '0.12em', fontFamily: 'var(--font-mono)', opacity: 0.7 }}>
                  VER GUÍAS →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════ FEATURED GUIDES ═══════════════════════════════ */}
      <section style={{ position: 'relative', zIndex: 2, padding: '80px 5% 140px', maxWidth: 1280, margin: '0 auto' }}>
        <div className="gold-line" style={{ marginBottom: 80 }} />
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 56, flexWrap: 'wrap', gap: 16 }}>
          <div className="reveal">
            <div className="label-mono" style={{ marginBottom: 18 }}>// Guías Destacadas</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 4.5rem)', fontWeight: 300, lineHeight: 0.95 }}>Lo más reciente</h2>
          </div>
          <Link to="/categorias" className="reveal" style={{ color: 'rgba(255,200,80,0.6)', textDecoration: 'none', fontSize: 12, letterSpacing: '0.1em', fontFamily: 'var(--font-mono)', fontWeight: 500, transition: 'color 0.2s' }}
            onMouseEnter={e => e.target.style.color = '#ffd060'}
            onMouseLeave={e => e.target.style.color = 'rgba(255,200,80,0.6)'}>
            VER TODAS →
          </Link>
        </div>

        <div>
          {FEATURED.map((g, i) => (
            <Link key={g.id} to={`/articulo/${g.id}`} style={{ textDecoration: 'none', display: 'block' }}>
              <div
                className={`reveal reveal-delay-${i + 1}`}
                style={{
                  display: 'grid', gridTemplateColumns: '48px 1fr auto auto',
                  alignItems: 'center', gap: 24,
                  padding: '28px 0', borderBottom: '1px solid rgba(255,255,255,0.04)',
                  cursor: 'pointer', transition: 'padding-left 0.3s',
                  position: 'relative',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.paddingLeft = '16px';
                  e.currentTarget.querySelector('.g-num').style.color = g.accent;
                  e.currentTarget.querySelector('.g-title').style.color = '#ffd060';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.paddingLeft = '0';
                  e.currentTarget.querySelector('.g-num').style.color = 'rgba(255,200,80,0.22)';
                  e.currentTarget.querySelector('.g-title').style.color = 'rgba(240,240,255,0.85)';
                }}
              >
                <span className="g-num" style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'rgba(255,200,80,0.22)', letterSpacing: '0.08em', transition: 'color 0.25s' }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6 }}>
                    <span style={{ fontSize: 14, color: g.accent }}>{g.sym}</span>
                    <span className="label-mono" style={{ fontSize: 9, opacity: 0.45 }}>{g.cat}</span>
                  </div>
                  <span className="g-title" style={{ fontSize: 'clamp(15px, 1.5vw, 19px)', fontWeight: 600, color: 'rgba(240,240,255,0.85)', transition: 'color 0.25s', lineHeight: 1.3 }}>
                    {g.title}
                  </span>
                </div>
                <span style={{ fontSize: 11, color: 'rgba(200,210,255,0.25)', fontFamily: 'var(--font-mono)' }}>{g.time}</span>
                <span style={{ color: 'rgba(255,200,80,0.35)', fontSize: 18, transition: 'transform 0.2s' }}>→</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════ DISCORD CTA ═══════════════════════════════ */}
      <section style={{ position: 'relative', zIndex: 2, padding: '80px 5% 160px' }}>
        <div className="reveal" style={{
          maxWidth: 960, margin: '0 auto',
          border: '1px solid rgba(255,200,80,0.15)',
          borderRadius: 16, padding: 'clamp(50px, 8vw, 90px)',
          textAlign: 'center',
          background: 'linear-gradient(135deg, rgba(255,200,80,0.04) 0%, rgba(100,50,160,0.04) 100%)',
          backdropFilter: 'blur(24px)',
          position: 'relative', overflow: 'hidden',
        }}>
          {/* Corner decorations */}
          {[[-1,-1],[1,-1],[-1,1],[1,1]].map(([sx,sy], i) => (
            <div key={i} style={{
              position: 'absolute',
              top: sy < 0 ? -1 : 'auto', bottom: sy > 0 ? -1 : 'auto',
              left: sx < 0 ? -1 : 'auto', right: sx > 0 ? -1 : 'auto',
              width: 24, height: 24,
              borderTop: sy < 0 ? '1px solid rgba(255,200,80,0.5)' : 'none',
              borderBottom: sy > 0 ? '1px solid rgba(255,200,80,0.5)' : 'none',
              borderLeft: sx < 0 ? '1px solid rgba(255,200,80,0.5)' : 'none',
              borderRight: sx > 0 ? '1px solid rgba(255,200,80,0.5)' : 'none',
              pointerEvents: 'none',
            }} />
          ))}

          {/* Ambient */}
          <div style={{ position: 'absolute', top: -120, right: -120, width: 360, height: 360, borderRadius: '50%', background: 'radial-gradient(circle,rgba(255,200,80,0.07) 0%,transparent 70%)', pointerEvents: 'none' }} />

          <div style={{ fontFamily: 'var(--font-display)', fontSize: 52, color: '#ffd060', marginBottom: 24, lineHeight: 1 }}>✦</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 300, lineHeight: 0.95, marginBottom: 20 }}>
            Únete a la<br /><em className="text-gold" style={{ fontStyle: 'italic' }}>comunidad</em>
          </h2>
          <p style={{ fontSize: 15, color: 'rgba(200,210,255,0.45)', margin: '0 auto 48px', maxWidth: 440, lineHeight: 1.8 }}>
            Discord de StarGuides. Pregunta, comparte proyectos y abre tickets para ayuda técnica especializada.
          </p>
          <a href="https://discord.wstars.lat" target="_blank" rel="noreferrer" className="sg-btn-primary">
            discord.wstars.lat ✦
          </a>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .reveal[style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
        }
      `}</style>
    </div>
  );
}
