'use client'

import { useEffect, useState } from 'react'
import { Loader2 } from 'lucide-react'
import { Alert, Button } from '@/components/ui'
import { checkTrainAvailability, type TrainPassenger } from '@/services/trainService'
import { TravelRazorpayCheckout } from '@/components/booking/TravelRazorpayCheckout'

interface TrainBookingPanelProps {
  train: { id: string; name: string; classes: string[] }
  journeyDate?: string
}

export function TrainBookingPanel({ train, journeyDate }: TrainBookingPanelProps) {
  const [trainClass, setTrainClass] = useState(train.classes[0] || 'SL')
  const [passengers, setPassengers] = useState<TrainPassenger[]>([{ name: '', age: 0, gender: 'U', berthPreference: '' }])
  const [availability, setAvailability] = useState<{ available: number; fare: number; currency: string } | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [idempotencyKey] = useState(() => typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `train-${Date.now()}`)

  useEffect(() => {
    let active = true
    setLoading(true)
    checkTrainAvailability({ trainId: train.id, journeyDate, trainClass, passengers: 1 })
      .then((result) => { if (active) { setAvailability(result); setError(null) } })
      .catch((requestError) => { if (active) setError(requestError instanceof Error ? requestError.message : 'Availability could not be loaded.') })
      .finally(() => { if (active) setLoading(false) })
    return () => { active = false }
  }, [journeyDate, train.id, trainClass])

  const amount = availability?.fare || 0

  return (
    <div className="mt-8 border-t border-[var(--color-border-light)] pt-6">
      <div className="grid gap-3 sm:grid-cols-3">
        <label className="text-sm font-medium text-[var(--color-text-secondary)]">
          Class
          <select value={trainClass} onChange={(event) => setTrainClass(event.target.value)} className="mt-1 h-10 w-full rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] px-3 text-[var(--color-text-primary)]">
            {train.classes.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
        </label>
        {passengers.map((passenger, index) => <div key={index} className="contents">
          <label className="text-sm font-medium text-[var(--color-text-secondary)] sm:col-span-2">Passenger {index + 1} name<input value={passenger.name} onChange={(event) => setPassengers((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, name: event.target.value } : item))} placeholder="Full name" className="mt-1 h-10 w-full rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] px-3 text-[var(--color-text-primary)]" /></label>
          <label className="text-sm font-medium text-[var(--color-text-secondary)]">Age<input value={passenger.age || ''} onChange={(event) => setPassengers((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, age: Number(event.target.value) || 0 } : item))} type="number" min="1" max="120" placeholder="Age" className="mt-1 h-10 w-full rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] px-3 text-[var(--color-text-primary)]" /></label>
          <label className="text-sm font-medium text-[var(--color-text-secondary)]">Gender<select value={passenger.gender} onChange={(event) => setPassengers((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, gender: event.target.value } : item))} className="mt-1 h-10 w-full rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] px-3 text-[var(--color-text-primary)]"><option value="U">Prefer not to say</option><option value="M">Male</option><option value="F">Female</option></select></label>
          <label className="text-sm font-medium text-[var(--color-text-secondary)] sm:col-span-2">Berth preference<input value={passenger.berthPreference || ''} onChange={(event) => setPassengers((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, berthPreference: event.target.value } : item))} placeholder="Optional" className="mt-1 h-10 w-full rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] px-3 text-[var(--color-text-primary)]" /></label>
        </div>)}
        <Button type="button" variant="outline" size="sm" onClick={() => setPassengers((current) => [...current, { name: '', age: 0, gender: 'U', berthPreference: '' }])}>Add passenger</Button>
      </div>
      <div className="mt-4" aria-live="polite">
        {loading && <p className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]"><Loader2 size={15} className="animate-spin" />Checking seats and fare...</p>}
        {error && <Alert variant="error" title="Availability unavailable" className="mt-3">{error}</Alert>}
          {availability && <p className="text-sm text-[var(--color-text-secondary)]">{availability.available} supplier seats available · {availability.currency} {availability.fare.toFixed(2)}</p>}
      </div>
      {availability ? <TravelRazorpayCheckout itemType="train" itemId={train.id} amount={amount} quantityLabel="Passengers" label={`${train.name} train booking`} initialQuantity={1} showQuantity={false} extraDetails={{ journeyDate, trainClass, passengers, idempotencyKey }} /> : <p className="mt-4 text-sm text-[var(--color-text-secondary)]">Payment is unavailable until an authorized rail provider returns live availability.</p>}
    </div>
  )
}