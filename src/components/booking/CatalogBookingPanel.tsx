'use client'

import { useState } from 'react'
import { CheckCircle2, ShieldCheck } from 'lucide-react'
import { Button, Card } from '@/components/ui'

interface CatalogBookingPanelProps {
  title: string
  price: number
  currency?: string
  date?: string
  options?: string[]
  optionLabel?: string
  quantityLabel?: string
}

export function CatalogBookingPanel({
  title,
  price,
  currency = 'INR',
  date,
  options = [],
  optionLabel = 'Class',
  quantityLabel = 'Travellers',
}: CatalogBookingPanelProps) {
  const [selectedOption, setSelectedOption] = useState(options[0] || '')
  const [quantity, setQuantity] = useState(1)
  const [reviewing, setReviewing] = useState(false)
  const [complete, setComplete] = useState(false)
  const [guest, setGuest] = useState({ name: '', email: '', phone: '' })
  const total = price * quantity
  const money = new Intl.NumberFormat('en-IN', { style: 'currency', currency, maximumFractionDigits: 0 }).format(total)

  if (complete) {
    return (
      <Card className="border-[var(--color-primary)] bg-[var(--color-primary-soft)] p-6" aria-live="polite">
        <CheckCircle2 className="text-[var(--color-primary)]" size={30} />
        <h2 className="mt-3 text-xl font-bold text-[var(--color-text-primary)]">Booking preview complete</h2>
        <p className="mt-2 text-sm text-[var(--color-text-secondary)]">This is sample catalog inventory. No ticket was issued and no payment was taken.</p>
        <Button className="mt-5" variant="outline" onClick={() => { setComplete(false); setReviewing(false) }}>Edit details</Button>
      </Card>
    )
  }

  if (reviewing) {
    return (
      <Card className="border-[var(--color-border)] p-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-[var(--color-primary)]">Review your trip</p>
        <h2 className="mt-2 text-xl font-bold text-[var(--color-text-primary)]">{title}</h2>
        <dl className="mt-5 space-y-3 text-sm">
          {date && <div className="flex justify-between gap-4"><dt className="text-[var(--color-text-secondary)]">Travel date</dt><dd className="font-medium">{date}</dd></div>}
          {selectedOption && <div className="flex justify-between gap-4"><dt className="text-[var(--color-text-secondary)]">{optionLabel}</dt><dd className="font-medium">{selectedOption}</dd></div>}
          <div className="flex justify-between gap-4"><dt className="text-[var(--color-text-secondary)]">{quantityLabel}</dt><dd className="font-medium">{quantity}</dd></div>
          <div className="flex justify-between gap-4"><dt className="text-[var(--color-text-secondary)]">Lead passenger</dt><dd className="font-medium">{guest.name}</dd></div>
          <div className="flex justify-between gap-4 border-t border-[var(--color-border-light)] pt-3"><dt className="font-semibold">Sample total</dt><dd className="text-lg font-bold">{money}</dd></div>
        </dl>
        <p className="mt-4 rounded-lg bg-[var(--color-surface-secondary)] p-3 text-xs text-[var(--color-text-secondary)]">Demo flow only. Live availability and payment are not connected for this catalog item.</p>
        <div className="mt-5 flex gap-3"><Button variant="outline" onClick={() => setReviewing(false)}>Edit</Button><Button onClick={() => setComplete(true)}>Confirm demo booking</Button></div>
      </Card>
    )
  }

  return (
    <Card className="border-[var(--color-border)] p-6 shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div><p className="text-sm text-[var(--color-text-secondary)]">Sample fare from</p><p className="mt-1 text-3xl font-bold text-[var(--color-text-primary)]">{new Intl.NumberFormat('en-IN', { style: 'currency', currency, maximumFractionDigits: 0 }).format(price)}<span className="ml-1 text-sm font-normal text-[var(--color-text-secondary)]">/ person</span></p></div>
        <ShieldCheck className="text-[var(--color-primary)]" size={22} aria-hidden />
      </div>
      <form className="mt-6 space-y-4" onSubmit={(event) => { event.preventDefault(); setReviewing(true) }}>
        {date && <div className="rounded-lg bg-[var(--color-surface-secondary)] p-3"><p className="text-xs text-[var(--color-text-secondary)]">Travel date</p><p className="font-semibold text-[var(--color-text-primary)]">{date}</p></div>}
        {options.length > 0 && <label className="block text-sm font-medium text-[var(--color-text-primary)]">{optionLabel}<select value={selectedOption} onChange={(event) => setSelectedOption(event.target.value)} className="mt-1 h-11 w-full rounded-lg border border-[var(--color-border)] bg-white px-3">{options.map((option) => <option key={option} value={option}>{option}</option>)}</select></label>}
        <label className="block text-sm font-medium text-[var(--color-text-primary)]">{quantityLabel}<select value={quantity} onChange={(event) => setQuantity(Number(event.target.value))} className="mt-1 h-11 w-full rounded-lg border border-[var(--color-border)] bg-white px-3">{[1, 2, 3, 4, 5, 6].map((count) => <option key={count} value={count}>{count} {quantityLabel.toLowerCase()}</option>)}</select></label>
        <div className="border-t border-[var(--color-border-light)] pt-4">
          <p className="mb-3 font-semibold text-[var(--color-text-primary)]">Lead passenger</p>
          <div className="space-y-3">
            <input required autoComplete="name" value={guest.name} onChange={(event) => setGuest({ ...guest, name: event.target.value })} placeholder="Full name" aria-label="Full name" className="h-11 w-full rounded-lg border border-[var(--color-border)] px-3" />
            <input required type="email" autoComplete="email" value={guest.email} onChange={(event) => setGuest({ ...guest, email: event.target.value })} placeholder="Email address" aria-label="Email address" className="h-11 w-full rounded-lg border border-[var(--color-border)] px-3" />
            <input required type="tel" autoComplete="tel" value={guest.phone} onChange={(event) => setGuest({ ...guest, phone: event.target.value })} placeholder="Mobile number" aria-label="Mobile number" className="h-11 w-full rounded-lg border border-[var(--color-border)] px-3" />
          </div>
        </div>
        <div className="flex justify-between border-t border-[var(--color-border-light)] pt-4 text-sm"><span className="text-[var(--color-text-secondary)]">Estimated total</span><strong className="text-lg text-[var(--color-text-primary)]">{money}</strong></div>
        <Button type="submit" fullWidth size="lg">Review booking</Button>
        <p className="text-center text-xs text-[var(--color-text-secondary)]">Sample listing · no payment will be taken</p>
      </form>
    </Card>
  )
}
