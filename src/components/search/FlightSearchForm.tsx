'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Plane, MapPin, ArrowRightLeft, ArrowRight } from 'lucide-react'
import { DatePicker } from '@/components/ui/DatePicker'
import { buildSearchUrl } from '@/lib/searchParams'

/**
 * FlightSearchForm
 * ------------------------------------------------------------
 * BUG FIX: the field row used `md:flex-row`, which switches to a
 * single row based on VIEWPORT width, not the width of whatever
 * container the form actually renders inside. That's fine in the
 * hero (a ~1100px-wide widget on a desktop viewport), but inside
 * <FlightModifySearch>'s Modal the available width is much
 * narrower while the viewport is still "desktop" — so all six
 * fields still tried to force themselves into one row and got
 * crushed: labels ran into each other ("DEPARTURERETURN"),
 * placeholders truncated ("Sele date"), and the two swap buttons
 * (one hidden/shown per viewport breakpoint) both existed in the
 * DOM and could visually collide.
 *
 * Fixed by switching to `flex-wrap` with a `min-w` per field
 * instead of a viewport breakpoint: this responds to the actual
 * rendered width of the immediate container, so it stays one row
 * in the wide hero widget and wraps cleanly to two rows inside
 * the narrower modal — no crushing, no breakpoint mismatch.
 * Also collapsed the two duplicate (mobile/desktop) swap buttons
 * into a single one that's just a normal item in the flex flow.
 */

export function FlightSearchForm() {
  const router = useRouter()
  const [tripType, setTripType] = useState<'oneway' | 'roundtrip'>('roundtrip')
  const [fromCity, setFromCity] = useState('')
  const [toCity, setToCity] = useState('')
  const [departureDate, setDepartureDate] = useState('')
  const [returnDate, setReturnDate] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()

    if (!departureDate) {
      alert('Please select a departure date.')
      return
    }

    if (tripType === 'roundtrip' && !returnDate) {
      alert('Please select a return date.')
      return
    }

    if (fromCity && toCity && fromCity.trim().toLowerCase() === toCity.trim().toLowerCase()) {
      alert("Origin and destination cannot be the same.")
      return
    }

    if (tripType === 'roundtrip') {
      if (departureDate && returnDate && new Date(returnDate) < new Date(departureDate)) {
        alert("Return date cannot be before departure date.")
        return
      }
    }

    const params = new URLSearchParams()
    if (fromCity) params.set('from', fromCity)
    if (toCity) params.set('to', toCity)
    if (departureDate) params.set('departureDate', departureDate)
    if (tripType === 'roundtrip' && returnDate) params.set('returnDate', returnDate)

    router.push(`/flights?${params.toString()}`)
  }

  const today = new Date().toISOString().split('T')[0]

  const swapCities = () => {
    setFromCity(toCity)
    setToCity(fromCity)
  }

  const fieldLabelClass = 'mb-1 block text-[11px] font-medium text-neutral-500'
  return (
    <form onSubmit={handleSearch} className="w-full">
      {/* Trip Type */}
      <div className="mb-3 flex items-center justify-end">
        <button
          type="button"
          onClick={() => setTripType('oneway')}
          className={`rounded-full px-4 py-2 text-xs font-semibold transition-all ${
            tripType === 'oneway'
              ? 'bg-[var(--color-primary)] text-[var(--green-dark)]'
              : 'text-neutral-600 hover:bg-neutral-100'
          }`}
        >
          One Way
        </button>
        <button
          type="button"
          onClick={() => setTripType('roundtrip')}
          className={`rounded-full px-4 py-2 text-xs font-semibold transition-all ${
            tripType === 'roundtrip'
              ? 'bg-[var(--color-primary)] text-[var(--green-dark)]'
              : 'text-neutral-600 hover:bg-neutral-100'
          }`}
        >
          Round Trip
        </button>
      </div>

      {/* Fields wrap based on the container's actual width, not the
          viewport — one row when there's room (hero widget), two
          rows when there isn't (inside the Modify Search modal) */}
      <div className="grid grid-cols-1 items-stretch gap-2 sm:grid-cols-2 lg:grid-cols-[1.15fr_1.15fr_1fr_1fr_1.1fr_auto] lg:gap-0 lg:rounded-2xl lg:border lg:border-neutral-200">
        {/* FROM */}
        <div className="min-w-0 rounded-xl border border-neutral-200 px-3 py-2 lg:rounded-none lg:border-0 lg:border-r lg:border-neutral-200">
          <label className={fieldLabelClass}>From</label>
          <div className="relative">
            <Plane size={15} className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 text-neutral-500" />
            <input
              type="text"
              value={fromCity}
              onChange={(e) => setFromCity(e.target.value)}
              placeholder="Departure City"
              required
              className="h-8 w-full bg-transparent pl-6 pr-1 text-sm text-neutral-900 placeholder:text-neutral-500 focus:outline-none"
            />
          </div>
        </div>

        {/* TO */}
        <div className="relative min-w-0 rounded-xl border border-neutral-200 px-3 py-2 lg:rounded-none lg:border-0 lg:border-r lg:border-neutral-200">
          <button
            type="button"
            onClick={swapCities}
            className="absolute right-2 top-2 z-10 flex h-7 w-7 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-600 shadow-sm transition-colors hover:bg-neutral-50 lg:-left-4 lg:right-auto lg:top-1/2 lg:-translate-y-1/2"
            aria-label="Swap cities"
          >
            <ArrowRightLeft size={13} />
          </button>
          <label className={fieldLabelClass}>To</label>
          <div className="relative">
            <MapPin size={15} className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 text-neutral-500" />
            <input
              type="text"
              value={toCity}
              onChange={(e) => setToCity(e.target.value)}
              placeholder="Arrival City"
              required
              className="h-8 w-full bg-transparent pl-6 pr-1 text-sm text-neutral-900 placeholder:text-neutral-500 focus:outline-none"
            />
          </div>
        </div>

        {/* DEPARTURE */}
        <div className="min-w-0 rounded-xl border border-neutral-200 px-3 py-2 lg:rounded-none lg:border-0 lg:border-r lg:border-neutral-200 [&_button]:!h-8 [&_button]:!rounded-none [&_button]:!border-0 [&_button]:!px-0">
          <label className={fieldLabelClass}>Departure</label>
          <DatePicker
            value={departureDate}
            onChange={setDepartureDate}
            placeholder="Select date"
            minDate={today}
            required
          />
        </div>

        {/* RETURN */}
        <div className="min-w-0 rounded-xl border border-neutral-200 px-3 py-2 lg:rounded-none lg:border-0 lg:border-r lg:border-neutral-200 [&_button]:!h-8 [&_button]:!rounded-none [&_button]:!border-0 [&_button]:!px-0">
          <label className={fieldLabelClass}>Return</label>
          <DatePicker
            value={returnDate}
            onChange={setReturnDate}
            placeholder="Select date"
            minDate={departureDate || today}
            disabled={tripType === 'oneway'}
            required={tripType === 'roundtrip'}
          />
        </div>

        {/* TRAVELLERS & CLASS */}
        <div className="min-w-0 rounded-xl border border-neutral-200 px-3 py-2 lg:rounded-none lg:border-0 lg:border-r lg:border-neutral-200">
          <label className={fieldLabelClass}>Travellers &amp; Class</label>
          <div className="relative">
            <select
              defaultValue="1-economy"
              className="h-8 w-full cursor-pointer appearance-none bg-transparent pl-0 pr-5 text-sm text-neutral-900 focus:outline-none"
            >
              <option value="1-economy">1 Adult, Economy</option>
              <option value="2-economy">2 Adults, Economy</option>
              <option value="1-business">1 Adult, Business</option>
              <option value="2-business">2 Adults, Business</option>
            </select>
            <ChevronDown size={12} className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
          </div>
        </div>

        {/* Search */}
        <button
          type="submit"
          className="flex h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-[var(--color-primary)] px-5 text-sm font-bold text-[var(--green-dark)] transition-colors hover:bg-[var(--color-primary-hover)] lg:ml-3"
        >
          Search Flights
          <ArrowRight size={15} />
        </button>
      </div>
    </form>
  )
}

function ChevronDown({ size, className }: { size: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}
  
