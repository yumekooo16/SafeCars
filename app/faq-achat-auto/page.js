import ArticleShell, { Breadcrumb } from '@/components/seo/ArticleShell'
import { FaqBody } from '@/components/business/pagesContent'

export const metadata = {
  title: 'FAQ achat voiture d’occasion',
  description:
    'Essai, reprise, financement, zone géographique et lavage : réponses aux questions fréquentes SafeCars.',
  alternates: { canonical: '/faq-achat-auto' },
  openGraph: {
    title: 'FAQ achat auto | SafeCars',
    url: 'https://www.safecars.fr/faq-achat-auto',
  },
}

export default function Page() {
  return (
    <ArticleShell
      title="FAQ — achat automobile"
      breadcrumbs={
        <Breadcrumb
          items={[
            { href: '/', label: 'Accueil' },
            { href: '/services', label: 'Services' },
            { href: '/faq-achat-auto', label: 'FAQ', current: true },
          ]}
        />
      }
    >
      <FaqBody />
    </ArticleShell>
  )
}
