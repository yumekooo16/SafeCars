import ArticleShell, { Breadcrumb } from '@/components/seo/ArticleShell'
import { NotreMethodeBody } from '@/components/business/pagesContent'

export const metadata = {
  title: 'Notre méthode — véhicules d’occasion contrôlés',
  description:
    'Sélection, contrôle, essai et transparence : comment SafeCars prépare chaque occasion à Sanguinet (Landes).',
  alternates: { canonical: '/notre-methode' },
  openGraph: {
    title: 'Notre méthode | SafeCars',
    url: 'https://www.safecars.fr/notre-methode',
  },
}

export default function Page() {
  return (
    <ArticleShell
      title="Notre méthode : occasion contrôlée et transparente"
      breadcrumbs={
        <Breadcrumb
          items={[
            { href: '/', label: 'Accueil' },
            { href: '/services', label: 'Services' },
            { href: '/notre-methode', label: 'Notre méthode', current: true },
          ]}
        />
      }
    >
      <NotreMethodeBody />
    </ArticleShell>
  )
}
