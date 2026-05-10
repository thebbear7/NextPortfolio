import { getAllBlogs, getBlogBySlug } from '@/lib/blogs'
import { MDXRemote } from 'next-mdx-remote/rsc'
import Link from 'next/link'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const blogs = getAllBlogs()
  return blogs.map((b) => ({ slug: b.slug }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const { meta } = getBlogBySlug(slug)
  return {
    title: `${meta.title} — Mahbeer`,
    description: meta.description,
  }
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params
  const { meta, content } = getBlogBySlug(slug)

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-neutral-300 overflow-y-auto">
      <div className="max-w-2xl mx-auto px-6 py-16">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs text-neutral-600 hover:text-neutral-300 transition-colors mb-12"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M10 6H2M2 6l4-4M2 6l4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back
        </Link>

        <header className="mb-10">
          <p className="text-xs text-neutral-600 mb-3">
            {meta.date
              ? new Date(meta.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })
              : ''}
          </p>
          <h1 className="text-2xl font-semibold text-neutral-100 leading-snug">{meta.title}</h1>
          {meta.description && (
            <p className="mt-2 text-sm text-neutral-500 leading-relaxed">{meta.description}</p>
          )}
        </header>

        <article className="prose prose-sm prose-invert prose-neutral max-w-none
          prose-headings:font-medium prose-headings:text-neutral-200
          prose-a:text-accent prose-a:no-underline hover:prose-a:underline
          prose-code:text-neutral-300 prose-code:bg-white/5 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
          prose-pre:bg-white/5 prose-pre:border prose-pre:border-white/5
          prose-blockquote:border-accent prose-blockquote:text-neutral-500
          prose-hr:border-white/5">
          <MDXRemote source={content} />
        </article>
      </div>
    </div>
  )
}
