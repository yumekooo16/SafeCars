import Link from 'next/link'
import Header from '@/components/allpages/Header'
import Footer from '@/components/allpages/Footer'

export const metadata = {
  title: 'Reservation confirmee | SafeCars',
  description: 'Votre reservation vehicule avec arrhes a bien ete enregistree.',
  robots: { index: false, follow: true },
}

export default async function ReservationConfirmeePage({ searchParams }) {
  const params = await searchParams
  const vehicule = params?.vehicule || 'Votre vehicule'
  const depot = params?.depot || process.env.NEXT_PUBLIC_RESERVATION_DEPOSIT_EUR || '500'
  const sessionId = params?.session_id

  return (
    <>
      <Header />
      <main className="min-h-screen bg-black px-4 pb-16 pt-24 text-white sm:px-6">
        <section className="mx-auto max-w-3xl rounded-2xl border border-green-500/40 bg-green-500/10 p-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-green-300">Reservation confirmee</p>
          <h1 className="mt-3 text-3xl font-black sm:text-4xl">Merci, votre paiement a ete valide.</h1>
          <p className="mx-auto mt-4 max-w-xl text-white/80">
            Nous avons bien recu vos arrhes de <strong>{depot} EUR</strong> pour le vehicule{' '}
            <strong>{vehicule}</strong>. Votre reservation est enregistree.
          </p>
          {sessionId ? <p className="mt-3 text-xs text-white/50">Reference Stripe: {sessionId}</p> : null}
        </section>

        <section className="mx-auto mt-8 max-w-3xl rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-xl font-bold">Prochaine etape</h2>
          <p className="mt-2 text-white/80">
            L&apos;equipe SafeCars vous contacte sous 24h pour organiser la suite: verification, essai et finalisation
            de la vente.
          </p>
          <p className="mt-3 text-sm text-white/60">
            Un email de confirmation de paiement Stripe vous est envoye automatiquement.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex justify-center rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-500"
            >
              Contacter SafeCars
            </Link>
            <Link
              href="/nos-ventes"
              className="inline-flex justify-center rounded-xl border border-white/25 px-6 py-3 font-semibold text-white/90 transition hover:border-blue-400 hover:text-blue-300"
            >
              Voir d&apos;autres vehicules
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
