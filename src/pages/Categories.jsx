import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { articles, categories } from '../data/articles';

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.06 });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  });
}

const CAT_ACCENTS = {
  minecraft: '#ffd060',
  it: '#a78bfa',
  'web-dev': '#60efff',
  humanos: '#fb923c',
};

export function Categories() {
  const [searchParams] = useSearchParams();
  const initialCat = searchParams.get('cat');
  const [selectedCategory, setSelectedCategory] = useState(initialCat || null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => { if (initialCat) setSelectedCategory(initialCat); }, [initialCat]);
  useReveal();

  const filtered = articles.filter(article => {
    const matchCategory = !selectedCategory || article.category === selectedCategory;
    const matchSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCategory && matchSearch;
  });

  const activeCat = categories.find(c => c.id === selectedCategory);
  const accent = selectedCategory ? (CAT_ACCENTS[selectedCategory] || '#ffd060') : '#ffd060';

  return (
    <div className="sg-page">
      {/* Ambient */}
      <div style={{ position: 'absolute', top: 0, left: '30%', width: 700, height: 500, background: `radial-gradient(ellipse, ${accent}08 0%, transparent 70%)`, pointerEvents: 'none', transition: 'background 0.6s' }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 5%', position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <div style={{ padding: '80px 0 72px', textAlign: 'center' }}>
          <div className="label-mono reveal" style={{ marginBottom: 20 }}>// Guías</div>
          <h1 className="reveal" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3rem, 7vw, 7rem)', fontWeight: 300, lineHeight: 0.93, marginBottom: 24 }}>
            {activeCat ? (
              <span>{activeCat.icon}{' '}<em style={{ fontStyle: 'italic', color: accent }}>{activeCat.name}</em></span>
            ) : (
              <>Todas las <em style={{ fontStyle: 'italic' }} className="text-gold">Guías</em></>
            )}
          </h1>
          <p className="reveal" style={{ fontSize: 15, color: 'rgba(200,210,255,0.4)', maxWidth: 500, margin: '0 auto', lineHeight: 1.8 }}>
            {activeCat ? activeCat.description : 'Guías profundas sobre IT, Minecraft, Web Dev y HumanOS'}
          </p>
        </div>

        {/* Search */}
        <div className="reveal" style={{ maxWidth: 560, margin: '0 auto 48px', position: 'relative' }}>
          <input
            type="text"
            placeholder="Buscar guías..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            style={{
              width: '100%', padding: '14px 20px 14px 48px',
              background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,200,80,0.18)',
              borderRadius: 4, color: 'var(--text-primary)', fontSize: 14,
              fontFamily: 'var(--font-ui)', outline: 'none', transition: 'border-color 0.2s',
            }}
            onFocus={e => e.target.style.borderColor = 'rgba(255,200,80,0.45)'}
            onBlur={e => e.target.style.borderColor = 'rgba(255,200,80,0.18)'}
          />
          <span style={{ position: 'absolute', left: 18, top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,200,80,0.4)', fontSize: 14 }}>⌕</span>
        </div>

        {/* Category filters */}
        <div className="reveal" style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center', marginBottom: 80 }}>
          <button
            onClick={() => setSelectedCategory(null)}
            style={{
              padding: '9px 22px', borderRadius: 3, fontSize: 11, letterSpacing: '0.1em',
              fontFamily: 'var(--font-ui)', fontWeight: 700, cursor: 'pointer', transition: 'all 0.25s',
              border: selectedCategory === null ? 'none' : '1px solid rgba(255,200,80,0.28)',
              background: selectedCategory === null ? 'linear-gradient(120deg,#ffd060,#ffb830,#fff0a0)' : 'transparent',
              color: selectedCategory === null ? '#080608' : 'rgba(255,200,80,0.7)',
              boxShadow: selectedCategory === null ? '0 0 24px rgba(255,200,60,0.3)' : 'none',
            }}
          >TODAS</button>
          {categories.map(cat => {
            const acc = CAT_ACCENTS[cat.id] || '#ffd060';
            const isActive = selectedCategory === cat.id;
            return (
              <button key={cat.id} onClick={() => setSelectedCategory(cat.id)} style={{
                padding: '9px 22px', borderRadius: 3, fontSize: 11, letterSpacing: '0.1em',
                fontFamily: 'var(--font-ui)', fontWeight: 700, cursor: 'pointer', transition: 'all 0.25s',
                border: `1px solid ${isActive ? acc + '60' : 'rgba(255,200,80,0.15)'}`,
                background: isActive ? acc + '15' : 'transparent',
                color: isActive ? acc : 'rgba(200,210,255,0.5)',
                boxShadow: isActive ? `0 0 20px ${acc}20` : 'none',
              }}>
                {cat.icon} {cat.name.toUpperCase()}
              </button>
            );
          })}
        </div>

        {/* Articles */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20, marginBottom: 120 }}>
          {filtered.length === 0 ? (
            <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '80px 0', color: 'rgba(200,210,255,0.3)', fontFamily: 'var(--font-mono)', fontSize: 13 }}>
              // No se encontraron guías
            </div>
          ) : filtered.map((article, i) => {
            const acc = CAT_ACCENTS[article.category] || '#ffd060';
            return (
              <div key={article.id} className={`sg-card reveal reveal-delay-${(i % 4) + 1}`} style={{ padding: '32px 28px' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = acc + '35'; e.currentTarget.style.background = acc + '06'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,200,80,0.12)'; e.currentTarget.style.background = 'rgba(255,255,255,0.018)'; }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                  <span style={{ fontSize: 28 }}>{article.image}</span>
                  <span className="label-mono" style={{ fontSize: 9, color: acc, opacity: 0.7 }}>{article.readTime}</span>
                </div>
                <div className="label-mono" style={{ fontSize: 9, color: acc, opacity: 0.55, marginBottom: 12 }}>
                  {article.category.toUpperCase()}
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: 'rgba(240,240,255,0.88)', marginBottom: 12, lineHeight: 1.4, letterSpacing: '-0.01em' }}>
                  {article.title}
                </h3>
                <p style={{ fontSize: 13, color: 'rgba(200,210,255,0.38)', lineHeight: 1.65, marginBottom: 24 }}>
                  {article.excerpt}
                </p>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {(article.tags || []).slice(0, 3).map(tag => (
                    <span key={tag} style={{
                      fontSize: 9, letterSpacing: '0.1em', fontFamily: 'var(--font-mono)',
                      padding: '3px 8px', border: `1px solid ${acc}22`,
                      color: acc, opacity: 0.6, borderRadius: 2,
                    }}>#{tag}</span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
