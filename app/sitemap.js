import { fetchVehiculeIdsForSitemap } from '@/lib/vehicules'
import { blogSlugs } from '@/lib/blogRegistry'

/** @type {import('next').MetadataRoute.Sitemap} */
export default async function sitemap() {
  const base = 'https://www.safecars.fr'
  const paths = [
    '',
    '/nos-ventes',
    '/contact',
    '/services',
    '/blog',
    '/notre-methode',
    '/reprise-auto',
    '/financement-voiture-occasion',
    '/zone-intervention-landes',
    '/garantie-occasion',
    '/pourquoi-courtier-auto-sanguinet',
    '/livraison-vehicule',
    '/faq-achat-auto',
    '/lavage-auto-professionnel-sanguinet',
    '/Tarifs-Lavage-auto',
    '/pages/mentions-legales',
    '/pages/politique-confidentialite',
    '/pages/CGU',
  ]
  const now = new Date()

  const highPriority = new Set(['/nos-ventes', '/contact', '/services', '/blog'])

  const staticEntries = paths.map((path) => ({
    url: `${base}${path || '/'}`,
    lastModified: now,
    changeFrequency: path === '' ? 'weekly' : 'monthly',
    priority: path === '' ? 1 : highPriority.has(path) ? 0.9 : 0.75,
  }))

  const blogEntries = blogSlugs.map((slug) => ({
    url: `${base}/blog/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  let vehicleEntries = []
  try {
    const rows = await fetchVehiculeIdsForSitemap()
    vehicleEntries = rows.map((row) => ({
      url: `${base}/vehicules/${row.id}`,
      lastModified: row.updated_at
        ? new Date(row.updated_at)
        : row.created_at
          ? new Date(row.created_at)
          : now,
      changeFrequency: 'weekly',
      priority: 0.85,
    }))
  } catch {
    /* build sans Supabase */
  }

  return [...staticEntries, ...blogEntries, ...vehicleEntries]
}
