import Link from 'next/link'
import { ArrowLeft, ArrowRight, BookOpen, CalendarDays, Clock3, Sparkles } from 'lucide-react'
import { Button, Card, Container } from '@/components/ui'
import { BlogImageCarousel, type BlogGalleryImage } from '@/components/blog/BlogImageCarousel'
import { getBlogPostById, getRelatedPosts } from '@/services/blogService'

export const dynamic = 'force-dynamic'

function ArticleContent({ content }: { content: string }) {
  const paragraphs = content.split(/\n{2,}/).filter(Boolean)

  return <div className="mt-8 space-y-5 text-[15px] leading-7 text-[var(--color-text-secondary)] sm:text-base sm:leading-8">
    {paragraphs.map((paragraph, index) => <p key={index}>
      {paragraph.split(/(\[[^\]]+\]\(https?:\/\/[^)]+\))/g).map((part, partIndex) => {
        const link = part.match(/^\[([^\]]+)\]\((https?:\/\/[^)]+)\)$/)
        return link
          ? <a key={partIndex} href={link[2]} target="_blank" rel="noreferrer" className="font-medium text-[var(--green-2)] underline decoration-[var(--green-2)]/40 underline-offset-4 hover:decoration-[var(--green-2)]">{link[1]}</a>
          : part
      })}
    </p>)}</div>
}

function getGallery(post: NonNullable<Awaited<ReturnType<typeof getBlogPostById>>>, related: Awaited<ReturnType<typeof getRelatedPosts>>): BlogGalleryImage[] {
  const articleSpecificImages: Record<string, BlogGalleryImage[]> = {
    'blog-1': [
      { src: '/goa1.jpg', alt: 'Palm-lined beach in Goa', caption: 'Leave space in your bag for easy beach days.' },
      { src: '/goa3.jpg', alt: 'Sunset over a lively Goan beach', caption: 'A light layer is useful when the sea breeze picks up.' },
      { src: '/goa2.jpg', alt: 'Historic fort overlooking the Goan coast', caption: 'Keep day-trip essentials together and within reach.' },
    ],
    'blog-6': [
      { src: '/manali1.jpg', alt: 'Snow-covered Himalayan peaks near Manali', caption: 'Mountain weather can change quickly; pack for the conditions.' },
      { src: '/manali2.jpg', alt: 'Forest temple among tall Himalayan trees', caption: 'Comfortable layers make unhurried outdoor days easier.' },
      { src: '/manali3.jpg', alt: 'Scenic mountain landscape in Himachal Pradesh', caption: 'Keep a flexible plan for changing road and trail conditions.' },
    ],
  }
  const curated = articleSpecificImages[post.id] || related.filter((item) => item.imageUrl).slice(0, 3).map((item) => ({
    src: item.imageUrl!,
    alt: item.title,
    caption: item.excerpt,
  }))

  return curated.filter((image) => image.src !== post.imageUrl)
}

export default async function BlogDetailsPage({ params }: { params: Promise<{ postId: string }> }) {
  const { postId } = await params
  const post = await getBlogPostById(postId)
  if (!post) return <div className="section-gap"><Container><Card><h1 className="text-h2">Article not found</h1><Button className="mt-6" asChild><Link href="/blog">Back to travel journal</Link></Button></Card></Container></div>

  const relatedPosts = await getRelatedPosts(postId, 4)
  const gallery = getGallery(post, relatedPosts)

  return <div className="min-h-screen bg-[var(--color-background)] pb-16 sm:pb-20">
    <section className="relative isolate min-h-[300px] overflow-hidden bg-[var(--green-dark)] pb-6 pt-[104px] sm:min-h-[330px] sm:pb-8 sm:pt-[116px] lg:min-h-[370px] lg:pb-8 lg:pt-[130px]">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-cover bg-center" style={{ backgroundImage: `url('${post.imageUrl || '/Traveler Overlooking a Mosque Waterfront.png'}')` }} aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-[#031f18]/90 via-[#063b24]/65 to-[#063b24]/25" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-black/35 to-transparent" aria-hidden="true" />
      <Container>
        <div className="max-w-3xl text-white">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--color-accent)]">
            <span className="inline-flex items-center gap-2"><BookOpen size={14} />{post.category}</span>
            <span className="inline-flex items-center gap-1.5 text-white/75"><CalendarDays size={14} />Updated {post.updatedAt || post.date}</span>
            {post.readTime && <span className="inline-flex items-center gap-1.5 text-white/75"><Clock3 size={14} />{post.readTime}</span>}
          </div>
          <h1 className="mt-3 max-w-3xl font-heading text-4xl font-semibold leading-[1.02] tracking-tight sm:text-5xl lg:text-[3.6rem]">{post.title}</h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-white/85 sm:text-lg">{post.excerpt}</p>
        </div>
      </Container>
    </section>

    <Container className="pt-8 sm:pt-10">
      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,1fr)_320px] xl:gap-10">
        <main className="min-w-0">
          <Link href="/blog" className="mb-3 inline-flex items-center gap-2 text-sm font-semibold text-[var(--green-dark)] transition hover:text-[var(--green-2)]"><ArrowLeft size={16} />Travel journal</Link>
          <BlogImageCarousel images={gallery} />
          <article className="mx-auto max-w-[760px] pt-2">
            <div className="my-7 flex flex-wrap gap-2" aria-label="Article topics">
              {[post.category, 'Trip planning', 'LemonTrip guide'].map((tag) => <span key={tag} className="rounded-full border border-[var(--color-border-light)] bg-[var(--color-surface)] px-4 py-2 text-xs font-semibold text-[var(--green-dark)]">{tag}</span>)}
            </div>
            <div className="mb-8 flex items-start gap-4 rounded-2xl border border-[var(--color-border-light)] bg-[var(--color-primary-soft)]/70 p-5 sm:p-6">
              <div className="grid size-11 shrink-0 place-items-center rounded-full bg-white text-[var(--green-2)] shadow-sm"><Sparkles size={20} /></div>
              <div><h2 className="font-heading text-xl font-semibold text-[var(--green-dark)]">A little planning goes a long way</h2><p className="mt-1.5 text-sm leading-6 text-[var(--color-text-secondary)]">Use this guide as a starting point, then check the latest local advice and travel requirements for your own dates.</p></div>
            </div>
            <ArticleContent content={post.content || ''} />
            <div className="mt-10 rounded-2xl bg-[var(--green-dark)] p-6 text-white sm:flex sm:items-center sm:justify-between sm:gap-6 sm:p-7">
              <div><p className="font-heading text-2xl font-semibold">Your next story starts somewhere.</p><p className="mt-1 text-sm text-white/75">Find a trip that makes room for the moments you’ll remember.</p></div>
              <Button className="mt-5 shrink-0 bg-[var(--color-accent)] text-[var(--green-dark)] hover:brightness-95 sm:mt-0" asChild icon={<ArrowRight size={16} />}><Link href="/packages">Explore packages</Link></Button>
            </div>
          </article>
        </main>

        <aside className="space-y-5 lg:sticky lg:top-6">
          <Card className="p-5 sm:p-6" shadow="sm">
            <div className="mb-4 flex items-center justify-between gap-3"><h2 className="font-heading text-xl font-semibold text-[var(--green-dark)]">Keep exploring</h2><span className="h-0.5 w-8 rounded-full bg-[var(--color-accent)]" /></div>
            <div className="divide-y divide-[var(--color-border-light)]">
              {relatedPosts.slice(0, 4).map((related) => <Link key={related.id} href={`/blog/${related.id}`} className="group flex gap-3 py-3 first:pt-0 last:pb-0">
                <div className="h-[76px] w-[82px] shrink-0 overflow-hidden rounded-xl bg-[var(--color-primary-soft)]"><img src={related.imageUrl || '/herosection_bgimage.webp'} alt="" className="h-full w-full object-cover transition duration-300 group-hover:scale-105" /></div>
                <div className="min-w-0 self-center"><p className="text-[10px] font-bold uppercase tracking-wider text-[var(--green-2)]">{related.category}</p><p className="mt-1 line-clamp-2 text-sm font-semibold leading-5 text-[var(--green-dark)] group-hover:text-[var(--green-2)]">{related.title}</p><p className="mt-1 text-xs text-[var(--color-text-secondary)]">{related.readTime || 'Travel guide'}</p></div>
              </Link>)}
            </div>
          </Card>

          <Card className="overflow-hidden bg-[var(--green-dark)] p-5 text-white sm:p-6" shadow="sm">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--color-accent)]">Travel with a little more ease</p>
            <h2 className="mt-3 font-heading text-2xl font-semibold leading-tight">Make the journey part of the story.</h2>
            <p className="mt-2 text-sm leading-6 text-white/75">Browse hand-picked getaways and find your next favourite place.</p>
            <Link href="/packages" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-accent)] hover:underline">Explore packages <ArrowRight size={16} /></Link>
          </Card>
        </aside>
      </div>
    </Container>
  </div>
}
