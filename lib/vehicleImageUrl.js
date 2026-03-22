/**
 * URL affichable pour une entrée du champ images[] (HTTP, /uploads, ou bucket Supabase vehicle-images).
 */
export function getVehicleImageUrl(imagePath) {
  if (!imagePath || typeof imagePath !== 'string') return null

  if (imagePath.startsWith('http')) return imagePath
  if (imagePath.startsWith('/uploads/')) return imagePath
  if (imagePath.startsWith('uploads/')) return `/${imagePath}`

  let cleanPath = imagePath
    .replace(/^\/+uploads\/+/, '')
    .replace(/^uploads\/+/, '')
    .replace(/^\/+vehicules\/+/, '')
    .replace(/^vehicules\/+/, '')
    .replace(/^\/+/, '')

  const base = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, '')
  if (!base) return null

  // Même logique que storage.from(...).getPublicUrl(cleanPath) côté client Supabase
  return `${base}/storage/v1/object/public/vehicle-images/${cleanPath}`
}
