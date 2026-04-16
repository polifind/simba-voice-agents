import Link from 'next/link';
import { getCategory } from '@/lib/content/categories';
import { getAuthor } from '@/lib/content/authors';
import type { ArticleMeta } from '@/lib/content/articles';

export function ArticleCard({ article, variant = 'default' }: { article: ArticleMeta; variant?: 'default' | 'large' | 'compact' }) {
  const category = getCategory(article.category);
  const author = getAuthor(article.author);
  const dateStr = new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  if (variant === 'compact') {
    return (
      <Link href={`/resources/${article.slug}`} className="group block py-4 border-b border-simba-gray-100 last:border-0">
        <div className="text-xs uppercase tracking-wider text-simba-gray-500 mb-1">
          {category?.name}
        </div>
        <h3 className="text-base font-semibold text-simba-black group-hover:text-simba-blue transition-colors leading-snug">
          {article.title}
        </h3>
        <div className="mt-1 text-xs text-simba-gray-500">
          {author?.name} · {dateStr} · {article.readingMinutes} min
        </div>
      </Link>
    );
  }

  if (variant === 'large') {
    return (
      <Link href={`/resources/${article.slug}`} className="group block rounded-2xl border border-simba-gray-200 bg-white p-6 hover:border-simba-gray-300 hover:shadow-sm transition-all">
        <div className="text-xs font-semibold uppercase tracking-wider text-simba-blue mb-2">
          {category?.emoji} {category?.name}
        </div>
        <h2 className="text-2xl font-bold text-simba-black group-hover:text-simba-blue transition-colors leading-tight">
          {article.title}
        </h2>
        <p className="mt-3 text-simba-gray-600 leading-relaxed">
          {article.excerpt}
        </p>
        <div className="mt-5 text-sm text-simba-gray-500">
          {author?.name} · {dateStr} · {article.readingMinutes} min read
        </div>
      </Link>
    );
  }

  // default
  return (
    <Link href={`/resources/${article.slug}`} className="group block rounded-2xl border border-simba-gray-200 bg-white p-5 hover:border-simba-gray-300 hover:shadow-sm transition-all h-full flex flex-col">
      <div className="text-[11px] font-semibold uppercase tracking-wider text-simba-gray-500 mb-2">
        {category?.emoji} {category?.shortName}
      </div>
      <h3 className="text-lg font-bold text-simba-black group-hover:text-simba-blue transition-colors leading-snug">
        {article.title}
      </h3>
      <p className="mt-2 text-sm text-simba-gray-600 leading-relaxed line-clamp-3 flex-1">
        {article.excerpt}
      </p>
      <div className="mt-4 text-xs text-simba-gray-500">
        {author?.name} · {dateStr} · {article.readingMinutes} min
      </div>
    </Link>
  );
}
