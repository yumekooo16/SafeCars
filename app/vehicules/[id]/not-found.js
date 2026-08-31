import Link from 'next/link'
import Header from '@/components/allpages/Header'
import Footer from '@/components/allpages/Footer'

export default function VehiculeNotFound() {
  return (
    <div className="sc-page">
      <Header />
      <main className="sc-container flex min-h-[50vh] flex-col items-center justify-center py-24 text-center">
        <p className="sc-kicker mb-3">404</p>
        <h1 className="sc-display text-3xl mb-4">Véhicule introuvable</h1>
        <p className="text-[var(--text-muted)] mb-8 max-w-md">
          Cette annonce n&apos;existe pas ou n&apos;est plus en ligne. Consultez notre stock actuel.
        </p>
        <Link href="/nos-ventes" className="sc-btn sc-btn-primary">
          Voir nos véhicules
        </Link>
      </main>
      <Footer />
    </div>
  )
}
