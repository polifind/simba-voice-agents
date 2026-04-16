import type { MetadataRoute } from 'next';
import { getAllArticles, getUsedCategories } from '@/lib/content/articles';
import { authors } from '@/lib/content/authors';

const BASE = 'https://simbavoice.ai';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Static marketing routes
  const marketing: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE}/pricing`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/get-started`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },

    // Use cases
    { url: `${BASE}/support`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/lead-qualification`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/outbound-agents`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/ai-virtual-receptionist`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },

    // Industry pages
    { url: `${BASE}/agents`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/agents/financial-services`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/agents/healthcare`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/agents/technology`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/agents/retail-ecommerce`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/agents/government`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/agents/telecommunications`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/agents/support`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/agents/trust-and-reliability`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/agents/integrations`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/agents/forward-deployed-engineers`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
  ];

  // Resources hub + index
  const hub: MetadataRoute.Sitemap = [
    { url: `${BASE}/resources`, lastModified: now, changeFrequency: 'daily', priority: 0.95 },
    { url: `${BASE}/resources/all`, lastModified: now, changeFrequency: 'daily', priority: 0.7 },
  ];

  // Topic landing pages
  const topics: MetadataRoute.Sitemap = getUsedCategories().map((slug) => ({
    url: `${BASE}/resources/topic/${slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // Author archive pages
  const authorPages: MetadataRoute.Sitemap = authors.map((a) => ({
    url: `${BASE}/resources/author/${a.slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  // Every article
  const articles: MetadataRoute.Sitemap = getAllArticles().map((a) => ({
    url: `${BASE}/resources/${a.slug}`,
    lastModified: a.updatedAt ? new Date(a.updatedAt) : new Date(a.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: a.pillar ? 0.85 : a.featured ? 0.8 : 0.7,
  }));

  return [...marketing, ...hub, ...topics, ...authorPages, ...articles];
}
