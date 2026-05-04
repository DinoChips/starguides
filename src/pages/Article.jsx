import { useParams, Link } from 'react-router-dom';
import { articles } from '../data/articles';
import { Clock, Tag, Share2 } from 'lucide-react';
import { useEffect } from 'react';

const CAT_ACCENTS = {
  minecraft: '#ffd060', it: '#a78bfa', 'web-dev': '#60efff', humanos: '#fb923c',
};

function renderContent(content) {
  if (!content) return null;
  const lines = content.trim().split('\n');
  const result = [];
  let i = 0;

  while (i < lines.length) {
    let line = lines[i];

    // Code block
    if (line.startsWith('```')) {
      const lang = line.replace('```', '').trim();
      let code = '';
      i++;
      while (i < lines.length && !lines[i].startsWith('```')) {
        code += lines[i] + '\n';
        i++;
      }
      result.push(
        <div key={i} style={{
          background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,200,80,0.12)',
          borderRadius: 6, overflow: 'hidden', margin: '24px 0',
        }}>
          {lang && (
            <div style={{ padding: '6px 16px', background: 'rgba(255,200,80,0.06)', fontFamily: 'var(--font-mono)', fontSize: 11, color: 'rgba(255,200,80,0.5)', letterSpacing: '0.1em', borderBottom: '1px solid rgba(255,200,80,0.08)' }}>
              {lang}
            </div>
          )}
          <pre style={{ margin: 0, padding: '20px', overflowX: 'auto', fontFamily: 'var(--font-mono)', fontSize: 13, lineHeight: 1.7, color: 'rgba(200,230,255,0.85)' }}>
            <code>{code.trimEnd()}</code>
          </pre>
        </div>
      );
      i++;
      continue;
    }

    // H1
    if (line.startsWith('# ')) {
      result.push(<h1 key={i} style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,5vw,4rem)', fontWeight: 300, color: '#f0f0ff', margin: '48px 0 20px', letterSpacing: '-0.02em', lineHeight: 1.1 }}>{line.replace('# ', '')}</h1>);
      i++; continue;
    }
    // H2
    if (line.startsWith('## ')) {
      result.push(<h2 key={i} style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.4rem,3vw,2.2rem)', fontWeight: 400, color: '#f0f0ff', margin: '40px 0 14px', letterSpacing: '-0.01em' }}>{line.replace('## ', '')}</h2>);
      i++; continue;
    }
    // H3
    if (line.startsWith('### ')) {
      result.push(<h3 key={i} style={{ fontFamily: 'var(--font-ui)', fontSize: '1.1rem', fontWeight: 700, color: 'rgba(255,200,80,0.8)', margin: '28px 0 10px', letterSpacing: '0.02em' }}>{line.replace('### ', '')}</h3>);
      i++; continue;
    }
    // List item
    if (line.startsWith('- ')) {
      const items = [];
      while (i < lines.length && lines[i].startsWith('- ')) {
        items.push(<li key={i} style={{ color: 'rgba(200,210,255,0.65)', lineHeight: 1.8, marginBottom: 4 }}>{renderInlineMarkdown(lines[i].replace('- ', ''))}</li>);
        i++;
      }
      result.push(<ul key={`ul-${i}`} style={{ paddingLeft: 20, margin: '12px 0 20px' }}>{items}</ul>);
      continue;
    }
    // Empty line
    if (!line.trim()) { i++; continue; }
    // Paragraph
    result.push(<p key={i} style={{ color: 'rgba(200,210,255,0.62)', lineHeight: 1.95, marginBottom: 16, fontSize: 16 }}>{renderInlineMarkdown(line)}</p>);
    i++;
  }
  return result;
}

function renderInlineMarkdown(text) {
  // Renderiza [texto](url) como links
  const parts = [];
  const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    // Texto antes del link
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }
    // Link
    parts.push(
      <a key={match.index} href={match[2]} target="_blank" rel="noreferrer" style={{ color: '#ffd060', textDecoration: 'underline', transition: 'color 0.2s' }}>
        {match[1]}
      </a>
    );
    lastIndex = regex.lastIndex;
  }

  // Texto restante
  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts.length > 0 ? parts : text;
}

export function Article() {
  const { id } = useParams();
  const article = articles.find(a => a.id === parseInt(id));
  useEffect(() => { window.scrollTo(0, 0); }, [id]);

  if (!article) {
    return (
      <div className="sg-page" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 80, color: 'rgba(255,200,80,0.15)', fontWeight: 300, lineHeight: 1 }}>404</div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 300, marginBottom: 24 }}>Artículo no encontrado</h1>
          <Link to="/categorias" className="sg-btn-primary">Volver a guías</Link>
        </div>
      </div>
    );
  }

  const accent = CAT_ACCENTS[article.category] || '#ffd060';
  const related = articles.filter(a => a.category === article.category && a.id !== article.id).slice(0, 3);

  return (
    <div className="sg-page">
      <div style={{ position: 'absolute', top: 0, right: 0, width: 600, height: 500, background: `radial-gradient(ellipse at 80% 20%, ${accent}06 0%, transparent 60%)`, pointerEvents: 'none' }} />

      <div style={{ maxWidth: 860, margin: '0 auto', padding: '0 5%', position: 'relative', zIndex: 1 }}>

        {/* Back */}
        <div style={{ paddingTop: 48 }}>
          <Link to="/categorias" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'rgba(255,200,80,0.55)', textDecoration: 'none', fontSize: 12, letterSpacing: '0.1em', fontFamily: 'var(--font-mono)', transition: 'color 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.color = '#ffd060'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,200,80,0.55)'}>
            ← VOLVER A GUÍAS
          </Link>
        </div>

        {/* Header */}
        <div style={{ padding: '48px 0 40px' }}>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 24, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 48 }}>{article.image}</span>
            <span className="label-mono" style={{ color: accent, opacity: 0.8 }}>{article.category.toUpperCase()}</span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 6vw, 5.5rem)', fontWeight: 300, lineHeight: 0.93, letterSpacing: '-0.02em', marginBottom: 32 }}>
            {article.title}
          </h1>
          <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap', marginBottom: 32 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'rgba(200,210,255,0.38)', fontFamily: 'var(--font-mono)' }}>
              <Clock size={14} style={{ color: accent, opacity: 0.6 }} /> {article.readTime}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'rgba(200,210,255,0.38)', fontFamily: 'var(--font-mono)' }}>
              <Tag size={14} style={{ color: accent, opacity: 0.6 }} /> {article.date}
            </div>
            <button
              onClick={() => { navigator.clipboard?.writeText(window.location.href); }}
              style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'rgba(200,210,255,0.38)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-mono)', transition: 'color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.color = accent}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(200,210,255,0.38)'}>
              <Share2 size={14} /> copiar enlace
            </button>
          </div>
          <div className="gold-line" />
        </div>

        {/* Tags */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 48 }}>
          {(article.tags || []).map(tag => (
            <span key={tag} style={{ fontSize: 10, letterSpacing: '0.12em', fontFamily: 'var(--font-mono)', padding: '5px 12px', border: `1px solid ${accent}25`, color: accent, opacity: 0.65, borderRadius: 2 }}>#{tag}</span>
          ))}
        </div>

        {/* Excerpt */}
        <p style={{ fontSize: 18, color: 'rgba(200,210,255,0.55)', lineHeight: 1.8, marginBottom: 48, fontStyle: 'italic', borderLeft: `2px solid ${accent}40`, paddingLeft: 20 }}>
          {article.excerpt}
        </p>

        {/* Content */}
        <div style={{ marginBottom: 80 }}>
          {renderContent(article.content)}
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div style={{ marginBottom: 100 }}>
            <div className="label-mono" style={{ marginBottom: 32 }}>// También te puede interesar</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16 }}>
              {related.map(rel => {
                const rAccent = CAT_ACCENTS[rel.category] || '#ffd060';
                return (
                  <Link key={rel.id} to={`/articulo/${rel.id}`} style={{ textDecoration: 'none' }}>
                    <div className="sg-card" style={{ padding: '24px 20px' }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = rAccent + '35'; e.currentTarget.style.background = rAccent + '06'; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,200,80,0.12)'; e.currentTarget.style.background = 'rgba(255,255,255,0.018)'; }}>
                      <span style={{ fontSize: 22, display: 'block', marginBottom: 12 }}>{rel.image}</span>
                      <div style={{ fontSize: 14, fontWeight: 700, color: 'rgba(240,240,255,0.8)', lineHeight: 1.4, marginBottom: 8 }}>{rel.title}</div>
                      <div style={{ fontSize: 11, color: rAccent, fontFamily: 'var(--font-mono)', opacity: 0.6 }}>{rel.readTime}</div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
