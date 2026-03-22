import ArticleShell, { Breadcrumb } from '@/components/seo/ArticleShell'
import { RepriseBody } from '@/components/business/pagesContent'

export const metadata = {
  title: 'Reprise de votre véhicule — Landes & Gironde',
  description:
    'Estimation de reprise, documents à préparer et intégration à votre prochain achat d’occasion avec SafeCars à Sanguinet.',
  alternates: { canonical: '/reprise-auto' },
  openGraph: {
    title: 'Reprise auto | SafeCars',
    url: 'https://www.safecars.fr/reprise-auto',
  },
}

export default function Page() {
  return (
    <ArticleShell
      title="Reprise de votre véhicule"
      breadcrumbs={
        <Breadcrumb
          items={[
            { href: '/', label: 'Accueil' },
            { href: '/services', label: 'Services' },
            { href: '/reprise-auto', label: 'Reprise', current: true },
          ]}
        />
      }
    >
      <RepriseBody />
    </ArticleShell>
  )
}
