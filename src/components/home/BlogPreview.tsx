import Image from 'next/image'
import Link from 'next/link'
import { Container, SectionHeading, Card } from '@/components/ui'
import { getBlogPosts } from '@/services/blogService'
import { blogPosts as fallbackPosts } from '@/data/blogPosts'

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

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-5">
          {blogPosts.map((post) => (
            <Card key={post.id} hover className="overflow-hidden flex flex-col h-full">
              <div className={`relative h-44 w-full ${post.imageFallbackColor}`}>
                {post.imageUrl && <Image src={post.imageUrl} alt="" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />}
              </div>
              
              <div className="p-5 flex flex-col flex-grow">
                <div className="flex items-center justify-between mb-2.5 text-caption text-[var(--color-text-muted)]">
                  <span className="font-semibold text-[var(--color-primary)]">{post.category}</span>
                  <span>{post.date}</span>
                </div>
                
                <h3 className="text-h4 mb-2 leading-snug line-clamp-2">{post.title}</h3>
                <p className="text-body-sm text-[var(--color-text-secondary)] mb-3 flex-grow line-clamp-3">
                  {post.excerpt}
                </p>
                
                <Link 
                  href={`/blog/${post.id}`} 
                  className="inline-flex font-semibold text-sm text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] transition-colors mt-auto"
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
