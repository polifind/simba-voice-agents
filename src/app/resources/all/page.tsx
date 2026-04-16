import type { Metadata } from 'next';
import Link from 'next/link';
import { ArticleCard } from '@/components/blog/ArticleCard';
import { Breadcrumbs } from '@/components/blog/Breadcrumbs';
import { categories } from '@/lib/content/categories';
import { getAllArticles } from '@/lib/content/articles';

export const metadata: Metadata = {
  title: 'All Articles',
  description: 'Every article from SIMBA Voice Agents — voice AI guides, engineering deep-dives, and trends.',
  alternates: { canonical: '/resources/all' },
};

export default function AllArticlesPage() {
  const all = getAllArticles();
  return (
    <div className="bg-white min-h-screen">
      <div className="border-b border-simba-gray-100 bg-simba-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Resources', href: '/resources' }, { label: 'All articles' }]} />
          <h1 className="mt-4 text-4xl md:text-5xl font-black tracking-tight text-simba-black">All articles</h1>
          <p className="mt-3 text-lg text-simba-gray-600">{all.length} articles across {categories.length} topics.</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {categories.map((c) => (
              <Link key={c.slug} href={`/resources/topic/${c.slug}`} className="inline-flex items-center gap-1 rounded-full border border-simba-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-simba-gray-700 hover:bg-simba-gray-100 transition-colors">
                {c.emoji} {c.shortName}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {all.map((a) => (
            <ArticleCard key={a.slug} article={a} />
          ))}
        </div>
      </div>
    </div>
  );
}
