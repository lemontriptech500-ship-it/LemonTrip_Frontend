'use client'

import { useState } from 'react'
import { ArrowLeft, ArrowRight, CalendarDays, Clock3, MapPin, UsersRound } from 'lucide-react'
import { Button, Card, Input } from '@/components/ui'
import { BookingProgress } from '@/components/booking/BookingProgress'
import { TravelRazorpayCheckout } from '@/components/booking/TravelRazorpayCheckout'
import type { CabOption } from '@/services/cabService'

type JourneyDetails = {
  pickupAddress: string
  dropoffAddress: string
  travelDate: string
  pickupTime: string
  returnDate: string
  distanceKm: string
  passengerCount: string
  passengerName: string
  tripType: 'one_way' | 'round_trip'
}

const STEPS = [
  { id: 'journey', label: 'Journey' },
  { id: 'passenger', label: 'Passenger' },
  { id: 'payment', label: 'Payment' },
  { id: 'confirmation', label: 'Confirmation' },
]

const money = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 })

export function CabBookingPanel({ cab }: { cab: CabOption }) {
  const [journey, setJourney] = useState<JourneyDetails>({
    pickupAddress: '',
    dropoffAddress: '',
    travelDate: '',
    pickupTime: '',
    returnDate: '',
    distanceKm: '',
    passengerCount: '1',
    passengerName: '',
    tripType: 'one_way',
  })
  const [step, setStep] = useState<'journey' | 'payment'>('journey')

  const distance = Number(journey.distanceKm)
  const totalDistance = distance * (journey.tripType === 'round_trip' ? 2 : 1)
  const includedKm = Number(cab.includedKm || 0)
  const billableKm = Math.max(0, totalDistance - includedKm)
  const fare = Math.round(Number(cab.baseFare) + billableKm * Number(cab.pricePerKm))

  function update<K extends keyof JourneyDetails>(field: K, value: JourneyDetails[K]) {
    setJourney((current) => ({ ...current, [field]: value }))
  }

  function continueToPayment(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStep('payment')
  }

  return (
    <Card className="sticky top-24 p-5 shadow-[var(--shadow-md)] sm:p-6">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--green-2)]">Book your ride</p>
      <h2 className="mt-1 text-xl font-bold text-[var(--green-dark)]">{cab.name}</h2>
      <BookingProgress currentStep={step} steps={STEPS} className="py-5" />

      {step === 'journey' ? (
        <form onSubmit={continueToPayment} className="space-y-4">
          <div className="grid grid-cols-2 gap-2" role="group" aria-label="Journey type">
            {(['one_way', 'round_trip'] as const).map((tripType) => (
              <button key={tripType} type="button" onClick={() => update('tripType', tripType)} aria-pressed={journey.tripType === tripType}
                className={`min-h-11 rounded-xl border px-3 text-sm font-semibold transition ${journey.tripType === tripType ? 'border-[var(--green)] bg-[#edf5ef] text-[var(--green-dark)]' : 'border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--green)]'}`}>
                {tripType === 'one_way' ? 'One way' : 'Round trip'}
              </button>
            ))}
          </div>

          <Input label="Pickup address" placeholder="Hotel, airport, or street address" value={journey.pickupAddress} onChange={(event) => update('pickupAddress', event.target.value)} leadingIcon={<MapPin size={16} />} minLength={5} maxLength={300} required />
          <Input label="Drop-off address" placeholder="Where should the cab take you?" value={journey.dropoffAddress} onChange={(event) => update('dropoffAddress', event.target.value)} leadingIcon={<MapPin size={16} />} minLength={5} maxLength={300} required />

          <div className="grid grid-cols-2 gap-3">
            <Input label="Pickup date" type="date" min={new Date().toLocaleDateString('en-CA')} value={journey.travelDate} onChange={(event) => update('travelDate', event.target.value)} leadingIcon={<CalendarDays size={16} />} required />
            <Input label="Pickup time" type="time" value={journey.pickupTime} onChange={(event) => update('pickupTime', event.target.value)} leadingIcon={<Clock3 size={16} />} required />
          </div>
          {journey.tripType === 'round_trip' && <Input label="Return date" type="date" min={journey.travelDate || undefined} value={journey.returnDate} onChange={(event) => update('returnDate', event.target.value)} leadingIcon={<CalendarDays size={16} />} required />}

          <div className="grid grid-cols-2 gap-3">
            <Input label="Approx. distance (km)" type="number" min="1" max="3000" step="1" placeholder="e.g. 18" value={journey.distanceKm} onChange={(event) => update('distanceKm', event.target.value)} required />
            <label className="flex flex-col gap-1.5 text-sm font-medium text-[var(--color-text-primary)]">
              Passengers
              <span className="relative flex items-center">
                <UsersRound size={16} className="pointer-events-none absolute left-3 text-[var(--color-text-muted)]" />
                <select className="h-11 w-full rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] pl-10 pr-3 text-sm" value={journey.passengerCount} onChange={(event) => update('passengerCount', event.target.value)}>
                  {Array.from({ length: cab.passengerCapacity }, (_, index) => <option key={index + 1} value={index + 1}>{index + 1}</option>)}
                </select>
              </span>
            </label>
          </div>

          <Input label="Lead passenger name" autoComplete="name" placeholder="Full name" value={journey.passengerName} onChange={(event) => update('passengerName', event.target.value)} minLength={2} maxLength={120} required />

          <div className="rounded-xl bg-[var(--color-background-soft)] p-4">
            <div className="flex items-start justify-between gap-3">
              <div><p className="text-sm font-semibold text-[var(--green-dark)]">Estimated fare</p><p className="mt-1 text-xs text-[var(--color-text-secondary)]">{money.format(Number(cab.baseFare))} base + {billableKm || 0} km × {money.format(Number(cab.pricePerKm))}</p></div>
              <p className="text-lg font-bold text-[var(--green-dark)]">{money.format(Number.isFinite(fare) ? fare : Number(cab.baseFare))}</p>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-[var(--color-text-secondary)]">Distance is your estimate. The server recalculates the amount from the cab’s listed rates before payment.</p>
          </div>

          <Button type="submit" className="w-full" icon={<ArrowRight size={16} />} iconPosition="right">Continue to passenger details</Button>
        </form>
      ) : (
        <div>
          <div className="mb-4 rounded-xl bg-[var(--color-background-soft)] p-4 text-sm">
            <p className="font-semibold text-[var(--green-dark)]">{journey.pickupAddress} → {journey.dropoffAddress}</p>
            <p className="mt-1 text-[var(--color-text-secondary)]">{journey.travelDate} at {journey.pickupTime} · {journey.passengerCount} passenger{journey.passengerCount === '1' ? '' : 's'}</p>
          </div>
          <p className="text-sm text-[var(--color-text-secondary)]">Add your email and phone below for booking updates.</p>
          <TravelRazorpayCheckout
            itemType="cab"
            itemId={cab.id}
            amount={fare}
            currency="INR"
            label={`${cab.name} · ${cab.city}`}
            quantityLabel="Passengers"
            showQuantity={false}
            showPaymentMethod={false}
            extraDetails={{ ...journey, cabName: cab.name, cabCategory: cab.category, city: cab.city }}
          />
          <Button type="button" variant="ghost" size="sm" icon={<ArrowLeft size={15} />} onClick={() => setStep('journey')}>Edit journey</Button>
        </div>
      )}
    </Card>
  )
}
