import ArticleShell, { Breadcrumb } from '@/components/seo/ArticleShell'
import { CourtierSanguinetBody } from '@/components/business/pagesContent'

export const metadata = {
  title: 'Pourquoi un courtier auto à Sanguinet ?',
  description:
    'Proximité Landes / Arcachon, sélection d’occasions et accompagnement : les avantages de SafeCars comme courtier automobile.',
  alternates: { canonical: '/pourquoi-courtier-auto-sanguinet' },
  openGraph: {
    title: 'Courtier auto Sanguinet | SafeCars',
    url: 'https://www.safecars.fr/pourquoi-courtier-auto-sanguinet',
  },
}

export default function Page() {
  return (
    <ArticleShell
      title="Pourquoi passer par un courtier automobile à Sanguinet ?"
      breadcrumbs={
        <Breadcrumb
          items={[
            { href: '/', label: 'Accueil' },
            { href: '/services', label: 'Services' },
            { href: '/pourquoi-courtier-auto-sanguinet', label: 'Courtier', current: true },
          ]}
        />
      }
    >
      <CourtierSanguinetBody />
    </ArticleShell>
  )
}
