import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/dashboard/', '/api/', '/login', '/signup'],
      },
    ],
    sitemap: 'https://simbavoice.ai/sitemap.xml',
    host: 'https://simbavoice.ai',
  };
}
