import Image from 'next/image';
import Link from 'next/link';
import type { Author } from '@/lib/content/authors';

export function AuthorCard({ author }: { author: Author }) {
  return (
    <div className="rounded-2xl border border-simba-gray-200 bg-white p-6 flex items-start gap-5">
      <Image
        src={author.photo}
        alt={author.name}
        width={64}
        height={64}
        className="h-16 w-16 rounded-full object-cover shrink-0"
      />
      <div className="min-w-0">
        <Link href={`/resources/author/${author.slug}`} className="text-lg font-bold text-simba-black hover:underline">
          {author.name}
        </Link>
        <div className="text-sm text-simba-gray-500 mb-2">{author.role}</div>
        <p className="text-sm text-simba-gray-700 leading-relaxed">{author.bio}</p>
        {author.links && author.links.length > 0 && (
          <div className="mt-3 flex items-center gap-3 text-sm">
            {author.links.map((l) => (
              <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="text-simba-blue hover:underline">
                {l.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
