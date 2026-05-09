'use client'

import ModalShell from './ModalShell'
import type { BlogMeta } from '@/lib/blogs'

interface Props {
  blogs: BlogMeta[]
  onClose: () => void
}

function formatDate(raw: string) {
  if (!raw) return ''
  const d = new Date(raw)
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

export default function BlogsModal({ blogs, onClose }: Props) {
  return (
    <ModalShell title="Blogs" onClose={onClose}>
      {blogs.length === 0 ? (
        <div className="py-12 text-center">
          <p className="text-sm text-neutral-600">No posts yet — coming soon.</p>
        </div>
      ) : (
        <div className="space-y-1">
          {blogs.map((post) => (
            <a
              key={post.slug}
              href={`/blogs/${post.slug}/`}
              className="flex items-start justify-between gap-4 group py-4 border-b border-white/5 hover:border-white/10 transition-colors"
            >
              <div>
                <p className="text-sm text-neutral-300 group-hover:text-neutral-100 transition-colors leading-snug">
                  {post.title}
                </p>
                {post.description && (
                  <p className="text-xs text-neutral-600 mt-1 leading-relaxed">{post.description}</p>
                )}
              </div>
              <span className="text-xs text-neutral-600 shrink-0 pt-0.5">{formatDate(post.date)}</span>
            </a>
          ))}
        </div>
      )}
    </ModalShell>
  )
}
