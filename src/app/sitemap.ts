import type { MetadataRoute } from 'next';

const BASE = 'https://simbavoice.ai';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Routes ordered by priority (homepage highest, deep pages lowest)
  const routes: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] }[] = [
    { path: '', priority: 1.0, changeFrequency: 'weekly' },
    { path: '/pricing', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/contact', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/get-started', priority: 0.8, changeFrequency: 'monthly' },

    // Use cases
    { path: '/support', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/lead-qualification', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/outbound-agents', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/ai-virtual-receptionist', priority: 0.8, changeFrequency: 'monthly' },

    // Industry pages
    { path: '/agents', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/agents/financial-services', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/agents/healthcare', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/agents/technology', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/agents/retail-ecommerce', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/agents/government', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/agents/telecommunications', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/agents/support', priority: 0.7, changeFrequency: 'monthly' },

    // Trust + about
    { path: '/agents/trust-and-reliability', priority: 0.6, changeFrequency: 'monthly' },
    { path: '/agents/integrations', priority: 0.6, changeFrequency: 'monthly' },
    { path: '/agents/forward-deployed-engineers', priority: 0.6, changeFrequency: 'monthly' },
  ];

  return routes.map((r) => ({
    url: `${BASE}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
