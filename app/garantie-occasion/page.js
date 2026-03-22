import ArticleShell, { Breadcrumb } from '@/components/seo/ArticleShell'
import { GarantieBody } from '@/components/business/pagesContent'

export const metadata = {
  title: 'Garantie sur véhicule d’occasion',
  description:
    'Comprendre la garantie occasion : couverture, exclusions et démarches avec SafeCars à Sanguinet.',
  alternates: { canonical: '/garantie-occasion' },
  openGraph: {
    title: 'Garantie occasion | SafeCars',
    url: 'https://www.safecars.fr/garantie-occasion',
  },
}

export default function Page() {
  return (
    <ArticleShell
      title="Garantie sur véhicule d’occasion"
      breadcrumbs={
        <Breadcrumb
          items={[
            { href: '/', label: 'Accueil' },
            { href: '/services', label: 'Services' },
            { href: '/garantie-occasion', label: 'Garantie', current: true },
          ]}
        />
      }
    >
      <GarantieBody />
    </ArticleShell>
  )
}
