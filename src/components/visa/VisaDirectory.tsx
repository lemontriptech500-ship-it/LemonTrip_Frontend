'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Clock3, FileCheck2, FileText, Globe2, Search, X } from 'lucide-react'
import type { VisaService } from '@/data/visaServices'
import { CountryFlag } from '@/components/visa/CountryFlag'

const focusStyle = 'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--green-2)]'
const countryRegions: Record<string, string> = { 'United Kingdom': 'Europe', France: 'Europe', Australia: 'Oceania', 'United States': 'North America', Singapore: 'Asia', Thailand: 'Asia' }

function VisaCard({ service }: { service: VisaService }) {
  return (
    <article className="group grid grid-cols-[80px_1fr] items-start gap-4 rounded-xl border border-[var(--color-border)] bg-white p-4 transition-shadow hover:shadow-md sm:grid-cols-[110px_1fr] sm:gap-6 sm:p-6 xl:grid-cols-[110px_1fr_175px] xl:items-center">
      <Link href={`/visa/${service.id}`} aria-label={`View visa requirements for ${service.country}`} className={`relative block h-24 overflow-hidden rounded-lg bg-[var(--color-secondary-soft)] sm:h-32 ${focusStyle}`}>
        <CountryFlag country={service.country} className="absolute inset-0 h-full w-full text-5xl transition-transform duration-300 group-hover:scale-105 sm:text-6xl" />
      </Link>
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--green-2)]">{countryRegions[service.country] || 'Visa assistance'}</p>
        <h3 className="mt-1 font-heading text-2xl font-semibold leading-tight text-[var(--green-dark)] sm:text-3xl"><Link href={`/visa/${service.id}`} className={`hover:text-[var(--green-2)] ${focusStyle}`}>{service.country}</Link></h3>
        <p className="mt-1 text-xs text-[var(--color-text-secondary)] sm:text-sm">{service.visaType}</p>
        <dl className="mt-4 flex flex-wrap gap-x-5 gap-y-3">
          <div><dt className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wide text-[var(--color-text-muted)]"><Clock3 size={12} aria-hidden="true" />Processing</dt><dd className="mt-1 text-xs text-[var(--color-text-primary)]">{service.processingTime}</dd></div>
          <div><dt className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wide text-[var(--color-text-muted)]"><FileCheck2 size={12} aria-hidden="true" />Documents</dt><dd className="mt-1 text-xs text-[var(--color-text-primary)]">{service.documents?.length ?? 0} required documents</dd></div>
        </dl>
      </div>
      <div className="col-span-2 flex flex-wrap items-center justify-between gap-3 border-t border-[var(--color-border)] pt-4 xl:col-span-1 xl:block xl:border-l xl:border-t-0 xl:pl-6 xl:pt-0">
        <div><p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[var(--color-text-muted)]">Starting fee</p><p className="mt-1 text-base font-bold text-[var(--green-dark)]">{service.startingFrom}</p></div>
        <Link href={`/visa/${service.id}`} className={`inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--green-dark)] px-4 py-3 text-xs font-semibold text-white hover:bg-[var(--green-2)] xl:mt-4 xl:w-full ${focusStyle}`}>Requirements <ArrowRight size={14} aria-hidden="true" /></Link>
      </div>
    </article>
  )
}

export function VisaDirectory({ services }: { services: VisaService[] }) {
  const [region, setRegion] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const query = search.trim().toLowerCase()
  const regions = Array.from(new Set(services.map(service => countryRegions[service.country]).filter(Boolean)))
  const visibleServices = services.filter(service => (region === null || countryRegions[service.country] === region) && (!query || `${service.country} ${service.visaType}`.toLowerCase().includes(query)))

  return (
    <>
      <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--green-2)]">The destination directory</p><h2 className="mt-2 font-heading text-4xl font-semibold leading-tight text-[var(--green-dark)] sm:text-5xl">Where are you headed?</h2></div>
        <div role="search" className="relative w-full md:w-80 md:shrink-0"><label htmlFor="visa-search" className="sr-only">Search countries or visa types</label><Search size={18} aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" /><input id="visa-search" type="search" value={search} onChange={event => setSearch(event.target.value)} placeholder="Search country or visa type" className="w-full rounded-lg border border-[var(--color-border)] bg-white py-3.5 pl-11 pr-11 text-sm outline-none focus:border-[var(--green-2)] focus:ring-2 focus:ring-[var(--color-accent-soft)] [&::-webkit-search-cancel-button]:appearance-none" />{search && <button type="button" aria-label="Clear visa search" onClick={() => setSearch('')} className={`absolute right-2 top-1/2 -translate-y-1/2 rounded p-2 text-[var(--color-text-muted)] ${focusStyle}`}><X size={16} /></button>}</div>
      </div>
      <div className="grid items-start gap-7 lg:grid-cols-[230px_1fr] lg:gap-9">
        <aside className="lg:sticky lg:top-6">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-text-muted)]">Browse by region</p>
          <div role="group" aria-label="Filter visa destinations by region" className="flex flex-wrap gap-2 lg:flex-col lg:gap-1">{[null, ...regions].map(item => <button key={item ?? '__all__'} type="button" aria-pressed={region === item} onClick={() => setRegion(item)} className={`flex items-center justify-between gap-3 rounded-lg border px-4 py-3 text-left text-sm transition-colors ${focusStyle} ${region === item ? 'border-[var(--green-dark)] bg-[var(--green-dark)] font-semibold text-white' : 'border-[var(--color-border)] bg-white text-[var(--color-text-secondary)] hover:border-[var(--green-2)] lg:border-transparent lg:bg-transparent'}`}><span>{item ?? 'All destinations'}</span><span className="text-xs opacity-70">{services.filter(service => item === null || countryRegions[service.country] === item).length}</span></button>)}</div>
          <div className="mt-8 hidden border-t border-[var(--color-border)] pt-7 lg:block"><FileText size={26} strokeWidth={1.4} aria-hidden="true" className="text-[var(--green-2)]" /><h3 className="mt-3 font-heading text-2xl font-semibold text-[var(--green-dark)]">Before you begin</h3><ol className="mt-4 space-y-4 text-sm text-[var(--color-text-secondary)]"><li className="flex gap-3"><span className="w-5 shrink-0 tabular-nums text-[var(--green-2)]">01</span>Choose your destination.</li><li className="flex gap-3"><span className="w-5 shrink-0 tabular-nums text-[var(--green-2)]">02</span>Review the document checklist.</li><li className="flex gap-3"><span className="w-5 shrink-0 tabular-nums text-[var(--green-2)]">03</span>Check the processing timeline.</li></ol><Link href="/contact" className={`mt-6 inline-flex items-center gap-2 border-b border-[var(--green-dark)] pb-1 text-xs font-semibold text-[var(--green-dark)] ${focusStyle}`}>Ask our team <ArrowRight size={14} aria-hidden="true" /></Link></div>
        </aside>
        <div>
          <p role="status" aria-live="polite" aria-atomic="true" className="mb-4 text-xs text-[var(--color-text-muted)]">{visibleServices.length} {visibleServices.length === 1 ? 'destination' : 'destinations'}{region ? ` in ${region}` : ' to explore'}{query ? ` matching “${search.trim()}”` : ''}</p>
          {visibleServices.length ? <div className="space-y-4">{visibleServices.map(service => <VisaCard key={service.id} service={service} />)}</div> : <div className="rounded-xl border border-dashed border-[var(--color-border-strong)] bg-white px-6 py-16 text-center"><Globe2 size={36} aria-hidden="true" className="mx-auto text-[var(--green-2)]" /><h3 className="mt-4 font-heading text-3xl font-semibold text-[var(--green-dark)]">No destinations found</h3><p className="mt-2 text-sm text-[var(--color-text-secondary)]">Try another country or browse all destinations.</p><button type="button" onClick={() => { setRegion(null); setSearch('') }} className={`mt-5 rounded-lg bg-[var(--green-dark)] px-5 py-3 text-sm font-semibold text-white hover:bg-[var(--green-2)] ${focusStyle}`}>Show all destinations</button></div>}
          <p className="mt-5 text-xs leading-6 text-[var(--color-text-muted)]">Visa services shown are mock content. No applications are submitted.</p>
        </div>
      </div>
      <div className="mt-12 flex flex-col justify-between gap-4 border-y border-[var(--color-border)] py-8 sm:mt-16 sm:flex-row sm:items-center"><div><h2 className="font-heading text-3xl font-semibold text-[var(--green-dark)]">A question before your next adventure?</h2><p className="mt-2 text-sm text-[var(--color-text-secondary)]">Our team can help you find the right information for your travel plans.</p></div><Link href="/contact" className={`inline-flex w-fit shrink-0 items-center gap-3 rounded-lg bg-[var(--green-dark)] px-5 py-3 text-sm font-semibold text-white hover:bg-[var(--green-2)] ${focusStyle}`}>Talk to us <ArrowRight size={16} aria-hidden="true" /></Link></div>
    </>
  )
}
