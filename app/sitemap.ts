import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://brain.mcalero.dev/' },
    { url: 'https://brain.mcalero.dev/privacy' },
  ];
}
