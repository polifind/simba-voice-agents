import { ArticleCard } from './ArticleCard';
import type { ArticleMeta } from '@/lib/content/articles';

export function RelatedArticles({ articles }: { articles: ArticleMeta[] }) {
  if (articles.length === 0) return null;
  return (
    <section className="mt-16 pt-12 border-t border-simba-gray-200">
      <h2 className="text-2xl font-bold text-simba-black mb-6">Related reading</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {articles.map((a) => (
          <ArticleCard key={a.slug} article={a} />
        ))}
      </div>
    </section>
  );
}
