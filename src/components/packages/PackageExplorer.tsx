'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Compass, Globe2, Search, X } from 'lucide-react'
import { PackageCard } from './PackageCard'
import type { HolidayPackage } from '@/data/packages'

const focusStyle = 'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--green-2)]'
const categories = [{ id: 'all', label: 'All holidays' }, { id: 'national', label: 'Explore India' }, { id: 'international', label: 'Around the world' }]

export function PackageExplorer({ packages }: { packages: HolidayPackage[] }) {
  const [category, setCategory] = useState('all')
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('recommended')
  const query = search.trim().toLowerCase()
  const visiblePackages = packages.filter(pkg => (category === 'all' || pkg.category === category) && (!query || `${pkg.destination} ${pkg.description} ${pkg.highlights.join(' ')}`.toLowerCase().includes(query)))
  const amount = (pkg: HolidayPackage) => Number(pkg.startingPrice.match(/[\d,]+/)?.[0].replace(/,/g, '')) || 0
  if (sort === 'price-low') visiblePackages.sort((a, b) => amount(a) - amount(b))
  if (sort === 'duration') visiblePackages.sort((a, b) => (parseInt(a.duration) || 0) - (parseInt(b.duration) || 0))

  return (
    <>
      <div className="rounded-2xl border border-[var(--color-border)] bg-white px-5 py-5 shadow-lg sm:px-8 sm:py-6">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
          <div><p className="text-xs font-bold uppercase tracking-[0.15em] text-[var(--green-2)]">Choose your next escape</p><h2 className="mt-1 font-heading text-2xl font-semibold text-[var(--green-dark)]">Where would you love to go?</h2></div>
          <div role="search" className="relative w-full md:w-[380px] md:shrink-0">
            <label htmlFor="package-search" className="sr-only">Search holiday destinations</label>
            <Search size={18} aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
            <input id="package-search" type="search" value={search} onChange={event => setSearch(event.target.value)} placeholder="Destination, experience or highlight" className="w-full rounded-lg border border-[var(--color-border)] bg-[#fbf9f3] py-3.5 pl-11 pr-11 text-sm outline-none focus:border-[var(--green-2)] focus:ring-2 focus:ring-[var(--color-accent-soft)] [&::-webkit-search-cancel-button]:appearance-none" />
            {search && <button type="button" aria-label="Clear destination search" onClick={() => setSearch('')} className={`absolute right-2 top-1/2 -translate-y-1/2 rounded p-2 text-[var(--color-text-muted)] ${focusStyle}`}><X size={16} /></button>}
          </div>
        </div>
        <div role="group" aria-label="Filter holiday packages" className="mt-5 flex flex-wrap gap-x-6 gap-y-2 border-t border-[var(--color-border)] pt-4">
          {categories.map(item => <button key={item.id} type="button" aria-pressed={category === item.id} onClick={() => setCategory(item.id)} className={`flex items-center gap-2 border-b-2 pb-2 pt-1 text-sm transition-colors ${focusStyle} ${category === item.id ? 'border-[var(--green-dark)] font-semibold text-[var(--green-dark)]' : 'border-transparent text-[var(--color-text-muted)] hover:text-[var(--green-dark)]'}`}>{item.label}<span className="text-xs text-[var(--color-text-muted)]">({packages.filter(pkg => item.id === 'all' || pkg.category === item.id).length})</span></button>)}
        </div>
      </div>
      <div className="mt-12 flex flex-wrap items-end justify-between gap-4"><div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--green-2)]">The holiday collection</p><h2 className="mt-2 font-heading text-4xl font-semibold leading-tight text-[var(--green-dark)] sm:text-5xl">Worth taking time for.</h2></div><p className="max-w-xs text-sm leading-6 text-[var(--color-text-secondary)]">Thoughtful itineraries. Beautiful places.<br />Find the journey that feels like you.</p></div>
      <div className="my-5 flex flex-wrap items-center justify-between gap-3">
        <p role="status" aria-live="polite" aria-atomic="true" className="text-xs text-[var(--color-text-muted)]">{visiblePackages.length} {visiblePackages.length === 1 ? 'holiday' : 'holidays'} to explore{query ? ` matching “${search.trim()}”` : ''}</p>
        <div className="flex items-center gap-2 text-xs text-[var(--color-text-muted)]"><label htmlFor="package-sort">Sort by</label><select id="package-sort" value={sort} onChange={event => setSort(event.target.value)} className={`rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 text-xs font-medium text-[var(--green-dark)] ${focusStyle}`}><option value="recommended">Recommended</option><option value="price-low">Price: low to high</option><option value="duration">Shortest trips</option></select></div>
      </div>
      {visiblePackages.length ? <div className="grid items-stretch gap-7 md:grid-cols-2">{visiblePackages.map((pkg, index) => <article key={pkg.id} className={index === 0 ? 'md:col-span-2' : ''}><PackageCard pkg={pkg} featured={index === 0} /></article>)}</div> : <div className="rounded-3xl border border-dashed border-[var(--color-border-strong)] bg-white px-6 py-16 text-center"><Compass size={36} aria-hidden="true" className="mx-auto text-[var(--green-2)]" /><h3 className="mt-4 font-heading text-3xl font-semibold text-[var(--green-dark)]">{packages.length ? 'Let’s try another destination' : 'New journeys are on the way'}</h3><p className="mt-2 text-sm text-[var(--color-text-secondary)]">{packages.length ? 'Search a different place or browse all our holiday packages.' : 'Check back soon or speak with our team about your travel plans.'}</p>{packages.length > 0 && <button type="button" onClick={() => { setCategory('all'); setSearch('') }} className={`mt-5 rounded-full bg-[var(--green-dark)] px-5 py-3 text-sm font-semibold text-white hover:bg-[var(--green-2)] ${focusStyle}`}>Show all holidays</button>}</div>}
      <section aria-labelledby="package-help-heading" className="relative mt-12 overflow-hidden rounded-3xl bg-[var(--green-dark)] p-7 sm:mt-16 sm:p-10">
        <Globe2 size={190} strokeWidth={0.7} aria-hidden="true" className="pointer-events-none absolute -right-8 -top-7 text-white/10" />
        <div className="relative flex flex-col justify-between gap-6 sm:flex-row sm:items-center"><div><p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--yellow)]">Your journey, your way</p><h2 id="package-help-heading" className="mt-2 font-heading text-3xl font-semibold text-white sm:text-4xl">A little help planning something special?</h2><p className="mt-3 max-w-xl text-sm leading-6 text-white/80">Tell us where you want to go and what you love. Our team can help you explore your options.</p></div><Link href="/contact" className="inline-flex w-fit shrink-0 items-center gap-3 rounded-full bg-[var(--yellow)] px-6 py-3.5 text-sm font-bold text-[var(--green-dark)] hover:bg-[var(--yellow-soft)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">Let’s plan a trip <ArrowRight size={17} aria-hidden="true" /></Link></div>
      </section>
    </>
  )
}
