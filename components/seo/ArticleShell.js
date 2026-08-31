import Link from 'next/link'
import Header from '@/components/allpages/Header'
import Footer from '@/components/allpages/Footer'
import PageHero from '@/components/ui/PageHero'

export default function ArticleShell({ title, subtitle, children, breadcrumbs }) {
  return (
    <>
      <Header />
      <main className="bg-black text-white min-h-screen pb-20">
        <PageHero title={title} subtitle={subtitle} />
        <article className="max-w-3xl mx-auto px-4 sm:px-6 -mt-4">
          {breadcrumbs && (
            <nav className="text-sm text-white/50 mb-8" aria-label="Fil d'Ariane">
              {breadcrumbs}
            </nav>
          )}
          <div className="glass-card p-6 md:p-10 space-y-5 text-base md:text-lg leading-relaxed text-white/85 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-white [&_h2]:mt-8 [&_h2]:mb-4 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-white [&_h3]:mt-6 [&_h3]:mb-3 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_ol]:list-decimal [&_ol]:pl-6 [&_strong]:text-white [&_a]:text-blue-400 [&_a]:underline hover:[&_a]:text-blue-300">
            {children}
          </div>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn-primary">
              Nous contacter
            </Link>
            <Link href="/nos-ventes" className="btn-secondary">
              Voir le stock
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}

export function Breadcrumb({ items }) {
  return (
    <ol className="flex flex-wrap items-center gap-2">
      {items.map((item, i) => (
        <li key={item.href} className="flex items-center gap-2">
          {i > 0 && <span aria-hidden>/</span>}
          {item.current ? (
            <span className="text-white/70">{item.label}</span>
          ) : (
            <Link href={item.href} className="hover:text-blue-400">
              {item.label}
            </Link>
          )}
        </li>
      ))}
    </ol>
  )
}
