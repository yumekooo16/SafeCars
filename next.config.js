/** @type {import('next').NextConfig} */
const supabasePatterns = (() => {
  const raw = process.env.NEXT_PUBLIC_SUPABASE_URL
  if (!raw) return []
  try {
    const host = new URL(raw).hostname
    return [
      {
        protocol: 'https',
        hostname: host,
        pathname: '/storage/v1/object/public/**',
      },
    ]
  } catch {
    return []
  }
})()

module.exports = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      ...supabasePatterns,
      {
        protocol: 'https',
        hostname: '*.public.blob.vercel-storage.com',
        pathname: '/**',
      },
    ],
  },
}
