import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, BookOpen, Calendar, Clock3 } from 'lucide-react'
import { Button, Card, Container } from '@/components/ui'
import { FlightPageHero, PAGE_HERO_IMAGES } from '@/components/flights/FlightPageHero'
import { getBlogPosts } from '@/services/blogService'

export const metadata: Metadata = {
  title: 'Travel Blog & Guides',
  description: 'Read travel guides, practical tips, and destination inspiration from LemonTrip.',
}

export const dynamic = 'force-dynamic'

export default async function BlogPage() {
  const blogPosts = await getBlogPosts()
  const [featuredPost, ...otherPosts] = blogPosts

  return (
    <div className="bg-[var(--color-background)] pb-16 sm:pb-20">
      <FlightPageHero
        compact
        backgroundImage={PAGE_HERO_IMAGES.travel}
        title="Travel Stories"
        subtitle="Thoughtful guides, useful tips, and fresh inspiration for wherever you’re headed next."
      />

      <section className="py-8 sm:py-12">
        <Container>
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3 sm:mb-8">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--green-2)]">From the LemonTrip journal</p>
              <h2 className="mt-1 font-heading text-3xl font-semibold leading-tight text-[var(--green-dark)] sm:text-4xl">Ideas for your next journey</h2>
            </div>
            <span className="text-sm text-[var(--color-text-muted)]">{blogPosts.length} stories to explore</span>
          </div>

          {featuredPost ? (
            <>
              <Card padding="none" hover className="grid overflow-hidden lg:grid-cols-[1.08fr_0.92fr]">
                <Link href={`/blog/${featuredPost.id}`} className={`group relative block min-h-[230px] overflow-hidden sm:min-h-[320px] ${featuredPost.imageFallbackColor}`} aria-label={`Read ${featuredPost.title}`}>
                  {featuredPost.imageUrl && <img src={featuredPost.imageUrl} alt="" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#062d1b]/65 via-transparent to-black/5" />
                  <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full border border-white/30 bg-[#063b24]/75 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
                    <BookOpen size={14} aria-hidden="true" /> Featured story
                  </span>
                </Link>
                <div className="flex flex-col justify-center p-5 sm:p-8 lg:p-10">
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-semibold">
                    <span className="rounded-full bg-[var(--yellow-soft)] px-3 py-1 text-[var(--green-dark)]">{featuredPost.category}</span>
                    <span className="inline-flex items-center gap-1.5 text-[var(--color-text-muted)]"><Calendar size={13} aria-hidden="true" />{featuredPost.date}</span>
                    {featuredPost.readTime && <span className="inline-flex items-center gap-1.5 text-[var(--color-text-muted)]"><Clock3 size={13} aria-hidden="true" />{featuredPost.readTime}</span>}
                  </div>
                  <h3 className="mt-4 font-heading text-3xl font-semibold leading-tight text-[var(--green-dark)] sm:text-4xl">{featuredPost.title}</h3>
                  <p className="mt-3 max-w-xl text-sm leading-relaxed text-[var(--color-text-secondary)] sm:text-base">{featuredPost.excerpt}</p>
                  <Button className="mt-6 self-start" variant="secondary" icon={<ArrowRight size={16} />} iconPosition="right" asChild>
                    <Link href={`/blog/${featuredPost.id}`}>Read the story</Link>
                  </Button>
                </div>
              </Card>

              {otherPosts.length > 0 && (
                <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                  {otherPosts.map((post) => (
                    <Card key={post.id} padding="none" hover className="group flex h-full flex-col overflow-hidden">
                      <Link href={`/blog/${post.id}`} className={`relative block h-48 overflow-hidden ${post.imageFallbackColor}`} aria-label={`Read ${post.title}`}>
                        {post.imageUrl && <img src={post.imageUrl} alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />}
                        <span className="absolute left-4 top-4 rounded-full bg-[#063b24]/85 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[var(--yellow)] backdrop-blur-sm">{post.category}</span>
                      </Link>
                      <div className="flex flex-1 flex-col p-5">
                        <div className="flex items-center justify-between gap-3 text-xs text-[var(--color-text-muted)]">
                          <span className="inline-flex items-center gap-1.5"><Calendar size={13} aria-hidden="true" />{post.date}</span>
                          {post.readTime && <span>{post.readTime}</span>}
                        </div>
                        <h3 className="mt-3 font-heading text-2xl font-semibold leading-snug text-[var(--green-dark)]">{post.title}</h3>
                        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-[var(--color-text-secondary)]">{post.excerpt}</p>
                        <Link href={`/blog/${post.id}`} className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[var(--green-dark)] transition-colors hover:text-[var(--green-2)]">
                          Read article <ArrowRight size={15} aria-hidden="true" />
                        </Link>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </>
          ) : (
            <Card className="p-8 text-center">
              <BookOpen className="mx-auto text-[var(--green-2)]" size={32} aria-hidden="true" />
              <h3 className="mt-3 font-heading text-2xl font-semibold text-[var(--green-dark)]">Stories are on the way</h3>
              <p className="mt-2 text-sm text-[var(--color-text-secondary)]">Check back soon for travel ideas and useful guides.</p>
            </Card>
          )}
        </Container>
      </section>
    </div>
  )
}
