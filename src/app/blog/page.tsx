import Link from 'next/link'
import { Calendar, ArrowRight } from 'lucide-react'
import { Button, Card, Container, SectionHeading } from '@/components/ui'
import { getBlogPosts } from '@/services/blogService'

export const dynamic = 'force-dynamic'

export default async function BlogPage() {
  const blogPosts = await getBlogPosts()
  return (
    <div className="section-gap bg-[var(--color-background)]">
      <Container>
        <SectionHeading
          title="Travel Journal"
          description="Read practical guides and inspiration for your next journey."
        />
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <Card key={post.id} className="overflow-hidden" hover padding="none">
              <div className={`h-48 ${post.imageFallbackColor}`}>
                {post.imageUrl && <img src={post.imageUrl} alt="" className="h-full w-full object-cover" />}
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between gap-3 text-caption">
                  <span className="font-semibold text-[var(--color-primary)]">{post.category}</span>
                  <span className="flex items-center gap-1 text-[var(--color-text-muted)]">
                    <Calendar size={12} />
                    {post.date}
                  </span>
                </div>
                <h2 className="mt-3 text-h4 leading-snug">{post.title}</h2>
                <p className="mt-2 text-body-sm text-[var(--color-text-secondary)] line-clamp-3">{post.excerpt}</p>
                <Button className="mt-4 px-0" variant="ghost" icon={<ArrowRight size={14} />} iconPosition="right" asChild>
                  <Link href={`/blog/${post.id}`}>Read article</Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </div>
  )
}
