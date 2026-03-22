import ArticleShell, { Breadcrumb } from '@/components/seo/ArticleShell'
import { FinancementBody } from '@/components/business/pagesContent'

export const metadata = {
  title: 'Financer votre voiture d’occasion',
  description:
    'Comptant ou crédit : comprendre les options pour financer une occasion avec SafeCars — conseils et transparence à Sanguinet.',
  alternates: { canonical: '/financement-voiture-occasion' },
  openGraph: {
    title: 'Financement occasion | SafeCars',
    url: 'https://www.safecars.fr/financement-voiture-occasion',
  },
}

export default function Page() {
  return (
    <ArticleShell
      title="Financer votre voiture d’occasion"
      breadcrumbs={
        <Breadcrumb
          items={[
            { href: '/', label: 'Accueil' },
            { href: '/services', label: 'Services' },
            { href: '/financement-voiture-occasion', label: 'Financement', current: true },
          ]}
        />
      }
    >
      <FinancementBody />
    </ArticleShell>
  )
}
