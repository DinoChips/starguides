import { useEffect, useRef } from 'react';

function FloatingOrb() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext('2d');
    const S = 300;
    canvas.width = S; canvas.height = S;
    let animId;
    const cx = S / 2, cy = S / 2;
    const draw = () => {
      ctx.clearRect(0, 0, S, S);
      const t = Date.now() * 0.001;
      // Rings
      [0.25, 0.4, 0.55, 0.7].forEach((f, i) => {
        const r = S * f * 0.5;
        const sides = 3 + i * 3;
        const rot = t * (i % 2 === 0 ? 0.25 : -0.18) + i;
        ctx.beginPath();
        for (let j = 0; j <= sides; j++) {
          const a = (j / sides) * Math.PI * 2 + rot;
          j === 0 ? ctx.moveTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r)
                  : ctx.lineTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r);
        }
        ctx.strokeStyle = `rgba(255,200,80,${0.1 + i * 0.06 + Math.sin(t + i) * 0.03})`;
        ctx.lineWidth = 0.8; ctx.stroke();
      });
      // Lock icon drawn as geo
      const ls = 24;
      ctx.beginPath(); ctx.arc(cx, cy - ls * 0.3, ls * 0.55, Math.PI, 0, false);
      ctx.strokeStyle = 'rgba(255,200,80,0.7)'; ctx.lineWidth = 2; ctx.stroke();
      ctx.fillStyle = 'rgba(255,200,80,0.18)';
      ctx.fillRect(cx - ls * 0.55, cy - ls * 0.1, ls * 1.1, ls * 1.1);
      ctx.strokeStyle = 'rgba(255,200,80,0.6)'; ctx.lineWidth = 1.5;
      ctx.strokeRect(cx - ls * 0.55, cy - ls * 0.1, ls * 1.1, ls * 1.1);
      ctx.beginPath(); ctx.arc(cx, cy + ls * 0.35, ls * 0.22, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255,200,80,0.9)'; ctx.fill();
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(animId);
  }, []);
  return <canvas ref={ref} style={{ width: 300, height: 300 }} />;
}

export function Store() {
  return (
    <div className="sg-page" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      {/* Ambient */}
      <div style={{ position: 'absolute', top: '20%', left: '20%', width: 600, height: 600, background: 'radial-gradient(circle, rgba(255,200,80,0.04) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '20%', right: '15%', width: 400, height: 400, background: 'radial-gradient(circle, rgba(100,50,200,0.04) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: 680, padding: '0 5%' }}>

        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 48 }}>
          <FloatingOrb />
        </div>

        <div className="label-mono" style={{ marginBottom: 24, display: 'flex', alignItems: 'center', gap: 12, justifyContent: 'center' }}>
          <span style={{ display: 'inline-block', width: 20, height: 1, background: 'rgba(255,200,80,0.5)' }} />
          $ cd /tienda
          <span style={{ display: 'inline-block', width: 20, height: 1, background: 'rgba(255,200,80,0.5)' }} />
        </div>

        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(4rem, 12vw, 9rem)',
          fontWeight: 300, lineHeight: 0.88,
          letterSpacing: '-0.02em', marginBottom: 32,
        }}>
          <em className="anim-shimmer" style={{ fontStyle: 'italic' }}>Coming</em><br />
          <span style={{ color: 'rgba(200,210,255,0.2)', fontWeight: 300 }}>Soon</span>
        </h1>

        <div style={{ height: 1, background: 'linear-gradient(90deg,transparent,rgba(255,200,80,0.35),transparent)', margin: '32px 0 36px' }} />

        <p style={{ fontSize: 16, color: 'rgba(200,210,255,0.42)', lineHeight: 1.85, marginBottom: 16 }}>
          Algo exclusivo se está preparando.
        </p>
        <p style={{ fontSize: 14, color: 'rgba(200,210,255,0.28)', lineHeight: 1.8, marginBottom: 52, maxWidth: 440, margin: '0 auto 52px' }}>
          Recursos premium, templates, herramientas y más para llevar tu aprendizaje al siguiente nivel. Pronto disponible.
        </p>

        {/* Progress bar */}
        <div style={{ maxWidth: 320, margin: '0 auto 48px', textAlign: 'left' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
            <span className="label-mono" style={{ fontSize: 9, opacity: 0.4 }}>Progreso de desarrollo</span>
            <span className="label-mono" style={{ fontSize: 9, color: '#ffd060', opacity: 0.7 }}>73%</span>
          </div>
          <div style={{ height: 2, background: 'rgba(255,200,80,0.1)', borderRadius: 1, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: '73%', background: 'linear-gradient(90deg,#ffd060,#ffb830)', borderRadius: 1, boxShadow: '0 0 8px rgba(255,200,80,0.5)' }} />
          </div>
        </div>

        <a href="https://discord.wstars.lat" target="_blank" rel="noreferrer" className="sg-btn-ghost">
          Avísame cuando esté listo ✦
        </a>

        <div style={{ marginTop: 56, display: 'flex', justifyContent: 'center', gap: 32 }}>
          {[['Recursos', 'premium'], ['Templates', 'listos'], ['Soporte', 'incluido']].map(([a, b]) => (
            <div key={a} style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 300, color: 'rgba(255,200,80,0.5)', lineHeight: 1 }}>✦</div>
              <div style={{ fontSize: 11, color: 'rgba(200,210,255,0.35)', marginTop: 8, fontFamily: 'var(--font-mono)', letterSpacing: '0.08em' }}>{a}<br />{b}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
