import Link from 'next/link'
import Header from '@/components/allpages/Header'
import Footer from '@/components/allpages/Footer'

export default function VehiculeNotFound() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-black text-white pt-32 pb-24 px-6 text-center">
        <h1 className="text-3xl font-bold mb-4">Véhicule introuvable</h1>
        <p className="text-white/60 mb-8 max-w-md mx-auto">
          Cette annonce n’existe pas ou n’est plus en ligne. Consultez notre stock actuel.
        </p>
        <Link
          href="/nos-ventes"
          className="inline-flex rounded-xl bg-blue-600 px-8 py-3 font-semibold text-white hover:bg-blue-700 transition-colors"
        >
          Voir nos véhicules
        </Link>
      </main>
      <Footer />
    </>
  )
}
