'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, BookOpen, Clock3, Compass, Search, X } from 'lucide-react'
import type { BlogPost } from '@/data/blogPosts'

function StoryImage({ post, featured = false }: { post: BlogPost; featured?: boolean }) {
  const [failed, setFailed] = useState(false)

  return (
    <div className={`relative h-full min-h-[220px] overflow-hidden bg-[var(--color-secondary-soft)] ${post.imageFallbackColor}`}>
      <div className="absolute inset-0 flex items-center justify-center text-[var(--green-2)]" aria-hidden="true">
        <Compass size={64} strokeWidth={1} />
      </div>
      {post.imageUrl && !failed && (
        // Blog images may come from any host configured by the content API.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={post.imageUrl}
          alt=""
          loading={featured ? 'eager' : 'lazy'}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          onError={() => setFailed(true)}
        />
      )}
      {featured && <span className="absolute left-5 top-5 rounded-full bg-[var(--yellow)] px-4 py-2 text-xs font-bold text-[var(--green-dark)]">Featured story</span>}
    </div>
  )
}

function StoryMeta({ post }: { post: BlogPost }) {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-[var(--color-text-muted)]">
      <span>{post.date}</span>
      {post.readTime && <span className="inline-flex items-center gap-1.5"><Clock3 size={13} aria-hidden="true" />{post.readTime}</span>}
    </div>
  )
}

const focusStyle = 'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--green-2)]'

export function BlogJournal({ posts }: { posts: BlogPost[] }) {
  const [category, setCategory] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('recommended')
  const categories = Array.from(new Set(posts.map((post) => post.category)))
  const query = search.trim().toLowerCase()
  const filteredPosts = posts.filter((post) => (
    (category === null || post.category === category)
    && (!query || `${post.title} ${post.excerpt} ${post.category}`.toLowerCase().includes(query))
  ))
  if (sort === 'newest') {
    filteredPosts.sort((a, b) => (Date.parse(b.date) || 0) - (Date.parse(a.date) || 0))
  }
  const featured = posts[0]
  const quickReads = posts.filter(post => post.id !== featured?.id).slice(0, 2)

  function resetFilters() {
    setCategory(null)
    setSearch('')
  }

  return (
    <>
      {featured && (
        <section aria-labelledby="featured-story-heading">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--green-2)]">A little inspiration, a world of possibilities</p>
              <h2 id="featured-story-heading" className="mt-2 font-heading text-4xl font-semibold leading-tight text-[var(--green-dark)] sm:text-5xl">Your next adventure starts here.</h2>
            </div>
            <span className="inline-flex items-center gap-2 text-sm text-[var(--color-text-muted)]"><Compass size={18} aria-hidden="true" />The LemonTrip journal</span>
          </div>
          <div className="grid gap-6 lg:grid-cols-[1.7fr_1fr]">
            <Link href={`/blog/${featured.id}`} className={`group relative block min-h-[420px] overflow-hidden rounded-3xl bg-[var(--green-dark)] sm:min-h-[470px] ${focusStyle}`}>
              <div className="absolute inset-0"><StoryImage key={featured.imageUrl} post={featured} featured /></div>
              <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#031f18] via-[#031f18]/50 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-9">
                <span className="text-xs font-bold uppercase tracking-[0.15em] text-[var(--yellow)]">{featured.category}</span>
                <h3 className="mt-3 max-w-xl font-heading text-3xl font-semibold leading-tight sm:text-4xl">{featured.title}</h3>
                <p className="mt-3 max-w-xl line-clamp-2 text-sm leading-6 text-white/80">{featured.excerpt}</p>
                <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
                  <span className="text-xs text-white/75">{featured.date}{featured.readTime ? ` · ${featured.readTime}` : ''}</span>
                  <span className="inline-flex items-center gap-2 text-sm font-semibold">Read the story <ArrowRight size={16} aria-hidden="true" /></span>
                </div>
              </div>
            </Link>
            <aside aria-labelledby="journal-quick-heading" className="flex flex-col rounded-3xl border border-[var(--color-border)] bg-white p-6 sm:p-7">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--green-2)]">More to explore</p>
              <h3 id="journal-quick-heading" className="mt-2 font-heading text-3xl font-semibold text-[var(--green-dark)]">A moment of wanderlust</h3>
              <div className="mt-5 flex-1 divide-y divide-[var(--color-border)]">
                {quickReads.map(post => <Link key={post.id} href={`/blog/${post.id}`} className={`group grid grid-cols-[80px_1fr] items-center gap-4 py-5 first:pt-0 ${focusStyle}`}>
                  <span className={`relative block h-24 overflow-hidden rounded-xl ${post.imageFallbackColor}`}>
                    {post.imageUrl ? (
                      // Editorial thumbnails use the same API artwork as the story cards.
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={post.imageUrl} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    ) : <Compass size={28} aria-hidden="true" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[var(--green-2)]" />}
                  </span>
                  <span><span className="text-[10px] font-bold uppercase tracking-wider text-[var(--green-2)]">{post.category}</span><span className="mt-1 block font-heading text-xl font-semibold leading-tight text-[var(--green-dark)] group-hover:text-[var(--green-2)]">{post.title}</span>{post.readTime && <span className="mt-2 block text-xs text-[var(--color-text-muted)]">{post.readTime}</span>}</span>
                </Link>)}
              </div>
              <a href="#journal-stories-heading" className={`mt-4 inline-flex items-center justify-between border-t border-[var(--color-border)] pt-4 text-sm font-semibold text-[var(--green-dark)] hover:text-[var(--green-2)] ${focusStyle}`}>Browse all stories <ArrowRight size={16} aria-hidden="true" /></a>
            </aside>
          </div>
        </section>
      )}

      <section aria-labelledby="journal-stories-heading" className="mt-12 sm:mt-16">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--green-2)]">Explore the journal</p>
            <h2 id="journal-stories-heading" className="scroll-mt-6 mt-2 font-heading text-3xl font-semibold text-[var(--green-dark)] sm:text-4xl">Good reads. Great journeys.</h2>
            <p className="mt-2 text-sm text-[var(--color-text-secondary)]">Destination inspiration and practical advice for every kind of traveller.</p>
          </div>
          <div role="search" className="relative w-full sm:w-72 sm:shrink-0">
            <label htmlFor="journal-search" className="sr-only">Search travel stories</label>
            <Search size={18} aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
            <input id="journal-search" type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search stories…" className="w-full rounded-full border border-[var(--color-border)] bg-white py-3 pl-11 pr-10 text-sm outline-none focus:border-[var(--green-2)] focus:ring-2 focus:ring-[var(--color-accent-soft)] [&::-webkit-search-cancel-button]:appearance-none" />
            {search && <button type="button" aria-label="Clear search" onClick={() => setSearch('')} className={`absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-2 text-[var(--color-text-muted)] hover:text-[var(--green-dark)] ${focusStyle}`}><X size={16} /></button>}
          </div>
        </div>

        <div aria-label="Filter stories by category" role="group" className="mt-7 flex flex-wrap gap-2 border-b border-[var(--color-border)] pb-6">
          {[null, ...categories].map((item) => (
            <button key={item ?? '__all__'} type="button" aria-pressed={category === item} onClick={() => setCategory(item)} className={`rounded-full border px-4 py-2.5 text-sm font-medium transition-colors ${focusStyle} ${category === item ? 'border-[var(--green-dark)] bg-[var(--green-dark)] text-white' : 'border-[var(--color-border)] bg-white text-[var(--color-text-secondary)] hover:border-[var(--green-2)] hover:text-[var(--green-dark)]'}`}>
              {item ?? 'All stories'}
            </button>
          ))}
        </div>

        <div className="my-5 flex flex-wrap items-center justify-between gap-3">
        <p role="status" aria-live="polite" aria-atomic="true" className="text-xs text-[var(--color-text-muted)]">{filteredPosts.length} {filteredPosts.length === 1 ? 'story' : 'stories'}{category ? ` in ${category}` : ' to inspire your next trip'}{query ? ` matching “${search.trim()}”` : ''}</p>
          <div className="flex items-center gap-2 text-xs text-[var(--color-text-muted)]">
            <label htmlFor="journal-sort">Sort by</label>
            <select id="journal-sort" value={sort} onChange={event => setSort(event.target.value)} className={`rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 text-xs font-medium text-[var(--green-dark)] ${focusStyle}`}>
              <option value="recommended">Recommended</option>
              <option value="newest">Newest first</option>
            </select>
          </div>
        </div>

        {filteredPosts.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post) => (
              <article key={post.id} className="h-full">
                <Link href={`/blog/${post.id}`} className={`group flex h-full flex-col overflow-hidden rounded-[22px] border border-[var(--color-border)] bg-white transition-shadow hover:shadow-lg ${focusStyle}`}>
                  <div className="relative h-56 shrink-0">
                    <StoryImage key={post.imageUrl} post={post} />
                    <span className="absolute bottom-4 left-4 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-[var(--green-dark)]">{post.category}</span>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <StoryMeta post={post} />
                    <h3 className="mt-3 font-heading text-2xl font-semibold leading-tight text-[var(--green-dark)] transition-colors group-hover:text-[var(--green-2)]">{post.title}</h3>
                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-[var(--color-text-secondary)]">{post.excerpt}</p>
                    <div className="mt-auto pt-6"><span className="flex items-center justify-between border-t border-[var(--color-border-light)] pt-4 text-sm font-semibold text-[var(--green-dark)]">Read article <ArrowRight size={17} aria-hidden="true" className="transition-transform group-hover:translate-x-1" /></span></div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-[var(--color-border-strong)] bg-white px-6 py-16 text-center">
            <BookOpen size={32} aria-hidden="true" className="mx-auto text-[var(--green-2)]" />
            <h3 className="mt-4 font-heading text-3xl font-semibold text-[var(--green-dark)]">{posts.length ? 'No stories found' : 'New adventures are on the way'}</h3>
            <p className="mt-2 text-sm text-[var(--color-text-secondary)]">{posts.length ? 'Try another keyword or explore a different category.' : 'Check back soon for fresh travel stories and guides.'}</p>
            {posts.length > 0 && <button type="button" onClick={resetFilters} className={`mt-5 rounded-full bg-[var(--green-dark)] px-5 py-3 text-sm font-semibold text-white hover:bg-[var(--green-2)] ${focusStyle}`}>Show all stories</button>}
          </div>
        )}
      </section>

      <section aria-labelledby="journal-trip-heading" className="relative mt-12 overflow-hidden rounded-3xl bg-[var(--green-dark)] p-7 sm:mt-16 sm:p-10">
        <Compass size={200} strokeWidth={0.7} aria-hidden="true" className="pointer-events-none absolute -right-10 -top-8 text-white/10" />
        <div className="relative flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--yellow)]">From inspiration to itinerary</p>
            <h2 id="journal-trip-heading" className="mt-2 font-heading text-3xl font-semibold text-white sm:text-4xl">Make your next story a travel story.</h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-white/80">Find your perfect getaway and let LemonTrip take care of the journey.</p>
          </div>
          <Link href="/packages" className={`inline-flex w-fit shrink-0 items-center gap-3 rounded-full bg-[var(--yellow)] px-6 py-3.5 text-sm font-bold text-[var(--green-dark)] transition-colors hover:bg-[var(--yellow-soft)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white`}>Explore holidays <ArrowRight size={17} aria-hidden="true" /></Link>
        </div>
      </section>
    </>
  )
}
