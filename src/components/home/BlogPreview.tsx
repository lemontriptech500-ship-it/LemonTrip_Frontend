import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Container } from '@/components/ui'
import { getBlogPosts } from '@/services/blogService'
import { blogPosts as fallbackPosts } from '@/data/blogPosts'

export async function BlogPreview() {
  let posts = fallbackPosts.slice(0, 3)
  try {
    posts = (await getBlogPosts()).slice(0, 3)
  } catch {
    // Keep the homepage renderable while the blog API recovers.
  }
  const [feature, ...stories] = posts

  return (
    <section className="section-gap bg-[var(--color-background-soft)]">
      <Container>
        <div className="mb-7 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--green-2)]">Travel inspiration</p>
            <h2 className="mt-2 font-heading text-3xl font-semibold tracking-tight text-[var(--green-dark)] sm:text-4xl">Stories for the road ahead</h2>
            <p className="mt-2 text-sm text-[var(--color-text-secondary)]">Ideas, guides and local finds for your next journey.</p>
          </div>
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--green-dark)] hover:text-[var(--green-2)]">All travel stories <ArrowRight size={16} /></Link>
        </div>

        {feature && <div className="grid gap-4 lg:grid-cols-[1.35fr_1fr]">
          <Link href={`/blog/${feature.id}`} className="group relative min-h-[320px] overflow-hidden rounded-[22px] bg-[var(--green-dark)] sm:min-h-[390px]">
            {feature.imageUrl && <Image src={feature.imageUrl} alt="" fill sizes="(max-width: 1023px) 100vw, 60vw" className="object-cover transition duration-700 group-hover:scale-105" />}
            <span className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />
            <span className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-7">
              <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--yellow)]">{feature.category} · {feature.readTime ?? 'Travel story'}</span>
              <span className="mt-2 block max-w-2xl font-heading text-3xl font-semibold leading-tight sm:text-4xl">{feature.title}</span>
              <span className="mt-2 block max-w-xl text-sm leading-relaxed text-white/80 line-clamp-2">{feature.excerpt}</span>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold">Read the story <ArrowRight size={16} /></span>
            </span>
          </Link>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {stories.map((post) => (
              <Link key={post.id} href={`/blog/${post.id}`} className="group grid min-h-[150px] grid-cols-[38%_1fr] overflow-hidden rounded-[20px] border border-[var(--color-border-light)] bg-white sm:min-h-0 lg:grid-cols-[40%_1fr]">
                <span className={`relative min-h-[145px] overflow-hidden ${post.imageFallbackColor}`}>
                  {post.imageUrl && <Image src={post.imageUrl} alt="" fill sizes="(max-width: 1023px) 40vw, 20vw" className="object-cover transition duration-500 group-hover:scale-105" />}
                </span>
                <span className="flex flex-col justify-center p-4 sm:p-5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--green-2)]">{post.category}</span>
                  <span className="mt-2 line-clamp-2 font-heading text-xl font-semibold leading-tight text-[var(--green-dark)]">{post.title}</span>
                  <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-[var(--green-dark)]">Read story <ArrowRight size={13} /></span>
                </span>
              </Link>
            ))}
          </div>
        </div>}
      </Container>
    </section>
  )
}
