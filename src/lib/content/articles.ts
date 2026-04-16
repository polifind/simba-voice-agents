import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import { categories } from './categories';
import { authors } from './authors';

export type ArticleMeta = {
  slug: string;
  title: string;
  description: string;
  excerpt: string;
  category: string; // category slug
  topics: string[]; // topic tags
  author: string; // author slug
  publishedAt: string; // ISO date
  updatedAt?: string;
  readingMinutes: number;
  wordCount: number;
  featured?: boolean;
  pillar?: boolean;
  hasBody: boolean; // false if MDX file doesn't exist yet
};

export type Article = ArticleMeta & {
  content: string; // raw MDX
};

const ARTICLES_DIR = path.join(process.cwd(), 'src/content/articles');
const MANIFEST_PATH = path.join(process.cwd(), 'src/content/manifest.json');

// Manifest is a JSON file listing all 200 article metadata entries up front.
// Each entry MAY have a corresponding .mdx file; if not, the article shows
// a "Coming soon" placeholder. This lets the index pages render the full
// 200-article grid + sitemap from day one, while bodies are written in batches.

type ManifestEntry = {
  slug: string;
  title: string;
  description: string;
  excerpt: string;
  category: string;
  topics: string[];
  author: string;
  publishedAt: string;
  featured?: boolean;
  pillar?: boolean;
};

let _articles: ArticleMeta[] | null = null;

function loadManifest(): ManifestEntry[] {
  if (!fs.existsSync(MANIFEST_PATH)) return [];
  const raw = fs.readFileSync(MANIFEST_PATH, 'utf8');
  return JSON.parse(raw) as ManifestEntry[];
}

export function getAllArticles(): ArticleMeta[] {
  if (_articles) return _articles;
  const manifest = loadManifest();

  _articles = manifest.map((entry) => {
    const filePath = path.join(ARTICLES_DIR, `${entry.slug}.mdx`);
    let body = '';
    let hasBody = false;
    if (fs.existsSync(filePath)) {
      const fileRaw = fs.readFileSync(filePath, 'utf8');
      const parsed = matter(fileRaw);
      body = parsed.content;
      hasBody = true;
    }
    const stats = body ? readingTime(body) : { minutes: 4, words: entry.excerpt.split(/\s+/).length };
    return {
      ...entry,
      readingMinutes: Math.max(1, Math.round(stats.minutes)),
      wordCount: stats.words,
      hasBody,
    };
  });

  // Newest first
  _articles.sort((a, b) => (a.publishedAt > b.publishedAt ? -1 : 1));
  return _articles;
}

export function getArticleBySlug(slug: string): Article | null {
  const meta = getAllArticles().find((a) => a.slug === slug);
  if (!meta) return null;
  const filePath = path.join(ARTICLES_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) {
    return { ...meta, content: '' };
  }
  const fileRaw = fs.readFileSync(filePath, 'utf8');
  const parsed = matter(fileRaw);
  return { ...meta, content: parsed.content };
}

export function getByCategory(categorySlug: string): ArticleMeta[] {
  return getAllArticles().filter((a) => a.category === categorySlug);
}

export function getByAuthor(authorSlug: string): ArticleMeta[] {
  return getAllArticles().filter((a) => a.author === authorSlug);
}

export function getByTopic(topic: string): ArticleMeta[] {
  return getAllArticles().filter((a) => a.topics.includes(topic));
}

export function getFeatured(limit = 3): ArticleMeta[] {
  return getAllArticles().filter((a) => a.featured).slice(0, limit);
}

export function getPillars(): ArticleMeta[] {
  return getAllArticles().filter((a) => a.pillar);
}

export function getLatest(limit = 12): ArticleMeta[] {
  return getAllArticles().slice(0, limit);
}

// Compute related articles by Jaccard similarity over (category, topics).
// Same category counts more than topic overlap.
export function getRelated(slug: string, limit = 3): ArticleMeta[] {
  const all = getAllArticles();
  const target = all.find((a) => a.slug === slug);
  if (!target) return [];
  const targetTopics = new Set(target.topics);
  const scored = all
    .filter((a) => a.slug !== slug)
    .map((a) => {
      const sameCategory = a.category === target.category ? 2 : 0;
      const aTopics = new Set(a.topics);
      const intersection = [...targetTopics].filter((t) => aTopics.has(t)).length;
      const union = new Set([...targetTopics, ...aTopics]).size || 1;
      const jaccard = intersection / union;
      return { article: a, score: sameCategory + jaccard * 3 };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
  return scored.map((s) => s.article);
}

export function getAllSlugs(): string[] {
  return getAllArticles().map((a) => a.slug);
}

// Helper: unique values present in the manifest (used for static-params and sitemap)
export function getUsedCategories(): string[] {
  const used = new Set(getAllArticles().map((a) => a.category));
  return categories.filter((c) => used.has(c.slug)).map((c) => c.slug);
}

export function getUsedTopics(): string[] {
  const set = new Set<string>();
  for (const a of getAllArticles()) for (const t of a.topics) set.add(t);
  return Array.from(set);
}

export function getUsedAuthors(): string[] {
  const used = new Set(getAllArticles().map((a) => a.author));
  return authors.filter((a) => used.has(a.slug)).map((a) => a.slug);
}
