import ArticleShell, { Breadcrumb } from '@/components/seo/ArticleShell'
import { LivraisonBody } from '@/components/business/pagesContent'

export const metadata = {
  title: 'Remise & livraison du véhicule',
  description:
    'Organisation de la remise de votre véhicule d’occasion : documents, reprise et déplacements avec SafeCars.',
  alternates: { canonical: '/livraison-vehicule' },
  openGraph: {
    title: 'Livraison véhicule | SafeCars',
    url: 'https://www.safecars.fr/livraison-vehicule',
  },
}

export default function Page() {
  return (
    <ArticleShell
      title="Remise et livraison du véhicule"
      breadcrumbs={
        <Breadcrumb
          items={[
            { href: '/', label: 'Accueil' },
            { href: '/services', label: 'Services' },
            { href: '/livraison-vehicule', label: 'Livraison', current: true },
          ]}
        />
      }
    >
      <LivraisonBody />
    </ArticleShell>
  )
}
