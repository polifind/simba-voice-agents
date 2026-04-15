'use client';

import Link from 'next/link';
import type { RelatedItem } from '@/templates/types';

interface RelatedUseCasesProps {
  items: RelatedItem[];
}

export function RelatedUseCases({ items }: RelatedUseCasesProps) {
  return (
    <section className="py-16 bg-simba-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-simba-black mb-8">Explore more solutions</h2>
        <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
          {items.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="shrink-0 w-72 snap-start rounded-2xl bg-white border border-simba-gray-200 p-6 hover:shadow-lg hover:border-simba-gray-300 transition-all duration-200"
            >
              <h3 className="font-bold text-simba-black mb-2">{item.title}</h3>
              <p className="text-sm text-simba-gray-600">{item.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
