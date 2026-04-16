import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { Breadcrumbs } from '@/components/blog/Breadcrumbs';
import { AuthorByline } from '@/components/blog/AuthorByline';
import { AuthorCard } from '@/components/blog/AuthorCard';
import { RelatedArticles } from '@/components/blog/RelatedArticles';
import { mdxComponents } from '@/components/blog/MdxComponents';
import {
  getArticleBySlug,
  getAllSlugs,
  getRelated,
} from '@/lib/content/articles';
import { getAuthor } from '@/lib/content/authors';
import { getCategory } from '@/lib/content/categories';

type RouteParams = { slug: string };

export async function generateStaticParams(): Promise<RouteParams[]> {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};
  const author = getAuthor(article.author);
  return {
    title: article.title,
    description: article.excerpt,
    authors: author ? [{ name: author.name }] : undefined,
    alternates: { canonical: `/resources/${article.slug}` },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url: `https://simbavoice.ai/resources/${article.slug}`,
      type: 'article',
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt ?? article.publishedAt,
      authors: author ? [author.name] : undefined,
      images: ['/simba-mark-512.png'],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
      images: ['/simba-mark-512.png'],
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();
  const author = getAuthor(article.author);
  const category = getCategory(article.category);
  const related = getRelated(article.slug, 3);

  // BlogPosting JSON-LD
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.excerpt,
    image: 'https://simbavoice.ai/simba-mark-512.png',
    datePublished: article.publishedAt,
    dateModified: article.updatedAt ?? article.publishedAt,
    author: author
      ? {
          '@type': 'Person',
          name: author.name,
          url: `https://simbavoice.ai/resources/author/${author.slug}`,
        }
      : undefined,
    publisher: {
      '@type': 'Organization',
      name: 'SIMBA Voice Agents',
      logo: {
        '@type': 'ImageObject',
        url: 'https://simbavoice.ai/simba-mark-512.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://simbavoice.ai/resources/${article.slug}`,
    },
    keywords: article.topics.join(', '),
    wordCount: article.wordCount,
    articleSection: category?.name,
    inLanguage: 'en-US',
  };

  return (
    <article className="bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header */}
      <header className="border-b border-simba-gray-100 bg-simba-gray-50">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Resources', href: '/resources' },
              category ? { label: category.shortName, href: `/resources/topic/${category.slug}` } : { label: '' },
              { label: article.title },
            ].filter((c) => c.label)}
          />
          {category && (
            <div className="mt-4 text-xs font-semibold uppercase tracking-wider text-simba-blue">
              {category.emoji} {category.name}
            </div>
          )}
          <h1 className="mt-3 text-3xl md:text-5xl font-black tracking-tight text-simba-black leading-tight">
            {article.title}
          </h1>
          <p className="mt-4 text-lg text-simba-gray-600 leading-relaxed">
            {article.excerpt}
          </p>
          <div className="mt-6">
            <AuthorByline slug={article.author} date={article.publishedAt} readingMinutes={article.readingMinutes} />
          </div>
        </div>
      </header>

      {/* Body */}
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {article.hasBody ? (
          <div className="prose prose-simba max-w-none prose-headings:scroll-mt-24 prose-headings:tracking-tight prose-h2:mt-12 prose-h2:mb-4 prose-h3:mt-8 prose-h3:mb-3 prose-p:leading-relaxed prose-li:leading-relaxed prose-a:text-simba-blue prose-a:no-underline hover:prose-a:underline prose-pre:bg-simba-gray-900 prose-pre:text-simba-gray-100 prose-code:bg-simba-gray-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-simba-black prose-code:font-medium prose-code:before:content-none prose-code:after:content-none">
            <MDXRemote
              source={article.content}
              components={mdxComponents}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkGfm],
                  rehypePlugins: [
                    rehypeSlug,
                    [rehypeAutolinkHeadings, { behavior: 'wrap' }],
                  ],
                },
              }}
            />
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-simba-gray-300 bg-simba-gray-50 p-8 text-center">
            <p className="text-simba-gray-700 font-medium">This article is being written.</p>
            <p className="mt-1 text-sm text-simba-gray-500">
              We&apos;re publishing every couple of days through 2026. In the meantime, browse other articles in{' '}
              {category && (
                <Link href={`/resources/topic/${category.slug}`} className="text-simba-blue hover:underline">
                  {category.name}
                </Link>
              )}
              .
            </p>
          </div>
        )}

        {/* Author card */}
        {author && (
          <div className="mt-12">
            <AuthorCard author={author} />
          </div>
        )}

        {/* Related */}
        <RelatedArticles articles={related} />
      </div>
    </article>
  );
}
