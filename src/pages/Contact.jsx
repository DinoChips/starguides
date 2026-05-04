import { useEffect } from 'react';
import { MessageCircle, Ticket, Users } from 'lucide-react';

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

export function Contact() {
  useReveal();
  return (
    <div className="sg-page">
      <div style={{ position: 'absolute', top: 0, right: 0, width: 600, height: 600, background: 'radial-gradient(circle at 80% 20%, rgba(255,200,80,0.05) 0%, transparent 60%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: 100, left: -100, width: 500, height: 500, background: 'radial-gradient(circle, rgba(100,50,200,0.04) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 5%', position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <div style={{ padding: '80px 0 100px', textAlign: 'center' }}>
          <div className="label-mono reveal" style={{ marginBottom: 20 }}>// Contacto</div>
          <h1 className="reveal" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3.5rem, 8vw, 8rem)', fontWeight: 300, lineHeight: 0.9, marginBottom: 28 }}>
            <em style={{ fontStyle: 'italic' }} className="text-gold">Hablemos.</em>
          </h1>
          <p className="reveal" style={{ fontSize: 16, color: 'rgba(200,210,255,0.42)', maxWidth: 520, margin: '0 auto', lineHeight: 1.8 }}>
            ¿Tienes dudas, sugerencias o necesitas ayuda especializada? La mejor forma de contactarme es a través de nuestro Discord.
          </p>
        </div>

        {/* Discord CTA principal */}
        <div className="reveal" style={{
          border: '1px solid rgba(255,200,80,0.18)', borderRadius: 16,
          padding: 'clamp(50px, 8vw, 80px)', textAlign: 'center',
          background: 'linear-gradient(135deg,rgba(255,200,80,0.04),rgba(80,30,150,0.04))',
          backdropFilter: 'blur(24px)', marginBottom: 80,
          position: 'relative', overflow: 'hidden',
        }}>
          {/* Corner marks */}
          {[[-1,-1],[1,-1],[-1,1],[1,1]].map(([sx,sy], i) => (
            <div key={i} style={{
              position: 'absolute',
              top: sy < 0 ? -1 : 'auto', bottom: sy > 0 ? -1 : 'auto',
              left: sx < 0 ? -1 : 'auto', right: sx > 0 ? -1 : 'auto',
              width: 20, height: 20,
              borderTop: sy < 0 ? '1px solid rgba(255,200,80,0.45)' : 'none',
              borderBottom: sy > 0 ? '1px solid rgba(255,200,80,0.45)' : 'none',
              borderLeft: sx < 0 ? '1px solid rgba(255,200,80,0.45)' : 'none',
              borderRight: sx > 0 ? '1px solid rgba(255,200,80,0.45)' : 'none',
            }} />
          ))}
          <div style={{ position: 'absolute', top: -100, right: -100, width: 350, height: 350, borderRadius: '50%', background: 'radial-gradient(circle,rgba(255,200,80,0.07),transparent 70%)', pointerEvents: 'none' }} />

          <div style={{ fontFamily: 'var(--font-display)', fontSize: 56, marginBottom: 24, lineHeight: 1 }}>💬</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 300, lineHeight: 0.95, marginBottom: 20 }}>
            Únete al servidor<br />
            <em className="text-gold" style={{ fontStyle: 'italic' }}>de Discord</em>
          </h2>
          <p style={{ fontSize: 15, color: 'rgba(200,210,255,0.42)', marginBottom: 44, maxWidth: 460, margin: '0 auto 44px', lineHeight: 1.8 }}>
            Nuestra comunidad está activa en Discord. Entra, pregunta lo que necesites y abre un ticket si necesitas ayuda personalizada.
          </p>
          <a href="https://discord.wstars.lat" target="_blank" rel="noreferrer" className="sg-btn-primary">
            Entrar al Discord ✦
          </a>
          <div style={{ marginTop: 20, fontSize: 12, color: 'rgba(200,210,255,0.25)', fontFamily: 'var(--font-mono)' }}>
            Gratuito. Sin requisitos.
          </div>
        </div>

        {/* How it works */}
        <div style={{ marginBottom: 100 }}>
          <div className="reveal" style={{ marginBottom: 52, textAlign: 'center' }}>
            <div className="label-mono" style={{ marginBottom: 16 }}>// Proceso</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 4rem)', fontWeight: 300, lineHeight: 0.95 }}>
              ¿Cómo <em className="text-gold" style={{ fontStyle: 'italic' }}>funciona</em>?
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
            {[
              { icon: <Users size={22} />, step: '01', title: 'Entra al Discord', desc: 'Únete con el enlace de arriba. Sin requisitos, solo ganas de aprender.' },
              { icon: <Ticket size={22} />, step: '02', title: 'Abre un ticket', desc: 'Usa el canal #tickets para soporte técnico especializado y personalizado.' },
              { icon: <MessageCircle size={22} />, step: '03', title: 'Recibe ayuda', desc: 'Te respondo directamente con soluciones concretas, no genéricas.' },
            ].map(({ icon, step, title, desc }, i) => (
              <div key={step} className={`sg-card reveal reveal-delay-${i + 1}`} style={{ padding: '36px 28px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
                  <span style={{ color: '#ffd060', opacity: 0.8 }}>{icon}</span>
                  <span className="label-mono" style={{ fontSize: 10, opacity: 0.35 }}>{step}</span>
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: 'rgba(240,240,255,0.88)', marginBottom: 12 }}>{title}</h3>
                <p style={{ fontSize: 13, color: 'rgba(200,210,255,0.4)', lineHeight: 1.7 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
