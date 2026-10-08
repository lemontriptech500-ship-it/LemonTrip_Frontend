import type { Metadata } from 'next'
import { Container } from '@/components/ui'
import { BlogJournal } from '@/components/blog/BlogJournal'
import { FlightPageHero, PAGE_HERO_IMAGES } from '@/components/flights/FlightPageHero'
import { getBlogPosts } from '@/services/blogService'

export const metadata: Metadata = {
  title: 'Travel Blog & Guides',
  description: 'Read travel guides, practical tips, and destination inspiration from LemonTrip.',
}

export const dynamic = 'force-dynamic'

export default async function BlogPage() {
  const blogPosts = await getBlogPosts()

  return (
    <div className="bg-[var(--color-background)] pb-16 sm:pb-20">
      <FlightPageHero
        compact
        backgroundImage={PAGE_HERO_IMAGES.travel}
        title="Travel Stories"
        subtitle="Thoughtful guides, useful tips, and fresh inspiration for wherever you’re headed next."
      />

      <Container className="pt-10 sm:pt-14">
        <BlogJournal posts={blogPosts} />
      </Container>
    </div>
  )
}
