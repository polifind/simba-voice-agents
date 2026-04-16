import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArticleCard } from '@/components/blog/ArticleCard';
import { Breadcrumbs } from '@/components/blog/Breadcrumbs';
import { AuthorCard } from '@/components/blog/AuthorCard';
import { getAuthor, authors } from '@/lib/content/authors';
import { getByAuthor } from '@/lib/content/articles';

type RouteParams = { author: string };

export async function generateStaticParams(): Promise<RouteParams[]> {
  return authors.map((a) => ({ author: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { author } = await params;
  const a = getAuthor(author);
  if (!a) return {};
  return {
    title: `${a.name} — Articles`,
    description: a.shortBio,
    alternates: { canonical: `/resources/author/${a.slug}` },
    openGraph: {
      title: `${a.name} — Articles on SIMBA`,
      description: a.shortBio,
      url: `https://simbavoice.ai/resources/author/${a.slug}`,
      type: 'profile',
    },
  };
}

export default async function AuthorPage({ params }: { params: Promise<RouteParams> }) {
  const { author } = await params;
  const a = getAuthor(author);
  if (!a) notFound();
  const articles = getByAuthor(a.slug);

  // Person JSON-LD
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: a.name,
    jobTitle: a.role,
    image: `https://simbavoice.ai${a.photo}`,
    url: `https://simbavoice.ai/resources/author/${a.slug}`,
    sameAs: a.links?.map((l) => l.href) ?? [],
    description: a.bio,
  };

  return (
    <div className="bg-white min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="border-b border-simba-gray-100 bg-simba-gray-50">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Resources', href: '/resources' }, { label: a.name }]} />
          <div className="mt-6">
            <AuthorCard author={a} />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold text-simba-black mb-6">
          Articles by {a.name} <span className="text-simba-gray-400">({articles.length})</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </div>
    </div>
  );
}
