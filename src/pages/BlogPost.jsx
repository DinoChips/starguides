import { useParams, Link } from 'react-router-dom';
import { blogPosts } from '../data/articles';
import { Clock, Tag, Share2, ArrowLeft } from 'lucide-react';
import { useEffect } from 'react';
import { useSEO } from '../App';

// Reutiliza el renderer de markdown del Article (inline version)
function renderInlineMarkdown(text) {
  const parts = [];
  const regex = /(\*\*(.+?)\*\*|\*(.+?)\*|`([^`]+)`|\[([^\]]+)\]\(([^)]+)\))/g;
  let lastIndex = 0;
  let match;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) parts.push(text.substring(lastIndex, match.index));
    if (match[2] !== undefined) {
      parts.push(<strong key={match.index} style={{ color: 'rgba(240,240,255,0.9)', fontWeight: 700 }}>{match[2]}</strong>);
    } else if (match[3] !== undefined) {
      parts.push(<em key={match.index} style={{ color: 'rgba(200,210,255,0.75)', fontStyle: 'italic' }}>{match[3]}</em>);
    } else if (match[4] !== undefined) {
      parts.push(<code key={match.index} style={{ fontFamily: 'var(--font-mono)', fontSize: 13, background: 'rgba(0,0,0,0.35)', border: '1px solid rgba(255,200,80,0.15)', borderRadius: 3, padding: '1px 6px', color: 'rgba(255,200,80,0.85)' }}>{match[4]}</code>);
    } else if (match[5] !== undefined) {
      parts.push(<a key={match.index} href={match[6]} target="_blank" rel="noreferrer" style={{ color: '#ffd060', textDecoration: 'underline' }}>{match[5]}</a>);
    }
    lastIndex = regex.lastIndex;
  }
  if (lastIndex < text.length) parts.push(text.substring(lastIndex));
  return parts.length > 0 ? parts : text;
}

function renderContent(content) {
  if (!content) return null;
  const lines = content.trim().split('\n');
  const result = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (line.startsWith('```')) {
      const lang = line.replace('```', '').trim();
      let code = '';
      i++;
      while (i < lines.length && !lines[i].startsWith('```')) { code += lines[i] + '\n'; i++; }
      result.push(
        <div key={i} style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,200,80,0.12)', borderRadius: 6, overflow: 'hidden', margin: '24px 0' }}>
          {lang && <div style={{ padding: '6px 16px', background: 'rgba(255,200,80,0.06)', fontFamily: 'var(--font-mono)', fontSize: 11, color: 'rgba(255,200,80,0.5)', letterSpacing: '0.1em', borderBottom: '1px solid rgba(255,200,80,0.08)' }}>{lang}</div>}
          <pre style={{ margin: 0, padding: '20px', overflowX: 'auto', fontFamily: 'var(--font-mono)', fontSize: 13, lineHeight: 1.7, color: 'rgba(200,230,255,0.85)' }}><code>{code.trimEnd()}</code></pre>
        </div>
      );
      i++; continue;
    }
    if (line.startsWith('# '))  { result.push(<h1 key={i} style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,5vw,3.5rem)', fontWeight: 300, color: '#f0f0ff', margin: '48px 0 20px', letterSpacing: '-0.02em', lineHeight: 1.1 }}>{line.replace('# ', '')}</h1>); i++; continue; }
    if (line.startsWith('## ')) { result.push(<h2 key={i} style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.3rem,2.5vw,2rem)', fontWeight: 400, color: '#f0f0ff', margin: '40px 0 14px', letterSpacing: '-0.01em' }}>{line.replace('## ', '')}</h2>); i++; continue; }
    if (line.startsWith('### ')){ result.push(<h3 key={i} style={{ fontFamily: 'var(--font-ui)', fontSize: '1.05rem', fontWeight: 700, color: 'rgba(255,200,80,0.8)', margin: '28px 0 10px' }}>{line.replace('### ', '')}</h3>); i++; continue; }
    if (line.startsWith('> ')) {
      const items = [];
      while (i < lines.length && lines[i].startsWith('> ')) { items.push(<p key={i} style={{ margin: 0, color: 'rgba(200,210,255,0.6)', lineHeight: 1.8 }}>{renderInlineMarkdown(lines[i].replace('> ', ''))}</p>); i++; }
      result.push(<blockquote key={`bq-${i}`} style={{ borderLeft: '2px solid rgba(255,200,80,0.4)', paddingLeft: 16, margin: '20px 0', background: 'rgba(255,200,80,0.04)', borderRadius: '0 4px 4px 0', padding: '12px 16px' }}>{items}</blockquote>);
      continue;
    }
    if (line.startsWith('- ')) {
      const items = [];
      while (i < lines.length && lines[i].startsWith('- ')) { items.push(<li key={i} style={{ color: 'rgba(200,210,255,0.65)', lineHeight: 1.8, marginBottom: 4 }}>{renderInlineMarkdown(lines[i].replace('- ', ''))}</li>); i++; }
      result.push(<ul key={`ul-${i}`} style={{ paddingLeft: 20, margin: '12px 0 20px' }}>{items}</ul>);
      continue;
    }
    if (!line.trim()) { i++; continue; }
    result.push(<p key={i} style={{ color: 'rgba(200,210,255,0.62)', lineHeight: 1.95, marginBottom: 16, fontSize: 16 }}>{renderInlineMarkdown(line)}</p>);
    i++;
  }
  return result;
}

export function BlogPost() {
  const { id } = useParams();
  const post = blogPosts.find(p => p.id === parseInt(id));
  useEffect(() => { window.scrollTo(0, 0); }, [id]);

  useSEO({
    title: post?.title,
    description: post?.excerpt,
    url: `https://starguides.dev/blog/${id}`,
    type: 'article',
  });

  if (!post) {
    return (
      <div className="sg-page" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 80, color: 'rgba(255,200,80,0.15)', fontWeight: 300, lineHeight: 1 }}>404</div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 300, marginBottom: 24 }}>Entrada no encontrada</h1>
          <Link to="/blog" className="sg-btn-primary">Volver al blog</Link>
        </div>
      </div>
    );
  }

  const otherPosts = blogPosts.filter(p => p.id !== post.id).slice(0, 3);

  return (
    <div className="sg-page">
      <div style={{ position: 'absolute', top: 0, right: 0, width: 600, height: 500, background: 'radial-gradient(ellipse at 80% 20%,rgba(255,200,80,0.05) 0%,transparent 60%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 820, margin: '0 auto', padding: '0 5%', position: 'relative', zIndex: 1 }}>

        {/* Back */}
        <div style={{ paddingTop: 48 }}>
          <Link to="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'rgba(255,200,80,0.55)', textDecoration: 'none', fontSize: 12, letterSpacing: '0.1em', fontFamily: 'var(--font-mono)', transition: 'color 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.color = '#ffd060'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,200,80,0.55)'}>
            <ArrowLeft size={13} /> VOLVER AL BLOG
          </Link>
        </div>

        {/* Header */}
        <div style={{ padding: '48px 0 32px' }}>
          <div style={{ fontSize: 52, marginBottom: 24 }}>{post.image}</div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.2rem, 5vw, 4.5rem)', fontWeight: 300, lineHeight: 0.95, letterSpacing: '-0.02em', marginBottom: 28 }}>
            {post.title}
          </h1>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', marginBottom: 28 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'rgba(200,210,255,0.38)', fontFamily: 'var(--font-mono)' }}>
              <Clock size={13} style={{ color: '#ffd060', opacity: 0.6 }} /> {post.readTime}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'rgba(200,210,255,0.38)', fontFamily: 'var(--font-mono)' }}>
              <Tag size={13} style={{ color: '#ffd060', opacity: 0.6 }} /> {post.date}
            </div>
            <button
              onClick={() => navigator.clipboard?.writeText(window.location.href)}
              style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'rgba(200,210,255,0.38)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-mono)', transition: 'color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.color = '#ffd060'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(200,210,255,0.38)'}>
              <Share2 size={13} /> copiar enlace
            </button>
          </div>

          {/* Tags */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 36 }}>
            {post.tags.map(tag => (
              <span key={tag} style={{ fontSize: 10, letterSpacing: '0.12em', fontFamily: 'var(--font-mono)', padding: '5px 12px', border: '1px solid rgba(255,200,80,0.2)', color: 'rgba(255,200,80,0.65)', borderRadius: 2 }}>#{tag}</span>
            ))}
          </div>

          <div className="gold-line" />
        </div>

        {/* Excerpt */}
        <p style={{ fontSize: 18, color: 'rgba(200,210,255,0.55)', lineHeight: 1.8, marginBottom: 48, fontStyle: 'italic', borderLeft: '2px solid rgba(255,200,80,0.35)', paddingLeft: 20 }}>
          {post.excerpt}
        </p>

        {/* Content */}
        <div style={{ marginBottom: 80 }}>
          {renderContent(post.content)}
        </div>

        {/* Other posts */}
        {otherPosts.length > 0 && (
          <div style={{ marginBottom: 100 }}>
            <div className="label-mono" style={{ marginBottom: 32 }}>// Otras entradas</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16 }}>
              {otherPosts.map(rel => (
                <Link key={rel.id} to={`/blog/${rel.id}`} style={{ textDecoration: 'none' }}>
                  <div className="sg-card" style={{ padding: '24px 20px', transition: 'border-color 0.2s, background 0.2s' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,200,80,0.35)'; e.currentTarget.style.background = 'rgba(255,200,80,0.05)'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,200,80,0.12)'; e.currentTarget.style.background = 'rgba(255,255,255,0.018)'; }}>
                    <span style={{ fontSize: 22, display: 'block', marginBottom: 12 }}>{rel.image}</span>
                    <div style={{ fontSize: 14, fontWeight: 700, color: 'rgba(240,240,255,0.8)', lineHeight: 1.4, marginBottom: 8 }}>{rel.title}</div>
                    <div style={{ fontSize: 11, color: 'rgba(255,200,80,0.6)', fontFamily: 'var(--font-mono)' }}>{rel.readTime}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
