import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArticleCard } from '@/components/blog/ArticleCard';
import { Breadcrumbs } from '@/components/blog/Breadcrumbs';
import { categories, getCategory } from '@/lib/content/categories';
import { getByCategory, getUsedCategories } from '@/lib/content/articles';

type RouteParams = { topic: string };

export async function generateStaticParams(): Promise<RouteParams[]> {
  return getUsedCategories().map((slug) => ({ topic: slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { topic } = await params;
  const cat = getCategory(topic);
  if (!cat) return {};
  return {
    title: `${cat.name} — Voice AI Articles`,
    description: cat.description,
    alternates: { canonical: `/resources/topic/${cat.slug}` },
    openGraph: {
      title: cat.name,
      description: cat.description,
      url: `https://simbavoice.ai/resources/topic/${cat.slug}`,
      type: 'website',
    },
  };
}

export default async function TopicPage({ params }: { params: Promise<RouteParams> }) {
  const { topic } = await params;
  const cat = getCategory(topic);
  if (!cat) notFound();
  const articles = getByCategory(cat.slug);

  return (
    <div className="bg-white min-h-screen">
      <div className="border-b border-simba-gray-100 bg-simba-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Resources', href: '/resources' }, { label: cat.shortName }]} />
          <div className="mt-4 text-3xl">{cat.emoji}</div>
          <h1 className="mt-2 text-4xl md:text-5xl font-black tracking-tight text-simba-black">{cat.name}</h1>
          <p className="mt-3 text-lg text-simba-gray-600 max-w-3xl leading-relaxed">{cat.description}</p>
          <p className="mt-3 text-sm text-simba-gray-500">{articles.length} article{articles.length === 1 ? '' : 's'}</p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {articles.map((a) => (
            <ArticleCard key={a.slug} article={a} />
          ))}
        </div>

        {/* Other topics */}
        <div className="mt-16 pt-12 border-t border-simba-gray-200">
          <h2 className="text-2xl font-bold text-simba-black mb-6">Other topics</h2>
          <div className="flex flex-wrap gap-2">
            {categories.filter((c) => c.slug !== cat.slug).map((c) => (
              <a key={c.slug} href={`/resources/topic/${c.slug}`} className="inline-flex items-center gap-1 rounded-full border border-simba-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-simba-gray-700 hover:bg-simba-gray-50 transition-colors">
                {c.emoji} {c.shortName}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
