import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: '/oauth/' },
    sitemap: 'https://brain.mcalero.dev/sitemap.xml',
  };
}
