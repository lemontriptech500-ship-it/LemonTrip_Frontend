'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, CalendarDays, Check, Copy, Tag, Ticket, Sparkles } from 'lucide-react'
import type { Offer } from '@/data/offers'

const focusStyle = 'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--green-2)]'

function OfferCard({ offer }: { offer: Offer }) {
  const [copied, setCopied] = useState(false)
  const [message, setMessage] = useState('')
  const [imageFailed, setImageFailed] = useState(false)

  async function copyCode() {
    if (!offer.code) return
    try {
      await navigator.clipboard.writeText(offer.code)
      setCopied(true)
      setMessage('Promo code copied.')
    } catch {
      setMessage('Copy unavailable. Select the promo code to copy it manually.')
    }
  }

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-[var(--color-border)] bg-white transition-shadow hover:shadow-lg">
      <Link href={`/offers/${offer.id}`} aria-label={`View ${offer.title}`} className={`relative block h-52 shrink-0 overflow-hidden bg-[var(--color-secondary-soft)] ${focusStyle}`}>
        <div className={`absolute inset-0 flex items-center justify-center ${offer.imageColor}`}><Ticket size={64} strokeWidth={1} aria-hidden="true" className="text-[var(--green-2)]" /></div>
        {offer.imageUrl && !imageFailed && (
          // Offer artwork is supplied by the content catalog.
          // eslint-disable-next-line @next/next/no-img-element
          <img src={offer.imageUrl} alt="" loading="lazy" onError={() => setImageFailed(true)} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
        )}
        <span className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <span className="absolute bottom-4 left-4 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-[var(--green-dark)]">{offer.category}</span>
        {offer.discount && <span className="absolute right-4 top-4 rounded-xl bg-[var(--yellow)] px-4 py-2 text-sm font-extrabold text-[var(--green-dark)] shadow-sm">{offer.discount}</span>}
      </Link>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-heading text-2xl font-semibold leading-tight text-[var(--green-dark)]"><Link href={`/offers/${offer.id}`} className={`hover:text-[var(--green-2)] ${focusStyle}`}>{offer.title}</Link></h3>
        <p className="mt-3 text-sm leading-6 text-[var(--color-text-secondary)]">{offer.description}</p>
        <div className="mt-auto pt-6">
          {offer.code && (
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-dashed border-[var(--color-border-strong)] bg-[var(--color-background-soft)] p-3">
              <div><span className="block text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--color-text-muted)]">Promo code</span><span className="select-all font-mono text-sm font-bold tracking-wide text-[var(--green-dark)]">{offer.code}</span></div>
              <button type="button" onClick={copyCode} aria-label={`Copy code ${offer.code}`} className={`inline-flex items-center gap-1.5 rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 text-xs font-semibold text-[var(--green-dark)] hover:bg-[var(--yellow-soft)] ${focusStyle}`}>{copied ? <Check size={14} /> : <Copy size={14} />}{copied ? 'Copied' : 'Copy'}</button>
            </div>
          )}
          <p role="status" className={copied || !message ? 'sr-only' : 'mt-2 text-xs text-[var(--color-text-secondary)]'}>{message}</p>
          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-[var(--color-border-light)] pt-4">
            {offer.validTill && <span className="inline-flex items-center gap-1.5 text-xs text-[var(--color-text-muted)]"><CalendarDays size={14} aria-hidden="true" />Until {new Date(`${offer.validTill}T00:00:00Z`).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', timeZone: 'Asia/Kolkata' })}</span>}
            <Link href={`/offers/${offer.id}`} className={`inline-flex items-center gap-2 text-sm font-semibold text-[var(--green-dark)] hover:text-[var(--green-2)] ${focusStyle}`}>View offer <ArrowRight size={16} aria-hidden="true" /></Link>
          </div>
        </div>
      </div>
    </article>
  )
}

export function OffersGallery({ offers }: { offers: Offer[] }) {
  const [category, setCategory] = useState<string | null>(null)
  const categories = Array.from(new Set(offers.map(offer => offer.category)))
  const visibleOffers = offers.filter(offer => category === null || offer.category === category)

  return (
    <>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[var(--green-2)]"><Sparkles size={15} aria-hidden="true" />A little extra for your next escape</p>
          <h2 className="mt-2 font-heading text-4xl font-semibold leading-tight text-[var(--green-dark)] sm:text-5xl">Go further. Spend less.</h2>
          <p className="mt-3 max-w-xl text-sm leading-6 text-[var(--color-text-secondary)]">Find a deal that fits your plans, from a weekend stay to your next big adventure.</p>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-white px-4 py-2 text-xs font-semibold text-[var(--green-dark)]"><Tag size={14} aria-hidden="true" />{offers.length} available {offers.length === 1 ? 'offer' : 'offers'}</span>
      </div>
      {offers.length > 0 && <div role="group" aria-label="Filter offers by category" className="mb-6 flex flex-wrap gap-2 border-b border-[var(--color-border)] pb-6">
        {[null, ...categories].map(item => <button key={item ?? '__all__'} type="button" aria-pressed={category === item} onClick={() => setCategory(item)} className={`rounded-full border px-4 py-2.5 text-sm font-medium transition-colors ${focusStyle} ${category === item ? 'border-[var(--green-dark)] bg-[var(--green-dark)] text-white' : 'border-[var(--color-border)] bg-white text-[var(--color-text-secondary)] hover:border-[var(--green-2)] hover:text-[var(--green-dark)]'}`}>{item ?? 'All offers'}</button>)}
      </div>}
      <p role="status" aria-live="polite" aria-atomic="true" className="mb-5 text-xs text-[var(--color-text-muted)]">{visibleOffers.length} {visibleOffers.length === 1 ? 'offer' : 'offers'}{category ? ` in ${category}` : ' to explore'}</p>
      {visibleOffers.length > 0 ? <div className="grid items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3">{visibleOffers.map(offer => <OfferCard key={offer.id} offer={offer} />)}</div> : <div className="rounded-3xl border border-dashed border-[var(--color-border-strong)] bg-white px-6 py-16 text-center"><Ticket size={36} aria-hidden="true" className="mx-auto text-[var(--green-2)]" /><h3 className="mt-4 font-heading text-3xl font-semibold text-[var(--green-dark)]">More offers are on the way</h3><p className="mt-2 text-sm text-[var(--color-text-secondary)]">Check back soon for new ways to save on your next trip.</p><Link href="/packages" className={`mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[var(--green-dark)] ${focusStyle}`}>Explore holidays <ArrowRight size={16} /></Link></div>}
      <section aria-labelledby="offers-how-heading" className="mt-12 rounded-3xl border border-[var(--color-border)] bg-[var(--color-background-soft)] p-6 sm:mt-16 sm:p-9">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--green-2)]">A little planning goes a long way</p>
        <h2 id="offers-how-heading" className="mt-2 font-heading text-3xl font-semibold text-[var(--green-dark)]">Found something you like?</h2>
        <ol className="mt-6 grid gap-6 md:grid-cols-3">{[{title:'Choose your offer',text:'Find a promotion that suits your journey.'},{title:'Check the details',text:'Review eligibility, validity and the offer terms.'},{title:'Keep the code handy',text:'Copy the promo code for when you make your booking.'}].map((step,index) => <li key={step.title} className="flex items-start gap-3"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--yellow)] text-sm font-bold text-[var(--green-dark)]">{index+1}</span><div><h3 className="text-sm font-semibold text-[var(--green-dark)]">{step.title}</h3><p className="mt-1 text-sm leading-6 text-[var(--color-text-secondary)]">{step.text}</p></div></li>)}</ol>
      </section>
    </>
  )
}
