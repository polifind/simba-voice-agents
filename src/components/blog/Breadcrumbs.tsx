import Link from 'next/link';
import { ChevronRightIcon } from '@heroicons/react/24/outline';

export type Crumb = { label: string; href?: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  // JSON-LD BreadcrumbList
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.label,
      ...(item.href ? { item: `https://simbavoice.ai${item.href}` } : {}),
    })),
  };
  return (
    <>
      <nav aria-label="Breadcrumb" className="text-sm text-simba-gray-500 flex items-center gap-1.5 flex-wrap">
        {items.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-1.5">
            {item.href ? (
              <Link href={item.href} className="hover:text-simba-black transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className="text-simba-gray-700">{item.label}</span>
            )}
            {i < items.length - 1 && <ChevronRightIcon className="h-3.5 w-3.5 text-simba-gray-300" />}
          </span>
        ))}
      </nav>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
