import Link from 'next/link'
import Header from '@/components/allpages/Header'
import Footer from '@/components/allpages/Footer'

export const metadata = {
  title: 'Services — achat, reprise, financement, lavage',
  description:
    'Découvrez les services SafeCars : méthode de contrôle, reprise, financement, garantie, zone d’intervention et lavage auto à Sanguinet.',
  alternates: { canonical: '/services' },
}

const links = [
  { href: '/notre-methode', title: 'Notre méthode', desc: 'Comment nous sélectionnons et contrôlons les occasions.' },
  { href: '/reprise-auto', title: 'Reprise auto', desc: 'Estimation et reprise de votre ancien véhicule.' },
  { href: '/financement-voiture-occasion', title: 'Financement', desc: 'Comptant ou crédit : structurer votre budget.' },
  { href: '/garantie-occasion', title: 'Garantie', desc: 'Ce qu’il faut savoir sur la garantie occasion.' },
  { href: '/zone-intervention-landes', title: 'Zone d’intervention', desc: 'Landes, Bassin d’Arcachon et alentours.' },
  { href: '/livraison-vehicule', title: 'Remise du véhicule', desc: 'Organisation de la livraison et des documents.' },
  { href: '/pourquoi-courtier-auto-sanguinet', title: 'Courtier à Sanguinet', desc: 'Pourquoi choisir un courtier local.' },
  { href: '/lavage-auto-professionnel-sanguinet', title: 'Lavage professionnel', desc: 'Nettoyage intérieur / extérieur.' },
  { href: '/tarifs-lavage-auto', title: 'Grille tarifaire lavage', desc: 'Tarifs medium, premium, gold et options.' },
  { href: '/faq-achat-auto', title: 'FAQ', desc: 'Réponses aux questions fréquentes.' },
  { href: '/blog', title: 'Guides & blog', desc: 'Articles sur l’achat d’occasion et les arnaques.' },
]

export default function ServicesHubPage() {
  return (
    <>
      <Header />
      <main className="bg-black text-white min-h-screen pt-28 pb-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-black mb-4">Nos services</h1>
          <p className="text-lg text-white/60 mb-12 max-w-2xl">
            Achat d&apos;occasion contrôlée, reprise, financement et lavage auto : tout ce que propose SafeCars
            depuis <strong>Sanguinet</strong> pour les conducteurs des <strong>Landes</strong> et du{' '}
            <strong>Bassin d&apos;Arcachon</strong>.
          </p>
          <ul className="grid sm:grid-cols-2 gap-4">
            {links.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block rounded-xl border border-white/10 bg-white/[0.03] p-5 hover:border-blue-500/50 transition-colors h-full"
                >
                  <span className="font-bold text-white text-lg">{item.title}</span>
                  <p className="text-sm text-white/55 mt-2 leading-relaxed">{item.desc}</p>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-12 text-center">
            <Link
              href="/contact"
              className="inline-flex rounded-xl bg-blue-600 px-8 py-4 font-bold text-white hover:bg-blue-700"
            >
              Nous contacter
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
