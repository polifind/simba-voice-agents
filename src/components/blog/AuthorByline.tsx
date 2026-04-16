import Image from 'next/image';
import Link from 'next/link';
import { getAuthor } from '@/lib/content/authors';

export function AuthorByline({ slug, date, readingMinutes }: { slug: string; date: string; readingMinutes: number }) {
  const author = getAuthor(slug);
  if (!author) return null;
  const dateStr = new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  return (
    <div className="flex items-center gap-3">
      <Link href={`/resources/author/${author.slug}`} className="shrink-0">
        <Image
          src={author.photo}
          alt={author.name}
          width={40}
          height={40}
          className="h-10 w-10 rounded-full object-cover"
        />
      </Link>
      <div className="min-w-0 text-sm">
        <Link href={`/resources/author/${author.slug}`} className="font-semibold text-simba-black hover:underline">
          {author.name}
        </Link>
        <div className="text-simba-gray-500 text-xs">
          {dateStr} · {readingMinutes} min read
        </div>
      </div>
    </div>
  );
}
