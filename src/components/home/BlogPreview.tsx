import Image from 'next/image'
import Link from 'next/link'
import { Container, SectionHeading, Card } from '@/components/ui'
import { getBlogPosts } from '@/services/blogService'
import { blogPosts as fallbackPosts } from '@/data/blogPosts'

/**
 * BlogPreview
 * ------------------------------------------------------------
 * Fix + restyle:
 *  - `post.category` and the "Read More" link were both rendered
 *    in var(--color-primary) — your brand yellow (#ffd21a) — as
 *    plain text directly on a white card background. That
 *    combination has almost no contrast and is genuinely hard to
 *    read, not just a style choice. Both now use
 *    var(--color-primary-dark) (brand green), which has real
 *    contrast on white and still reads as "brand-colored" rather
 *    than default gray/black.
 *  - Card corners bumped to rounded-2xl and shadow deepened to
 *    the --shadow-md / --shadow-lg tokens on hover, consistent
 *    with FeaturedOffers and PopularPackages.
 */

export async function BlogPreview() {
  let blogPosts = fallbackPosts.slice(0, 3)
  try {
    blogPosts = (await getBlogPosts()).slice(0, 3)
  } catch {
    // Keep the homepage renderable while the blog API recovers.
  }
  return (
    <section className="section-gap bg-[var(--color-background)]">
      <Container>
        <SectionHeading
          title="Travel Inspiration"
          description="Tips, guides, and stories to inspire your next adventure."
          action={{ label: 'View All Articles', href: '/blog' }}
        />

        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
          {blogPosts.map((post) => (
            <Card
              key={post.id}
              hover
              className="flex h-full flex-col overflow-hidden rounded-2xl !shadow-[var(--shadow-md)] hover:!shadow-[var(--shadow-lg)]"
            >
              <div className={`relative h-44 w-full ${post.imageFallbackColor}`}>
                {post.imageUrl && (
                  <Image
                    src={post.imageUrl}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                )}
              </div>

              <div className="flex flex-grow flex-col p-5">
                <div className="mb-2.5 flex items-center justify-between text-caption text-[var(--color-text-muted)]">
                  <span className="font-semibold text-[var(--color-primary-dark)]">{post.category}</span>
                  <span>{post.date}</span>
                </div>

                <h3 className="text-h4 mb-2 line-clamp-2 leading-snug">{post.title}</h3>
                <p className="text-body-sm text-[var(--color-text-secondary)] mb-3 flex-grow line-clamp-3">
                  {post.excerpt}
                </p>

                <Link
                  href={`/blog/${post.id}`}
                  className="mt-auto inline-flex text-sm font-semibold text-[var(--color-primary-dark)] transition-colors hover:text-[var(--color-accent)]"
                >
                  Read More &rarr;
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  )
}