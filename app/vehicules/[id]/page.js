import Link from 'next/link'
import { notFound } from 'next/navigation'
import Header from '@/components/allpages/Header'
import Footer from '@/components/allpages/Footer'
import VehicleGallery from '@/components/vehicules/VehicleGallery'
import { fetchVehiculeById } from '@/lib/vehicules'
import { getVehicleImageUrl } from '@/lib/vehicleImageUrl'

const siteUrl = 'https://www.safecars.fr'

export async function generateMetadata({ params }) {
  const { id } = await params
  const vehicle = await fetchVehiculeById(id)

  if (!vehicle) {
    return { title: 'Véhicule introuvable' }
  }

  const title = `${vehicle.marque} ${vehicle.modele} ${vehicle.annee ?? ''} occasion`
  const descParts = [
    vehicle.marque,
    vehicle.modele,
    vehicle.annee,
    vehicle.prix != null ? `${Number(vehicle.prix).toLocaleString('fr-FR')} €` : null,
    'SafeCars Sanguinet (40).',
  ].filter(Boolean)
  const description = descParts.join(' · ')
  const imageUrls = (vehicle.images || []).map(getVehicleImageUrl).filter(Boolean)
  const ogImage = imageUrls[0]

  const isSold = vehicle.statut === 'vendu'

  return {
    title,
    description,
    alternates: { canonical: `/vehicules/${id}` },
    robots: isSold ? { index: false, follow: true } : undefined,
    openGraph: {
      title: `${title} | SafeCars`,
      description,
      url: `${siteUrl}/vehicules/${id}`,
      type: 'website',
      ...(ogImage ? { images: [{ url: ogImage, width: 1200, height: 630, alt: title }] } : {}),
    },
  }
}

export default async function VehiculePage({ params }) {
  const { id } = await params
  const vehicle = await fetchVehiculeById(id)

  if (!vehicle) notFound()

  const imageUrls = (vehicle.images || []).map(getVehicleImageUrl).filter(Boolean)
  const altBase = `${vehicle.marque} ${vehicle.modele}`.trim()
  const isVendu = vehicle.statut === 'vendu'
  const isReserve = vehicle.statut === 'reserve'

  const fallbackDescription =
    `${vehicle.marque} ${vehicle.modele}${vehicle.annee ? ` (${vehicle.annee})` : ''} — véhicule d’occasion proposé par SafeCars à Sanguinet dans les Landes.`

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: altBase,
    description: vehicle.description || fallbackDescription,
    brand: vehicle.marque ? { '@type': 'Brand', name: vehicle.marque } : undefined,
    image: imageUrls,
    offers: vehicle.prix
      ? {
          '@type': 'Offer',
          price: vehicle.prix,
          priceCurrency: 'EUR',
          availability: isVendu
            ? 'https://schema.org/OutOfStock'
            : isReserve
              ? 'https://schema.org/LimitedAvailability'
              : 'https://schema.org/InStock',
          seller: { '@type': 'Organization', name: 'SafeCars', url: siteUrl },
        }
      : undefined,
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-black text-white pt-24 pb-16 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <nav className="text-sm text-white/50 mb-8">
            <Link href="/" className="hover:text-blue-400">
              Accueil
            </Link>
            <span className="mx-2">/</span>
            <Link href="/nos-ventes" className="hover:text-blue-400">
              Nos véhicules
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white/80">{altBase}</span>
          </nav>

          <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight">
              {vehicle.marque} {vehicle.modele}
              {vehicle.annee ? (
                <span className="block sm:inline sm:ml-2 text-xl sm:text-2xl font-semibold text-white/70">
                  {vehicle.annee}
                </span>
              ) : null}
            </h1>
            <div className="flex flex-wrap gap-2">
              {isVendu && (
                <span className="rounded-lg bg-red-600 px-4 py-2 text-sm font-bold">Vendu</span>
              )}
              {isReserve && !isVendu && (
                <span className="rounded-lg bg-orange-600 px-4 py-2 text-sm font-bold">Réservé</span>
              )}
              {!isVendu && !isReserve && (
                <span className="rounded-lg bg-green-600/90 px-4 py-2 text-sm font-bold">Disponible</span>
              )}
            </div>
          </div>

          <VehicleGallery imageUrls={imageUrls} altBase={altBase} />

          {vehicle.prix != null && (
            <p className="mt-8 text-center text-4xl font-black text-blue-400">
              {Number(vehicle.prix).toLocaleString('fr-FR')} €
            </p>
          )}

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ['Année', vehicle.annee],
              ['Kilométrage', vehicle.kilometrage != null ? `${Number(vehicle.kilometrage).toLocaleString('fr-FR')} km` : null],
              ['Carburant', vehicle.carburant],
              ['Transmission', vehicle.transmission],
            ].map(([label, val]) =>
              val ? (
                <div key={label} className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <div className="text-xs uppercase tracking-wide text-white/50">{label}</div>
                  <div className="mt-1 text-lg font-semibold">{val}</div>
                </div>
              ) : null
            )}
          </div>

          {vehicle.couleur && (
            <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="text-xs uppercase tracking-wide text-white/50">Couleur</div>
              <div className="mt-1 text-lg font-semibold">{vehicle.couleur}</div>
            </div>
          )}

          {vehicle.description && (
            <div className="mt-10 max-w-none">
              <h2 className="text-xl font-bold text-white mb-3">Description</h2>
              <p className="text-white/80 whitespace-pre-line leading-relaxed">{vehicle.description}</p>
            </div>
          )}

          {!vehicle.description && (
            <p className="mt-10 text-white/60 leading-relaxed">{fallbackDescription}</p>
          )}

          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex justify-center rounded-xl bg-green-600 px-8 py-4 text-center font-bold text-white hover:bg-green-700 transition-colors"
            >
              Demander plus d&apos;informations
            </Link>
            <Link
              href="/nos-ventes"
              className="inline-flex justify-center rounded-xl border-2 border-white/30 px-8 py-4 font-semibold text-white hover:border-blue-400 hover:text-blue-400 transition-colors"
            >
              Voir tout le stock
            </Link>
          </div>
        </div>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </main>
      <Footer />
    </>
  )
}
