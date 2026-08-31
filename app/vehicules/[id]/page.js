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

function StatusBadge({ statut }) {
  if (statut === 'vendu') return <span className="sc-badge sc-badge--sold">Vendu</span>
  if (statut === 'reserve') return <span className="sc-badge sc-badge--reserve">Réservé</span>
  return <span className="sc-badge sc-badge--available">Disponible</span>
}

export default async function VehiculePage({ params }) {
  const { id } = await params
  const vehicle = await fetchVehiculeById(id)

  if (!vehicle) notFound()

  const imageUrls = (vehicle.images || []).map(getVehicleImageUrl).filter(Boolean)
  const videoUrls = (vehicle.videos || []).map(getVehicleImageUrl).filter(Boolean)
  const altBase = `${vehicle.marque} ${vehicle.modele}`.trim()
  const isVendu = vehicle.statut === 'vendu'
  const isReserve = vehicle.statut === 'reserve'

  const fallbackDescription =
    `${vehicle.marque} ${vehicle.modele}${vehicle.annee ? ` (${vehicle.annee})` : ''} — véhicule d'occasion proposé par SafeCars à Sanguinet dans les Landes.`

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
    <div className="sc-page">
      <Header />
      <main className="sc-container pb-20 pt-28 md:pt-32">
        <nav className="text-sm text-[var(--text-subtle)] mb-8" aria-label="Fil d'Ariane">
          <Link href="/" className="sc-link no-underline hover:underline">
            Accueil
          </Link>
          <span className="mx-2">/</span>
          <Link href="/nos-ventes" className="sc-link no-underline hover:underline">
            Nos véhicules
          </Link>
          <span className="mx-2">/</span>
          <span className="text-[var(--text-muted)]">{altBase}</span>
        </nav>

        <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
          <div>
            <p className="sc-kicker mb-2">Fiche véhicule</p>
            <h1 className="sc-display text-3xl sm:text-4xl md:text-5xl">
              {vehicle.marque} {vehicle.modele}
              {vehicle.annee ? (
                <span className="block sm:inline sm:ml-2 text-xl sm:text-2xl text-[var(--text-muted)] font-normal">
                  {vehicle.annee}
                </span>
              ) : null}
            </h1>
          </div>
          <StatusBadge statut={vehicle.statut} />
        </div>

        <VehicleGallery imageUrls={imageUrls} altBase={altBase} videoUrls={videoUrls} />

        {vehicle.prix != null && (
          <p className="mt-8 text-center font-serif text-3xl md:text-4xl text-[var(--silver)]">
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
              <div key={label} className="sc-card sc-card-padded">
                <div className="text-xs uppercase tracking-wider text-[var(--text-subtle)]">{label}</div>
                <div className="mt-1 text-lg font-medium">{val}</div>
              </div>
            ) : null
          )}
        </div>

        {vehicle.couleur && (
          <div className="mt-6 sc-card sc-card-padded max-w-sm">
            <div className="text-xs uppercase tracking-wider text-[var(--text-subtle)]">Couleur</div>
            <div className="mt-1 text-lg font-medium">{vehicle.couleur}</div>
          </div>
        )}

        {vehicle.description ? (
          <div className="mt-10 max-w-3xl">
            <h2 className="sc-display text-xl mb-3">Description</h2>
            <p className="text-[var(--text-muted)] whitespace-pre-line leading-relaxed">{vehicle.description}</p>
          </div>
        ) : (
          <p className="mt-10 max-w-3xl text-[var(--text-muted)] leading-relaxed">{fallbackDescription}</p>
        )}

        {!isVendu && !isReserve ? (
          <section className="mt-10 sc-card sc-card-padded max-w-2xl mx-auto text-center border-[var(--border-accent)]">
            <p className="sc-kicker">Essai & contact</p>
            <h2 className="sc-display mt-2 text-2xl sm:text-3xl">Intéressé par ce véhicule ?</h2>
            <p className="mx-auto mt-3 max-w-xl text-[var(--text-muted)]">
              Contactez-nous pour organiser un essai, obtenir plus d&apos;informations ou discuter d&apos;une reprise.
            </p>
            <Link href="/contact" className="sc-btn sc-btn-primary sc-btn-lg mt-6">
              Nous contacter
            </Link>
          </section>
        ) : null}

        <div className="mt-12 flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/contact" className="sc-btn sc-btn-primary">
            Demander plus d&apos;informations
          </Link>
          <Link href="/nos-ventes" className="sc-btn sc-btn-secondary">
            Voir tout le stock
          </Link>
        </div>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </main>
      <Footer />
    </div>
  )
}
