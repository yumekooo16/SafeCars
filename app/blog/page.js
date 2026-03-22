import Link from 'next/link'
import Header from '@/components/allpages/Header'
import Footer from '@/components/allpages/Footer'
import { blogRegistry, blogSlugs } from '@/lib/blogRegistry'

export default function BlogIndexPage() {
  const posts = blogSlugs.map((slug) => ({ slug, ...blogRegistry[slug] }))

  return (
    <>
      <Header />
      <main className="bg-black text-white min-h-screen pt-28 pb-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-black mb-4">Guides & conseils automobile</h1>
          <p className="text-lg text-white/60 mb-14 max-w-2xl">
            Conseils rédigés par l&apos;équipe SafeCars à Sanguinet : occasion, démarches administratives et
            sécurité d&apos;achat en Nouvelle-Aquitaine.
          </p>
          <ul className="space-y-6">
            {posts.map(({ slug, title, description, date }) => (
              <li key={slug}>
                <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 hover:border-blue-500/40 transition-colors">
                  <p className="text-sm text-white/40 mb-2">{date}</p>
                  <h2 className="text-xl md:text-2xl font-bold mb-3">
                    <Link href={`/blog/${slug}`} className="hover:text-blue-400 transition-colors">
                      {title}
                    </Link>
                  </h2>
                  <p className="text-white/65 mb-4 leading-relaxed">{description}</p>
                  <Link
                    href={`/blog/${slug}`}
                    className="inline-flex text-blue-400 font-semibold hover:underline"
                  >
                    Lire l&apos;article
                  </Link>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <Footer />
    </>
  )
}
