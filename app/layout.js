// app/layout.js
import './globals.css'
import { Poppins } from 'next/font/google'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

const siteUrl = 'https://www.safecars.fr'

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default:
      'SafeCars | Véhicules d’occasion & courtier auto — Sanguinet, Landes (40)',
    template: '%s | SafeCars',
  },
  description:
    'SafeCars, courtier automobile à Sanguinet : véhicules d’occasion contrôlés, prix transparents, accompagnement et lavage auto professionnel en Landes.',
  keywords: [
    'voiture occasion Landes',
    'courtier auto Sanguinet',
    'achat véhicule occasion 40',
    'SafeCars',
  ],
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: siteUrl,
    siteName: 'SafeCars',
    title:
      'SafeCars | Véhicules d’occasion certifiés — Sanguinet, Landes',
    description:
      'Découvrez notre stock de véhicules d’occasion contrôlés et nos services à Sanguinet (40).',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SafeCars — Sanguinet, Landes',
    description:
      'Véhicules d’occasion et services auto : transparence et expertise.',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'AutoDealer',
  name: 'SafeCars',
  url: siteUrl,
  telephone: '+33769803889',
  email: 'contact@safecars.fr',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Sanguinet',
    addressRegion: 'Nouvelle-Aquitaine',
    postalCode: '40460',
    addressCountry: 'FR',
  },
  areaServed: {
    '@type': 'AdministrativeArea',
    name: 'Landes',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className={poppins.className}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  )
}
