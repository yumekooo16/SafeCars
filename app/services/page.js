import Link from 'next/link'
import Header from '@/components/allpages/Header'
import Footer from '@/components/allpages/Footer'
import PageHero from '@/components/ui/PageHero'

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
    <div className="sc-page">
      <Header />
      <PageHero
        kicker="Services"
        title="Nos services"
        subtitle="Achat d'occasion contrôlée, reprise, financement et lavage auto — tout ce que propose SafeCars depuis Sanguinet."
      />
      <main className="sc-container pb-20 -mt-2">
        <ul className="grid sm:grid-cols-2 gap-4">
          {links.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="sc-card sc-card-padded block h-full hover:border-[var(--border-accent)] transition-colors">
                <span className="sc-display text-lg">{item.title}</span>
                <p className="text-sm sc-muted mt-2 leading-relaxed">{item.desc}</p>
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-12">
          <Link href="/contact" className="sc-btn sc-btn-primary">
            Nous contacter
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  )
}
