import type { Metadata } from 'next';
import Link from 'next/link';
import { ArticleCard } from '@/components/blog/ArticleCard';
import { Breadcrumbs } from '@/components/blog/Breadcrumbs';
import { categories } from '@/lib/content/categories';
import { authors } from '@/lib/content/authors';
import { getAllArticles, getFeatured, getLatest, getByCategory } from '@/lib/content/articles';

export const metadata: Metadata = {
  title: 'Resources — Voice AI Guides, Trends, and Engineering',
  description:
    'In-depth, vendor-neutral guides on voice AI agents: customer support automation, outbound calling, integrations, speech tech, and more.',
  alternates: { canonical: '/resources' },
  openGraph: {
    title: 'SIMBA Voice Agents — Resources',
    description:
      'In-depth, vendor-neutral guides on voice AI agents: customer support, outbound calling, integrations, speech tech, and more.',
    url: 'https://simbavoice.ai/resources',
    type: 'website',
  },
};

export default function ResourcesHubPage() {
  const all = getAllArticles();
  const featured = getFeatured(3);
  const latest = getLatest(9);

  // CollectionPage JSON-LD
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'SIMBA Voice Agents — Resources',
    url: 'https://simbavoice.ai/resources',
    description:
      'In-depth guides on voice AI agents: customer support, outbound calling, integrations, speech tech, and more.',
    publisher: { '@type': 'Organization', name: 'SIMBA Voice Agents' },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: all.length,
    },
  };

  return (
    <div className="bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <div className="border-b border-simba-gray-100 bg-simba-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Resources' }]} />
          <h1 className="mt-4 text-4xl md:text-5xl font-black tracking-tight text-simba-black">
            Resources
          </h1>
          <p className="mt-4 text-lg text-simba-gray-600 max-w-3xl leading-relaxed">
            Vendor-neutral, deeply researched guides on building, buying, and operating voice AI agents.
            Written by the SIMBA team to help anyone — engineers, support leaders, founders — get voice AI right.
          </p>
        </div>
      </div>

      {/* Featured */}
      {featured.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-2xl font-bold text-simba-black mb-6">Featured</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {featured.map((a) => (
              <ArticleCard key={a.slug} article={a} variant="large" />
            ))}
          </div>
        </section>
      )}

      {/* Browse by category */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 border-t border-simba-gray-100">
        <h2 className="text-2xl font-bold text-simba-black mb-6">Browse by topic</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((c) => {
            const count = getByCategory(c.slug).length;
            return (
              <Link key={c.slug} href={`/resources/topic/${c.slug}`} className="rounded-xl border border-simba-gray-200 bg-white p-5 hover:border-simba-gray-300 hover:shadow-sm transition-all group">
                <div className="text-2xl mb-2">{c.emoji}</div>
                <div className="text-base font-bold text-simba-black group-hover:text-simba-blue transition-colors">
                  {c.name}
                </div>
                <p className="mt-1.5 text-sm text-simba-gray-600 leading-relaxed">{c.description}</p>
                <div className="mt-3 text-xs text-simba-gray-500">{count} article{count === 1 ? '' : 's'}</div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Latest */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 border-t border-simba-gray-100">
        <div className="flex items-end justify-between mb-6">
          <h2 className="text-2xl font-bold text-simba-black">Latest articles</h2>
          <Link href="/resources/all" className="text-sm font-medium text-simba-blue hover:underline">
            View all {all.length} →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {latest.map((a) => (
            <ArticleCard key={a.slug} article={a} />
          ))}
        </div>
      </section>

      {/* Authors */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 border-t border-simba-gray-100">
        <h2 className="text-2xl font-bold text-simba-black mb-6">Authors</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {authors.map((a) => (
            <Link key={a.slug} href={`/resources/author/${a.slug}`} className="rounded-xl border border-simba-gray-200 bg-white p-5 hover:border-simba-gray-300 hover:shadow-sm transition-all flex items-center gap-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={a.photo} alt={a.name} className="h-14 w-14 rounded-full object-cover" />
              <div className="min-w-0">
                <div className="font-bold text-simba-black">{a.name}</div>
                <div className="text-sm text-simba-gray-500">{a.role}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
