import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const BLOGS_DIR = path.join(process.cwd(), 'content', 'blogs')

export interface BlogMeta {
  slug: string
  title: string
  date: string
  description: string
}

export function getAllBlogs(): BlogMeta[] {
  if (!fs.existsSync(BLOGS_DIR)) return []

  const files = fs.readdirSync(BLOGS_DIR).filter((f) => f.endsWith('.mdx'))

  const blogs = files.map((file) => {
    const slug = file.replace(/\.mdx$/, '')
    const raw = fs.readFileSync(path.join(BLOGS_DIR, file), 'utf8')
    const { data } = matter(raw)
    return {
      slug,
      title: data.title ?? slug,
      date: data.date ?? '',
      description: data.description ?? '',
    } satisfies BlogMeta
  })

  return blogs.sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function getBlogBySlug(slug: string) {
  const filePath = path.join(BLOGS_DIR, `${slug}.mdx`)
  const raw = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(raw)
  return { meta: { slug, ...data } as BlogMeta, content }
}
