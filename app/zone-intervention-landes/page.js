import ArticleShell, { Breadcrumb } from '@/components/seo/ArticleShell'
import { ZoneInterventionBody } from '@/components/business/pagesContent'

export const metadata = {
  title: 'Zone d’intervention — Landes, Bassin d’Arcachon',
  description:
    'Sanguinet, Landes (40), Arcachon et environs : où intervient SafeCars pour essais, vente et lavage auto.',
  alternates: { canonical: '/zone-intervention-landes' },
  openGraph: {
    title: 'Zone d’intervention | SafeCars',
    url: 'https://www.safecars.fr/zone-intervention-landes',
  },
}

export default function Page() {
  return (
    <ArticleShell
      title="Zone d’intervention"
      breadcrumbs={
        <Breadcrumb
          items={[
            { href: '/', label: 'Accueil' },
            { href: '/services', label: 'Services' },
            { href: '/zone-intervention-landes', label: 'Zone', current: true },
          ]}
        />
      }
    >
      <ZoneInterventionBody />
    </ArticleShell>
  )
}
