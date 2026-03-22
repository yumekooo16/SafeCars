import ArticleShell, { Breadcrumb } from '@/components/seo/ArticleShell'
import { LavageProBody } from '@/components/business/pagesContent'

export const metadata = {
  title: 'Lavage auto professionnel à Sanguinet',
  description:
    'Nettoyage intérieur et extérieur par des professionnels : SafeCars, Sanguinet. Liens vers nos tarifs détaillés.',
  alternates: { canonical: '/lavage-auto-professionnel-sanguinet' },
  openGraph: {
    title: 'Lavage auto Sanguinet | SafeCars',
    url: 'https://www.safecars.fr/lavage-auto-professionnel-sanguinet',
  },
}

export default function Page() {
  return (
    <ArticleShell
      title="Lavage automobile professionnel à Sanguinet"
      breadcrumbs={
        <Breadcrumb
          items={[
            { href: '/', label: 'Accueil' },
            { href: '/services', label: 'Services' },
            {
              href: '/lavage-auto-professionnel-sanguinet',
              label: 'Lavage pro',
              current: true,
            },
          ]}
        />
      }
    >
      <LavageProBody />
    </ArticleShell>
  )
}
