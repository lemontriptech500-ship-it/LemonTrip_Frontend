'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, BookOpen, CalendarDays, Check, ChevronDown, Clock3, Compass, Leaf, Map, Plane, Search, Utensils, X } from 'lucide-react'
import { Container } from '@/components/ui'
import type { BlogPost } from '@/data/blogPosts'

const PAGE_SIZE = 6
const focusStyle = 'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--green-2)]'

const categoryIcons: Record<string, typeof Compass> = {
  'Travel Tips': Plane,
  Destinations: Map,
  'Travel Guides': BookOpen,
  'Visa Guide': BookOpen,
  'Food & Culture': Utensils,
  Lifestyle: Leaf,
  'Packing Tips': Compass,
}

function ArticleCard({ post }: { post: BlogPost }) {
  return (
    <article className="h-full">
      <Link href={`/blog/${post.id}`} className={`group flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--color-border-light)] bg-[var(--color-surface)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)] ${focusStyle}`}>
        <div className={`relative aspect-[1.72] overflow-hidden ${post.imageFallbackColor}`}>
          {post.imageUrl && <img src={post.imageUrl} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]" />}
          <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1.5 text-[11px] font-semibold text-[var(--green-dark)] shadow-sm">{post.category}</span>
        </div>
        <div className="flex flex-1 flex-col p-4 sm:p-5">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[11px] text-[var(--color-text-muted)]">
            <span className="inline-flex items-center gap-1.5"><CalendarDays size={13} />{post.updatedAt || post.date}</span>
            {post.readTime && <span className="inline-flex items-center gap-1.5"><Clock3 size={13} />{post.readTime}</span>}
          </div>
          <h3 className="mt-3 line-clamp-2 font-heading text-[1.45rem] font-semibold leading-[1.08] text-[var(--green-dark)] transition-colors group-hover:text-[var(--green-2)]">{post.title}</h3>
          <p className="mt-2 line-clamp-3 text-sm leading-6 text-[var(--color-text-secondary)]">{post.excerpt}</p>
          <span className="mt-auto flex items-center gap-2 pt-4 text-sm font-semibold text-[var(--green-2)]">Read more <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" /></span>
        </div>
      </Link>
    </article>
  )
}

export function BlogJournal({ posts }: { posts: BlogPost[] }) {
  const [category, setCategory] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('newest')
  const [page, setPage] = useState(1)
  const categories = useMemo(() => Array.from(new Set(posts.map((post) => post.category))), [posts])
  const query = search.trim().toLowerCase()

  const filteredPosts = useMemo(() => {
    const result = posts.filter((post) => (
      (category === null || post.category === category)
      && (!query || `${post.title} ${post.excerpt} ${post.category}`.toLowerCase().includes(query))
    ))
    if (sort === 'newest') result.sort((a, b) => (Date.parse(b.updatedAt || b.date) || 0) - (Date.parse(a.updatedAt || a.date) || 0))
    if (sort === 'oldest') result.sort((a, b) => (Date.parse(a.updatedAt || a.date) || 0) - (Date.parse(b.updatedAt || b.date) || 0))
    return result
  }, [category, posts, query, sort])

  const pageCount = Math.max(1, Math.ceil(filteredPosts.length / PAGE_SIZE))
  const currentPage = Math.min(page, pageCount)
  const pagePosts = filteredPosts.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)
  const popularPosts = [...posts].sort((a, b) => (Date.parse(b.updatedAt || b.date) || 0) - (Date.parse(a.updatedAt || a.date) || 0)).slice(0, 5)

  function updateCategory(value: string | null) {
    setCategory(value)
    setPage(1)
  }

  function updateSearch(value: string) {
    setSearch(value)
    setPage(1)
  }

  return <div className="bg-[var(--color-background)] pb-16 sm:pb-20">
      <section className="relative isolate overflow-hidden bg-[var(--green-dark)] pb-8 pt-[98px] sm:pb-10 sm:pt-[112px]" aria-labelledby="blog-hero-title">
        <div className="absolute inset-0 -z-20 bg-cover bg-center" style={{ backgroundImage: "url('/goa1.jpg')" }} />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#031f18]/80 via-[#031f18]/45 to-[#031f18]/10" />
        <div className="absolute inset-x-0 top-0 -z-10 h-28 bg-gradient-to-b from-[#031f18]/55 to-transparent" />
        <Container>
        <div className="max-w-3xl py-3 sm:py-5">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--color-accent)]">LemonTrip journal</p>
          <h1 id="blog-hero-title" className="mt-2 max-w-2xl font-heading text-4xl font-semibold leading-[0.98] tracking-tight text-white sm:text-5xl lg:text-[3.65rem]">Travel stories, tips &amp; inspiration</h1>
          <p className="mt-3 max-w-xl text-sm leading-6 text-white/85 sm:text-base">Discover new destinations, get practical travel tips, and make more of your next journey.</p>
          <div role="search" className="relative mt-5 max-w-md">
            <label htmlFor="journal-search" className="sr-only">Search articles</label>
            <Search size={18} aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
            <input id="journal-search" type="search" value={search} onChange={(event) => updateSearch(event.target.value)} placeholder="Search articles…" className={`w-full rounded-full border border-white/80 bg-white/95 py-3 pl-11 pr-12 text-sm text-[var(--color-text-primary)] shadow-sm outline-none placeholder:text-[var(--color-text-muted)] focus:border-[var(--green-2)] focus:ring-2 focus:ring-[var(--green-2)]/20 [&::-webkit-search-cancel-button]:appearance-none`} />
            {search ? <button type="button" onClick={() => updateSearch('')} aria-label="Clear search" className={`absolute right-2 top-1/2 grid size-9 -translate-y-1/2 place-items-center rounded-full bg-[var(--color-accent)] text-[var(--green-dark)] ${focusStyle}`}><X size={16} /></button> : <span aria-hidden="true" className="absolute right-2 top-1/2 grid size-9 -translate-y-1/2 place-items-center rounded-full bg-[var(--color-accent)] text-[var(--green-dark)]"><ArrowRight size={17} /></span>}
          </div>
        </div>
        </Container>
      </section>

    <Container className="pt-7 sm:pt-9">
      <div className="mb-5 flex items-center gap-2 text-xs text-[var(--color-text-muted)]"><Link href="/" className="hover:text-[var(--green-2)]">Home</Link><span aria-hidden="true">/</span><span className="font-semibold text-[var(--green-dark)]">Blog</span></div>
      <div className="grid items-start gap-7 lg:grid-cols-[minmax(0,1fr)_290px] xl:grid-cols-[minmax(0,1fr)_320px] xl:gap-8">
        <main className="min-w-0">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
            <div><p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--green-2)]">Ideas for your next escape</p><h2 className="mt-1 font-heading text-3xl font-semibold leading-tight text-[var(--green-dark)] sm:text-4xl">Latest travel articles</h2></div>
            <label className="flex items-center gap-2 text-xs text-[var(--color-text-secondary)]">Sort by
              <span className="relative"><select value={sort} onChange={(event) => { setSort(event.target.value); setPage(1) }} className="appearance-none rounded-xl border border-[var(--color-border-light)] bg-[var(--color-surface)] py-2.5 pl-3 pr-9 text-xs font-medium text-[var(--green-dark)] outline-none focus:border-[var(--green-2)] focus:ring-2 focus:ring-[var(--green-2)]/15"><option value="newest">Most recent</option><option value="recommended">Recommended</option><option value="oldest">Oldest</option></select><ChevronDown size={14} aria-hidden="true" className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[var(--green-dark)]" /></span>
            </label>
          </div>

          <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-[var(--color-border-light)] pb-4">
            <div role="group" aria-label="Filter articles by category" className="flex flex-wrap gap-2">
              <button type="button" aria-pressed={category === null} onClick={() => updateCategory(null)} className={`rounded-full border px-3.5 py-2 text-xs font-semibold transition ${focusStyle} ${category === null ? 'border-[var(--green-dark)] bg-[var(--green-dark)] text-white' : 'border-[var(--color-border-light)] bg-white text-[var(--color-text-secondary)] hover:border-[var(--green-2)]'}`}>All articles</button>
              {categories.map((item) => <button key={item} type="button" aria-pressed={category === item} onClick={() => updateCategory(item)} className={`rounded-full border px-3.5 py-2 text-xs font-semibold transition ${focusStyle} ${category === item ? 'border-[var(--green-dark)] bg-[var(--green-dark)] text-white' : 'border-[var(--color-border-light)] bg-white text-[var(--color-text-secondary)] hover:border-[var(--green-2)]'}`}>{item}</button>)}
            </div>
            <p role="status" aria-live="polite" className="text-xs text-[var(--color-text-muted)]">{filteredPosts.length} {filteredPosts.length === 1 ? 'article' : 'articles'}</p>
          </div>

          {pagePosts.length ? <div className="grid gap-4 sm:grid-cols-2 xl:gap-5">{pagePosts.map((post) => <ArticleCard key={post.id} post={post} />)}</div> : <div className="rounded-2xl border border-dashed border-[var(--color-border)] bg-white px-6 py-14 text-center"><BookOpen size={30} className="mx-auto text-[var(--green-2)]" /><h3 className="mt-3 font-heading text-2xl font-semibold text-[var(--green-dark)]">No articles found</h3><p className="mt-1 text-sm text-[var(--color-text-secondary)]">Try another search or select a different category.</p><button type="button" onClick={() => { updateCategory(null); updateSearch('') }} className={`mt-4 text-sm font-semibold text-[var(--green-2)] underline underline-offset-4 ${focusStyle}`}>Clear filters</button></div>}

          {pageCount > 1 && <nav aria-label="Article pages" className="mt-6 flex items-center justify-center gap-2">
            <button type="button" onClick={() => setPage(Math.max(1, currentPage - 1))} disabled={currentPage === 1} aria-label="Previous page" className={`grid size-9 place-items-center rounded-full border border-[var(--color-border-light)] bg-white text-[var(--green-dark)] disabled:cursor-not-allowed disabled:opacity-40 ${focusStyle}`}><ArrowLeft size={15} /></button>
            {Array.from({ length: pageCount }, (_, index) => index + 1).map((pageNumber) => <button key={pageNumber} type="button" onClick={() => setPage(pageNumber)} aria-current={currentPage === pageNumber ? 'page' : undefined} aria-label={`Page ${pageNumber}`} className={`grid size-9 place-items-center rounded-full border text-xs font-semibold ${focusStyle} ${currentPage === pageNumber ? 'border-[var(--green-dark)] bg-[var(--green-dark)] text-white' : 'border-[var(--color-border-light)] bg-white text-[var(--green-dark)] hover:border-[var(--green-2)]'}`}>{pageNumber}</button>)}
            <button type="button" onClick={() => setPage(Math.min(pageCount, currentPage + 1))} disabled={currentPage === pageCount} aria-label="Next page" className={`grid size-9 place-items-center rounded-full border border-[var(--color-border-light)] bg-white text-[var(--green-dark)] disabled:cursor-not-allowed disabled:opacity-40 ${focusStyle}`}><ArrowRight size={15} /></button>
          </nav>}
        </main>

        <aside className="space-y-4 lg:sticky lg:top-5">
          <section className="rounded-2xl border border-[var(--color-border-light)] bg-[var(--color-surface)] p-5" aria-labelledby="blog-categories-heading">
            <div className="mb-3 flex items-center justify-between"><h2 id="blog-categories-heading" className="font-heading text-xl font-semibold text-[var(--green-dark)]">Categories</h2><span className="h-0.5 w-7 rounded-full bg-[var(--color-accent)]" /></div>
            <ul className="space-y-1">
              {categories.map((item) => {
                const Icon = categoryIcons[item] || Compass
                const count = posts.filter((post) => post.category === item).length
                return <li key={item}><button type="button" onClick={() => updateCategory(category === item ? null : item)} aria-pressed={category === item} className={`flex w-full items-center gap-3 rounded-xl px-2 py-2 text-left text-sm transition hover:bg-[var(--color-primary-soft)] ${focusStyle} ${category === item ? 'bg-[var(--color-primary-soft)] text-[var(--green-dark)]' : 'text-[var(--color-text-secondary)]'}`}><span className="grid size-8 shrink-0 place-items-center rounded-full bg-[var(--color-primary-soft)] text-[var(--green-dark)]"><Icon size={16} /></span><span className="flex-1">{item}</span><span className="grid size-7 place-items-center rounded-full bg-[var(--color-background)] text-[11px] text-[var(--color-text-muted)]">{count}</span></button></li>
              })}
            </ul>
          </section>

          <section className="rounded-2xl border border-[var(--color-border-light)] bg-[var(--color-surface)] p-5" aria-labelledby="popular-posts-heading">
            <div className="mb-2 flex items-center justify-between"><h2 id="popular-posts-heading" className="font-heading text-xl font-semibold text-[var(--green-dark)]">Popular reads</h2><span className="h-0.5 w-7 rounded-full bg-[var(--color-accent)]" /></div>
            <div className="divide-y divide-[var(--color-border-light)]">
              {popularPosts.map((post) => <Link key={post.id} href={`/blog/${post.id}`} className={`group flex gap-3 py-3 first:pt-2 last:pb-0 ${focusStyle}`}>
                <span className={`h-[62px] w-[72px] shrink-0 overflow-hidden rounded-lg ${post.imageFallbackColor}`}>{post.imageUrl && <img src={post.imageUrl} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />}</span>
                <span className="min-w-0 self-center"><span className="line-clamp-2 text-xs font-semibold leading-5 text-[var(--green-dark)] group-hover:text-[var(--green-2)]">{post.title}</span><span className="mt-1 block text-[10px] text-[var(--color-text-muted)]">{post.updatedAt || post.date}{post.readTime ? ` · ${post.readTime}` : ''}</span></span>
              </Link>)}
            </div>
          </section>

          <section className="relative isolate overflow-hidden rounded-2xl bg-[var(--green-dark)] p-5 text-white" aria-labelledby="blog-trip-heading">
            <div className="absolute inset-0 -z-10 bg-cover bg-center opacity-35" style={{ backgroundImage: "url('/goa3.jpg')" }} />
            <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-[var(--color-accent)]"><Check size={13} /> LemonTrip picks</span>
            <h2 id="blog-trip-heading" className="mt-2 font-heading text-2xl font-semibold leading-tight">From reading to roaming.</h2>
            <p className="mt-2 text-sm leading-5 text-white/80">Find a getaway to turn your travel ideas into plans.</p>
            <Link href="/packages" className={`mt-4 inline-flex items-center gap-2 rounded-full bg-[var(--color-accent)] px-4 py-2.5 text-xs font-bold text-[var(--green-dark)] transition hover:brightness-95 ${focusStyle}`}>Explore packages <ArrowRight size={14} /></Link>
          </section>
        </aside>
      </div>
    </Container>
  </div>
}
