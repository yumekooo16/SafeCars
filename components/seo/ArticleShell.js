import Link from 'next/link'
import Header from '@/components/allpages/Header'
import Footer from '@/components/allpages/Footer'
import PageHero from '@/components/ui/PageHero'

export default function ArticleShell({ title, subtitle, children, breadcrumbs, kicker }) {
  return (
    <div className="sc-page">
      <Header />
      <main>
        <PageHero title={title} subtitle={subtitle} kicker={kicker || 'SafeCars'} />
        <article className="sc-container pb-20 -mt-2">
          {breadcrumbs && (
            <nav className="text-sm text-[var(--text-subtle)] mb-8" aria-label="Fil d'Ariane">
              {breadcrumbs}
            </nav>
          )}
          <div className="sc-card sc-card-padded max-w-3xl sc-prose [&_h2]:mt-8 [&_h2]:mb-3 [&_h3]:mt-6 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2 [&_ol]:list-decimal [&_ol]:pl-5">
            {children}
          </div>
          <div className="mt-10 flex flex-col sm:flex-row gap-3">
            <Link href="/contact" className="sc-btn sc-btn-primary">
              Nous contacter
            </Link>
            <Link href="/nos-ventes" className="sc-btn sc-btn-secondary">
              Voir le stock
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  )
}

export function Breadcrumb({ items }) {
  return (
    <ol className="flex flex-wrap items-center gap-2">
      {items.map((item, i) => (
        <li key={item.href} className="flex items-center gap-2">
          {i > 0 && <span aria-hidden>/</span>}
          {item.current ? (
            <span className="text-[var(--text-muted)]">{item.label}</span>
          ) : (
            <Link href={item.href} className="sc-link no-underline hover:underline">
              {item.label}
            </Link>
          )}
        </li>
      ))}
    </ol>
  )
}
