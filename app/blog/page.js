import Link from 'next/link'
import Header from '@/components/allpages/Header'
import Footer from '@/components/allpages/Footer'
import PageHero from '@/components/ui/PageHero'
import { blogRegistry, blogSlugs } from '@/lib/blogRegistry'

export default function BlogIndexPage() {
  const posts = blogSlugs.map((slug) => ({ slug, ...blogRegistry[slug] }))

  return (
    <div className="sc-page">
      <Header />
      <PageHero
        kicker="Blog"
        title="Guides & conseils automobile"
        subtitle="Conseils rédigés par l&apos;équipe SafeCars à Sanguinet : occasion, démarches administratives et sécurité d&apos;achat en Nouvelle-Aquitaine."
      />

      <main className="sc-container pb-20 -mt-2">
        <ul className="space-y-5 max-w-3xl">
          {posts.map(({ slug, title, description, date }) => (
            <li key={slug}>
              <article className="sc-card sc-card-padded transition hover:border-[var(--border-accent)]">
                <p className="text-sm text-[var(--text-subtle)] mb-2">{date}</p>
                <h2 className="sc-display text-xl md:text-2xl mb-3">
                  <Link href={`/blog/${slug}`} className="hover:text-[var(--silver)] transition-colors">
                    {title}
                  </Link>
                </h2>
                <p className="text-[var(--text-muted)] mb-4 leading-relaxed">{description}</p>
                <Link href={`/blog/${slug}`} className="sc-text-cta text-sm">
                  Lire l&apos;article →
                </Link>
              </article>
            </li>
          ))}
        </ul>
      </main>
      <Footer />
    </div>
  )
}
