'use client'

import { FormEvent, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import ui from './TripPlanner.module.css'
import { PAGE_HERO_IMAGES } from '@/constants/pageHeroImages'
import { ArrowRight, Compass, Copy, Download, MapPin, RefreshCw, Share2, Sparkles, CalendarDays, Users, Wallet, Mountain, Waves, Landmark, Heart, Sun, Moon, Sunrise, Route, Check, ArrowUpRight, Leaf } from 'lucide-react'
import { Alert, Button, Card, Container, Input, Textarea } from '@/components/ui'
import { ContactForm } from '@/components/contact/ContactForm'
import { costCategories, generateTrip, itineraryText, type TripPlan, type TripPreferences, type PlannerPackage } from '@/services/tripPlannerService'

const initialPreferences: TripPreferences = { destination: '', startingCity: '', departureDate: '', returnDate: '', duration: 4, travellers: 2, budget: 15000, style: 'mixed', interests: '', request: '' }
const money = (amount: number | null) => amount === null ? 'Unavailable' : new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount)
const travelStyles = [{ value: 'mixed', label: 'A little of everything', icon: Compass }, { value: 'adventure', label: 'Adventure', icon: Mountain }, { value: 'relaxation', label: 'Relaxation', icon: Leaf }, { value: 'family', label: 'Family', icon: Users }, { value: 'romantic', label: 'Romantic', icon: Heart }, { value: 'cultural', label: 'Culture', icon: Landmark }]
const travelIdeas = [{ destination: 'Manali', label: 'Mountains & slow mornings', detail: 'Scenic walks, local food & a little adventure', style: 'adventure', icon: Mountain }, { destination: 'Goa', label: 'Sunshine & sea breezes', detail: 'Quiet beaches, coastal food & time to unwind', style: 'relaxation', icon: Waves }, { destination: 'Jaipur', label: 'History & local flavours', detail: 'Beautiful architecture, markets & cultural experiences', style: 'cultural', icon: Landmark }]
const periods = [{ key: 'morning', label: 'Morning', icon: Sunrise }, { key: 'afternoon', label: 'Afternoon', icon: Sun }, { key: 'evening', label: 'Evening', icon: Moon }] as const

function RecommendedPackage({ pkg }: { pkg: PlannerPackage }) {
  const [failed, setFailed] = useState(false)
  return <Card padding="none" className={ui.packageCard}>
    <Link href={`/packages/${encodeURIComponent(pkg.id)}`} className="relative flex h-40 items-center justify-center bg-[var(--color-background-soft)]" aria-label={`View ${pkg.destination}`}>
      <Compass size={42} aria-hidden="true" />
      {pkg.imageUrl && !failed && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={pkg.imageUrl} alt={pkg.destination} loading="lazy" onError={() => setFailed(true)} className="absolute inset-0 h-full w-full object-cover" />
      )}
    </Link>
    <div className="space-y-2 p-4">
      <p className="text-xs font-semibold text-[var(--green-2)]">{pkg.duration}{pkg.location ? ` · ${pkg.location}` : ''}</p>
      <h3 className="text-lg font-bold">{pkg.destination}</h3>
      <p className="line-clamp-2 text-sm text-[var(--color-text-secondary)]">{pkg.description}</p>
      <p className="font-bold">{pkg.priceAmount ? `${pkg.currency} ${pkg.priceAmount.toLocaleString('en-IN')}` : pkg.startingPrice || 'Price on enquiry'}</p>
      <p className="text-xs text-[var(--color-text-muted)]">Catalogue starting price. Confirm travellers, inclusions and availability.</p>
      <Link href={`/packages/${encodeURIComponent(pkg.id)}`} className="inline-flex items-center gap-2 text-sm font-bold underline underline-offset-4">View package <ArrowRight size={14} aria-hidden="true" /></Link>
    </div>
  </Card>
}

export function TripPlanner() {
  const [preferences, setPreferences] = useState(initialPreferences)
  const [plan, setPlan] = useState<TripPlan | null>(null)
  const [pending, setPending] = useState<number | 'full' | null>(null)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')
  const [enquiryOpen, setEnquiryOpen] = useState(false)
  const inFlight = useRef(false)
  const resultRef = useRef<HTMLDivElement>(null)
  const resultsPanelRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const today = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Kolkata' }).format(new Date())
  const changed = plan && JSON.stringify(preferences) !== JSON.stringify(plan.preferences)

  function update<K extends keyof TripPreferences>(key: K, value: TripPreferences[K]) {
    setPreferences((current) => ({ ...current, [key]: value }))
  }
  async function run(dayNumber?: number, original = false) {
    if (inFlight.current) return
    const next = (dayNumber || original) && plan ? plan.preferences : preferences
    if (!next.destination.trim() && !next.request.trim()) { setError('Enter a destination or describe your trip.'); formRef.current?.focus(); return }
    if (Boolean(next.departureDate) !== Boolean(next.returnDate) || (next.departureDate && next.returnDate < next.departureDate)) { setError('Enter both dates, with return on or after departure.'); return }
    inFlight.current = true
    setPending(dayNumber || 'full'); setError(''); setNotice('')
    try {
      const result = await generateTrip(next, plan || undefined, dayNumber)
      setPlan(result)
      if (!dayNumber) setPreferences(result.preferences)
      setNotice(dayNumber ? `Day ${dayNumber} updated. Budget recalculated.` : 'Your itinerary is ready. Review estimates and local conditions before travelling.')
      if (!dayNumber) setTimeout(() => {
        resultsPanelRef.current?.scrollTo({ top: 0 })
        resultRef.current?.focus({ preventScroll: true })
        resultsPanelRef.current?.scrollIntoView({ block: 'start' })
      }, 0)
    } catch (err) { setError(err instanceof Error ? err.message : 'Unable to plan this trip. Please try again.') }
    finally { inFlight.current = false; setPending(null) }
  }
  function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); void run() }
  async function copyOrShare(share = false) {
    if (!plan) return
    setNotice('')
    try {
      const text = itineraryText(plan)
      if (share && navigator.share) await navigator.share({ title: `LemonTrip — ${plan.itinerary.destination}`, text })
      else { await navigator.clipboard.writeText(text); setNotice('Itinerary copied to clipboard.') }
    } catch (err) { if (!(err instanceof Error && err.name === 'AbortError')) setNotice('Copy or sharing is unavailable in this browser. Use Download itinerary instead.') }
  }
  function download() {
    if (!plan) return
    const url = URL.createObjectURL(new Blob([itineraryText(plan)], { type: 'text/plain;charset=utf-8' }))
    const link = document.createElement('a'); link.href = url; link.download = 'lemontrip-itinerary.txt'; link.click()
    setTimeout(() => URL.revokeObjectURL(url), 1000)
    setNotice('Itinerary downloaded to your device.')
  }

  return <div className={ui.page}>
    <section className={ui.hero}>
      <Image src={PAGE_HERO_IMAGES.travel} alt="" fill priority sizes="100vw" className={ui.heroImage} />
      <div className={ui.heroShade} />
      <Container className="relative z-10">
        <Link href="/packages" className={ui.backLink}>Holidays <span aria-hidden="true">/</span> Smart Trip Planner</Link>
        <p className={ui.heroBadge}><Sparkles size={14} aria-hidden="true" /> A LITTLE AI. A WORLD OF POSSIBILITIES.</p>
        <h1>Plan your perfect trip.<br /><em>Make it entirely yours.</em></h1>
        <p className={ui.heroDescription}>The places you dream of. The things you love. A thoughtful day-by-day plan, made around you and your budget.</p>
      </Container>
    </section>
    <Container className={ui.workspace}>
      <ol className={ui.steps} aria-label="How the trip planner works">
        {[{ title: 'Dream it', detail: 'Tell us your travel wishes', icon: Compass }, { title: 'Plan it', detail: 'Get your personal itinerary', icon: Route }, { title: 'Make it happen', detail: 'Explore LemonTrip holidays', icon: MapPin }].map((step, index) => <li key={step.title} className={index === (plan ? 1 : 0) ? ui.activeStep : ''}>
          <span className={ui.stepNumber}>{index === 0 && plan ? <Check size={17} aria-hidden="true" /> : `0${index + 1}`}</span><span><strong>{step.title}</strong><small>{step.detail}</small></span><step.icon size={20} className={ui.stepIcon} aria-hidden="true" />
        </li>)}
      </ol>
      <div className={ui.columns}>
        <Card padding="none" className={ui.preferences} id="planner-preferences">
          <div className={ui.formHeading}><span className={ui.iconTile}><Compass size={23} aria-hidden="true" /></span><div><p className={ui.eyebrow}>LET’S START WITH YOU</p><h2>Your trip. Your way.</h2><p>A few details are all we need to get inspired.</p></div></div>
          <form ref={formRef} onSubmit={submit} tabIndex={-1} className={ui.form}>
            <fieldset disabled={pending !== null} className={ui.formFields}>
              <legend className="sr-only">Trip preferences</legend>
              <div className={ui.promptBox}>
                <Textarea label="What does your ideal trip look like?" value={preferences.request} onChange={(e) => update('request', e.target.value)} maxLength={2000} rows={3} placeholder="A few days in the mountains, good food and a little adventure…" />
                <p><Sparkles size={12} aria-hidden="true" /> Write naturally. Fine-tune the details below.</p>
              </div>
              <section className={ui.formSection} aria-labelledby="planner-where">
                <h3 id="planner-where"><span>01</span> Where are we heading?</h3>
                <div className={ui.fieldGrid}>
                  <Input label="Destination or region" value={preferences.destination} onChange={(e) => update('destination', e.target.value)} maxLength={120} placeholder="e.g. Manali" leadingIcon={<MapPin size={16} />} />
                  <Input label="Starting from" value={preferences.startingCity} onChange={(e) => update('startingCity', e.target.value)} maxLength={120} placeholder="Your city" optional leadingIcon={<Route size={16} />} />
                </div>
              </section>
              <section className={ui.formSection} aria-labelledby="planner-details">
                <h3 id="planner-details"><span>02</span> Make room for the good things</h3>
                <div className={ui.fieldGrid}>
                  <Input label="Days away" type="number" min={1} max={14} required value={preferences.duration} disabled={Boolean(preferences.departureDate && preferences.returnDate)} leadingIcon={<CalendarDays size={16} />} onChange={(e) => update('duration', Number(e.target.value))} />
                  <Input label="Travellers" type="number" min={1} max={20} required value={preferences.travellers} leadingIcon={<Users size={16} />} onChange={(e) => update('travellers', Number(e.target.value))} />
                </div>
                <details className={ui.dateDetails}>
                  <summary><CalendarDays size={14} aria-hidden="true" /> Have dates in mind? <span>Add travel dates</span></summary>
                  <div className={ui.fieldGrid}>
                    <Input label="Departure date" type="date" value={preferences.departureDate} min={today} onChange={(e) => update('departureDate', e.target.value)} />
                    <Input label="Return date" type="date" value={preferences.returnDate} min={preferences.departureDate || today} onChange={(e) => update('returnDate', e.target.value)} />
                  </div>
                  <p className={ui.fieldHint}>Enter both dates or leave both empty. Dates set the trip length, including departure and return. Trips can be 1–14 days.</p>
                </details>
                <Input label="Your total budget (INR)" type="number" min={500} max={10000000} step={1} required value={preferences.budget} onChange={(e) => update('budget', Number(e.target.value))} leadingIcon={<Wallet size={16} />} helperText="One budget for your whole group. We’ll show you how it adds up." />
              </section>
              <section className={ui.formSection} aria-labelledby="planner-style">
                <h3 id="planner-style"><span>03</span> What’s your travel mood?</h3>
                <fieldset><legend className="sr-only">Travel style</legend><div className={ui.travelStyles}>{travelStyles.map(({ value, label, icon: Icon }) => <label key={value}><input className="peer sr-only" type="radio" name="travelStyle" value={value} checked={preferences.style === value} onChange={() => update('style', value)} /><span><Icon size={15} aria-hidden="true" />{label}</span></label>)}</div></fieldset>
                <Textarea label="Anything that would make it special?" value={preferences.interests} onChange={(e) => update('interests', e.target.value)} maxLength={1500} rows={2} placeholder="Local food, gentle walks, vegetarian meals, accessibility needs…" optional />
              </section>
            </fieldset>
            <div className={ui.formFooter}>
              <Button type="submit" fullWidth size="lg" loading={pending === 'full'} disabled={pending !== null} icon={<Sparkles size={17} />} className={ui.generateButton}>{plan ? 'Update my itinerary' : 'Create my dream itinerary'}</Button>
              <p><Check size={13} aria-hidden="true" /> Personalised to you <span>·</span> Free to explore <span>·</span> No booking commitment</p>
              <small>AI suggestions and cost estimates are a starting point. Confirm prices and local conditions before booking.</small>
            </div>
          </form>
        </Card>
        <div className={plan ? ui.scrollColumn : undefined}>
        <div ref={resultsPanelRef} id="planner-results" className={ui.results} aria-busy={pending !== null} tabIndex={plan ? 0 : undefined} role={plan ? 'region' : undefined} aria-label={plan ? 'Your itinerary. Scroll to explore your days, budget and packages.' : undefined}>
          {plan && <p className={ui.scrollHint}><span>Your personal travel plan</span><span>Scroll to explore <ArrowRight size={13} aria-hidden="true" /></span></p>}
          {error && <div role="alert"><Alert variant="error">{error} Your preferences are kept; use Generate or Regenerate to retry.</Alert></div>}
          <div role="status" aria-live="polite">{notice && <Alert variant="info">{notice}</Alert>}</div>
          {pending === 'full' ? <Card className="space-y-5 p-6"><p role="status" className="flex items-center gap-2 font-semibold"><Sparkles className="motion-safe:animate-pulse" size={20} /> Planning your days and finding LemonTrip packages…</p><p className="text-sm text-[var(--color-text-secondary)]">This may take up to a minute.</p>{[1, 2, 3].map((n) => <div key={n} className="h-32 rounded-xl bg-[var(--color-background-soft)] motion-safe:animate-pulse" aria-hidden="true" />)}</Card> : !plan ? <div className={ui.inspiration}>
            <div className={ui.destinationPhoto}>
              <Image src="/manali4.jpg" alt="Snow-covered Himalayan peaks and pine forests near Manali" fill sizes="(max-width: 1023px) 100vw, 600px" className="object-cover" />
              <div className={ui.photoShade} />
              <span className={ui.photoBadge}><MapPin size={13} aria-hidden="true" /> A little Himalayan inspiration</span>
              <div className={ui.photoCaption}><span>LESS PLANNING. MORE POSSIBILITY.</span><h2>Somewhere wonderful<br />is waiting for you.</h2><p>You bring the dream. We’ll help with the details.</p></div>
              <span className={ui.photoStamp}><Sparkles size={17} aria-hidden="true" /><span>Thoughtfully planned<strong>Uniquely yours</strong></span></span>
            </div>
            <div className={ui.ideaSection}><p className={ui.eyebrow}>A LITTLE INSPIRATION</p><h3>Not sure where to begin?</h3><p>Pick a travel mood. Make it your own.</p>
              <div className={ui.ideas}>{travelIdeas.map((idea) => <button key={idea.destination} type="button" onClick={() => { setPreferences((current) => ({ ...current, destination: idea.destination, request: idea.detail, style: idea.style })); formRef.current?.querySelector('textarea')?.focus() }}><span className={ui.ideaIcon}><idea.icon size={20} aria-hidden="true" /></span><span><strong>{idea.label}</strong><small>{idea.destination} · {idea.detail}</small></span><ArrowUpRight size={17} aria-hidden="true" /></button>)}</div>
            </div>
            <div className={ui.promise}><span className={ui.iconTile}><Route size={23} aria-hidden="true" /></span><div><h3>A plan you can actually use.</h3><p>Day-by-day ideas, transparent estimates and real LemonTrip holidays. All in one place, ready to make your own.</p></div></div>
          </div> : <div ref={resultRef} tabIndex={-1} className={ui.itinerary}>
            <Card className={ui.tripSummary}>
              <p className="text-xs font-bold uppercase tracking-widest text-[var(--green-2)]">Your personalised itinerary</p><h2 className="mt-2 font-heading text-3xl font-semibold">{plan.itinerary.destination}</h2>
              <p className="mt-2 text-sm font-semibold">{plan.preferences.duration} days · {plan.preferences.travellers} travellers · {plan.preferences.style} travel</p>
              {plan.preferences.departureDate && <p className="mt-1 text-sm">{plan.preferences.departureDate} — {plan.preferences.returnDate}</p>}
              <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-[var(--color-text-secondary)]">{plan.itinerary.overview}</p>
              <div className="mt-5 flex flex-wrap gap-2"><Button size="sm" variant="secondary" onClick={() => void run(undefined, true)} disabled={pending !== null} icon={<RefreshCw size={14} />}>Regenerate all</Button><Button size="sm" variant="outline" onClick={() => { formRef.current?.querySelector('textarea')?.focus(); formRef.current?.scrollIntoView({ block: 'center' }) }}>Modify preferences</Button><Button size="sm" variant="outline" onClick={() => void copyOrShare()} icon={<Copy size={14} />}>Copy</Button><Button size="sm" variant="outline" onClick={() => void copyOrShare(true)} icon={<Share2 size={14} />}>Share</Button><Button size="sm" variant="outline" onClick={download} icon={<Download size={14} />}>Download itinerary</Button></div>
              <p className="mt-3 text-xs text-[var(--color-text-muted)]">Keep a copy of your itinerary with you. Download saves it on your device.</p>
              {changed && <p className="mt-3 text-sm font-semibold">You have edited your preferences. Generate again to apply them to this plan.</p>}
              <a href="#planner-packages" className="mt-4 inline-block text-sm font-bold underline underline-offset-4">View recommended packages ↓</a>
            </Card>
            {plan.itinerary.days.map((day) => <Card key={day.day} className={ui.dayCard}>
              <div className="flex flex-wrap items-start justify-between gap-3"><div className="min-w-0 flex-1"><p className="text-xs font-bold uppercase tracking-widest text-[var(--green-2)]">Day {day.day}</p><h3 className="mt-1 text-xl font-bold">{day.title}</h3></div><Button size="sm" variant="ghost" disabled={pending !== null} loading={pending === day.day} onClick={() => void run(day.day)} aria-label={`Regenerate day ${day.day}`} icon={<RefreshCw size={14} />}>Regenerate</Button></div>
              <dl className={ui.timeline}>{periods.map(({ key, label, icon: Icon }) => <div key={key}><dt><span><Icon size={15} aria-hidden="true" /></span>{label}</dt><dd>{day[key]}</dd></div>)}</dl>
              <p className="mt-5 text-sm"><span className="font-semibold">Explore: </span>{day.attractions.join(' · ')}</p>
              <details className="mt-4 rounded-xl bg-[#f7faf8] p-3 text-xs"><summary className="cursor-pointer font-semibold">Daily cost estimates & assumptions</summary><dl className="mt-3 space-y-3">{costCategories.map((key) => <div key={key}><dt className="font-semibold capitalize">{key}: {money(day.costs[key].amount)}</dt><dd className="mt-1 text-[var(--color-text-secondary)]">{day.costs[key].basis}</dd></div>)}</dl></details>
            </Card>)}
            <Card className={ui.budgetCard}>
              <h3 className="text-xl font-bold">Your estimated budget</h3><p className="mt-1 text-sm">For all {plan.preferences.travellers} travellers · INR</p>
              <dl className="mt-5 space-y-3">{costCategories.map((key) => <div key={key} className="flex justify-between gap-4 text-sm"><dt className="capitalize">{key}</dt><dd className="font-semibold">{money(plan.budget.categories[key])}</dd></div>)}<div className="flex justify-between gap-4 border-t border-[#0F382C]/20 pt-4 font-bold"><dt>Estimated trip total</dt><dd>{money(plan.budget.total)}</dd></div><div className="flex justify-between gap-4 text-sm"><dt>Estimated per traveller</dt><dd>{money(plan.budget.perPerson)}</dd></div>{plan.budget.total === null && <div className="flex justify-between gap-4 text-sm"><dt>Known subtotal (incomplete)</dt><dd>{money(plan.budget.knownSubtotal)}</dd></div>}<div className="flex justify-between gap-4 font-semibold"><dt>{plan.budget.remaining !== null && plan.budget.remaining < 0 ? 'Over your budget' : 'Remaining budget'}</dt><dd>{plan.budget.remaining === null ? 'Unavailable' : money(Math.abs(plan.budget.remaining))}</dd></div></dl>
              <p className="mt-5 text-xs leading-relaxed">{plan.budget.disclaimer}</p>
            </Card>
            <Card className={ui.tipsCard}><h3 className="text-xl font-bold">Good to know before you go</h3><ul className="mt-4 list-disc space-y-3 pl-5 text-sm leading-relaxed text-[var(--color-text-secondary)]">{plan.itinerary.tips.map((tip, index) => <li key={index}>{tip}</li>)}</ul></Card>
            <section id="planner-packages" className="scroll-mt-6"><h3 className="text-2xl font-bold">Explore with LemonTrip</h3><p className="mt-2 text-sm text-[var(--color-text-secondary)]">Related holidays from our catalogue, ranked by duration, indicative price and travel style. Confirm suitability and the price basis with our team.</p>{plan.packages.length ? <div className="mt-5 grid gap-4 sm:grid-cols-2">{plan.packages.map((pkg) => <RecommendedPackage key={pkg.id} pkg={pkg} />)}</div> : <Card className="mt-4 p-5"><p className="text-sm">{plan.packageStatus === 'unavailable' ? 'We could not load the package catalogue right now. Try generating again later, or contact our team.' : 'No matching LemonTrip package was found. Our team can help you explore a custom trip.'}</p></Card>}<div className="mt-5 flex flex-wrap gap-3"><Button asChild variant="outline"><Link href="/packages">Explore all packages</Link></Button><Button onClick={() => setEnquiryOpen(!enquiryOpen)} aria-expanded={enquiryOpen} aria-controls="planner-enquiry">{enquiryOpen ? 'Close enquiry' : 'Enquire about this trip'}</Button></div></section>
            {enquiryOpen && <Card id="planner-enquiry" className="p-5 sm:p-7"><h3 className="mb-2 text-xl font-bold">Let’s talk about your trip</h3><p className="mb-5 text-sm text-[var(--color-text-secondary)]">Send an enquiry to the LemonTrip team. This does not make a booking.</p><ContactForm key={JSON.stringify(plan.itinerary)} initialSubject={`Trip enquiry: ${plan.itinerary.destination}`} initialMessage={itineraryText(plan).slice(0, 4900)} /></Card>}
          </div>}
        </div>
        </div>
      </div>
    </Container>
  </div>

}
