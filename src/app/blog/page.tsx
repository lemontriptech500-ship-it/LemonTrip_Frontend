import type { Metadata } from 'next'
import { BlogJournal } from '@/components/blog/BlogJournal'
import { getBlogPosts } from '@/services/blogService'

export const metadata: Metadata = {
  title: 'Travel Blog & Guides',
  description: 'Read travel guides, practical tips, and destination inspiration from LemonTrip.',
}

export const dynamic = 'force-dynamic'

export default async function BlogPage() {
  const blogPosts = await getBlogPosts()

  return (
    <BlogJournal posts={blogPosts} />
  )
}
