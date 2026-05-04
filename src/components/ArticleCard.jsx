import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Tag } from 'lucide-react';

export function ArticleCard({ article }) {
  return (
    <Link to={`/articulo/${article.id}`}>
      <div className="card group h-full flex flex-col">
        {/* Image/Icon */}
        <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
          {article.image}
        </div>

        {/* Content */}
        <h3 className="text-xl font-bold mb-2 group-hover:text-neon-cyan transition-colors line-clamp-2">
          {article.title}
        </h3>

        <p className="text-gray-400 text-sm mb-4 line-clamp-2 flex-grow">
          {article.excerpt}
        </p>

        {/* Meta */}
        <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
          <span className="flex items-center gap-1">
            <Clock size={14} />
            {article.readTime}
          </span>
          <span>{article.date}</span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {article.tags.slice(0, 2).map(tag => (
            <span key={tag} className="px-2 py-1 bg-dark-border text-neon-cyan text-xs rounded">
              #{tag}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div className="flex items-center gap-2 text-neon-cyan font-semibold group-hover:gap-3 transition-all">
          Leer más
          <ArrowRight size={16} />
        </div>
      </div>
    </Link>
  );
}
