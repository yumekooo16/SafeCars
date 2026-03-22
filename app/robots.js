/** @type {import('next').MetadataRoute.Robots} */
export default function robots() {
  const base = 'https://www.safecars.fr'
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/api/'],
    },
    sitemap: `${base}/sitemap.xml`,
  }
}
