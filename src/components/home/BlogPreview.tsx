import React from 'react'
import Link from 'next/link'
import { Container, SectionHeading, Card } from '@/components/ui'
import { blogPosts } from '@/data/blogPosts'

export function BlogPreview() {
  return (
    <section className="section-gap bg-[var(--color-background)]">
      <Container>
        <SectionHeading 
          title="Travel Inspiration" 
          description="Tips, guides, and stories to inspire your next adventure."
          action={{ label: 'View All Articles', href: '/blog' }}
        />

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Card key={post.id} hover className="overflow-hidden border-none flex flex-col h-full bg-white">
              <div className={`h-48 w-full ${post.imageFallbackColor}`}>
                {post.imageUrl && <img src={post.imageUrl} alt="" className="h-full w-full object-cover" />}
              </div>
              
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center justify-between mb-3 text-caption text-[var(--color-text-muted)]">
                  <span className="font-semibold uppercase tracking-wider text-[var(--color-primary-active)]">{post.category}</span>
                  <span>{post.date}</span>
                </div>
                
                <h3 className="text-h4 mb-3 leading-snug line-clamp-2">{post.title}</h3>
                <p className="text-body-sm text-[var(--color-text-secondary)] mb-4 flex-grow line-clamp-3">
                  {post.excerpt}
                </p>
                
                <Link 
                  href="/blog" 
                  className="inline-flex font-medium text-[var(--color-primary-active)] hover:text-[var(--color-primary)] transition-colors mt-auto"
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
