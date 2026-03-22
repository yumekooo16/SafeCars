import { notFound } from 'next/navigation'
import ArticleShell, { Breadcrumb } from '@/components/seo/ArticleShell'
import { blogRegistry, blogSlugs, getBlogPost } from '@/lib/blogRegistry'

export async function generateStaticParams() {
  return blogSlugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) return { title: 'Article introuvable' }
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: `${post.title} | SafeCars`,
      description: post.description,
      url: `https://www.safecars.fr/blog/${slug}`,
    },
  }
}

export default async function BlogArticlePage({ params }) {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) notFound()

  const { Content, title, description, date } = post

  return (
    <ArticleShell
      title={title}
      subtitle={`Publié le ${date} · SafeCars, Sanguinet (40)`}
      breadcrumbs={
        <Breadcrumb
          items={[
            { href: '/', label: 'Accueil' },
            { href: '/blog', label: 'Blog' },
            { href: `/blog/${slug}`, label: 'Article', current: true },
          ]}
        />
      }
    >
      <p className="text-lg text-white/70 mb-10 pb-8 border-b border-white/10 leading-relaxed">
        {description}
      </p>
      <Content />
    </ArticleShell>
  )
}
