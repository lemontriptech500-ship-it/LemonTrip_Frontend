import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Container, SectionHeading, Card } from '@/components/ui'
import { getBlogPosts } from '@/services/blogService'
import { blogPosts as fallbackPosts } from '@/data/blogPosts'

/** BlogPreview — premium version: category pill on the photo, round arrow button. */
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
          eyebrow="Stories & guides"
          title="Travel Inspiration"
          description="Tips, guides, and stories to inspire your next adventure."
          action={{ label: 'View All Articles', href: '/blog' }}
        />

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {blogPosts.map((post) => (
            <Card
              key={post.id}
              hover
              padding="none"
              className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-2xl)] !shadow-[var(--shadow-md)] hover:!shadow-[var(--shadow-xl)]"
            >
              <div className={`relative h-52 w-full overflow-hidden ${post.imageFallbackColor}`}>
                {post.imageUrl && (
                  <Image
                    src={post.imageUrl}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(11,58,41,0.45)] to-transparent" />
                <span className="absolute left-4 top-4 rounded-full bg-[var(--color-primary)] px-3 py-1 text-[11px] font-extrabold uppercase tracking-wide text-[var(--green-dark)]">
                  {post.category}
                </span>
              </div>

              <div className="flex flex-grow flex-col p-6">
                <p className="eyebrow !text-[10px]">{post.date}</p>
                <h3 className="mt-2 line-clamp-2 text-xl font-extrabold leading-snug text-[var(--color-text-primary)]">
                  {post.title}
                </h3>
                <p className="text-body-sm mb-5 mt-2 line-clamp-3 flex-grow text-[var(--color-text-secondary)]">
                  {post.excerpt}
                </p>

                <Link
                  href={`/blog/${post.id}`}
                  className="mt-auto inline-flex items-center gap-3 text-sm font-bold text-[var(--green-dark)]"
                >
                  Read article
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--green-dark)] text-white transition-colors duration-200 group-hover:bg-[var(--color-primary)] group-hover:text-[var(--green-dark)]">
                    <ArrowUpRight size={16} aria-hidden="true" />
                  </span>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  )
}