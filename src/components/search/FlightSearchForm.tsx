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

  const fieldLabelClass = 'mb-1 block text-[11px] font-medium uppercase tracking-wide text-[var(--color-text-muted)] whitespace-nowrap'
  const fieldInputClass =
    'w-full h-11 pl-8 pr-2 rounded-[10px] border border-[var(--color-border)] bg-white text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--green)] transition-colors'

  return (
    <form onSubmit={handleSearch} className="w-full">
      {/* Trip Type */}
      <div className="mb-3 flex items-center gap-2">
        <button
          type="button"
          onClick={() => setTripType('oneway')}
          className={`rounded-full px-3 py-1 text-xs font-semibold transition-all ${
            tripType === 'oneway'
              ? 'bg-[var(--color-primary)] text-[var(--green-dark)]'
              : 'text-[var(--color-text-muted)] hover:text-[var(--green-dark)]'
          }`}
        >
          One Way
        </button>
        <button
          type="button"
          onClick={() => setTripType('roundtrip')}
          className={`rounded-full px-3 py-1 text-xs font-semibold transition-all ${
            tripType === 'roundtrip'
              ? 'bg-[var(--color-primary)] text-[var(--green-dark)]'
              : 'text-[var(--color-text-muted)] hover:text-[var(--green-dark)]'
          }`}
        >
          Round Trip
        </button>
      </div>

      {/* Fields wrap based on the container's actual width, not the
          viewport — one row when there's room (hero widget), two
          rows when there isn't (inside the Modify Search modal) */}
      <div className="flex flex-wrap items-end gap-3">
        {/* FROM */}
        <div className="min-w-[150px] flex-1 basis-[150px]">
          <label className={fieldLabelClass}>From</label>
          <div className="relative">
            <Plane size={14} className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-[var(--green)]" />
            <input
              type="text"
              value={fromCity}
              onChange={(e) => setFromCity(e.target.value)}
              placeholder="Departure City"
              required
              className={fieldInputClass}
            />
          </div>
        </div>

        {/* Swap — one button, always in flow (no viewport-conditional duplicate) */}
        <button
          type="button"
          onClick={swapCities}
          className="mb-[1px] flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--green)] text-white shadow-sm transition-colors hover:bg-[var(--green-2)]"
          aria-label="Swap cities"
        >
          <ArrowRightLeft size={14} />
        </button>

        {/* TO */}
        <div className="min-w-[150px] flex-1 basis-[150px]">
          <label className={fieldLabelClass}>To</label>
          <div className="relative">
            <MapPin size={14} className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-[var(--green)]" />
            <input
              type="text"
              value={toCity}
              onChange={(e) => setToCity(e.target.value)}
              placeholder="Arrival City"
              required
              className={fieldInputClass}
            />
          </div>
        </div>

        {/* DEPARTURE */}
        <div className="min-w-[140px] flex-1 basis-[140px]">
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
        <div className="min-w-[140px] flex-1 basis-[140px]">
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
        <div className="min-w-[150px] flex-1 basis-[150px]">
          <label className={fieldLabelClass}>Travellers &amp; Class</label>
          <div className="relative">
            <select
              defaultValue="1-economy"
              className="h-11 w-full cursor-pointer appearance-none rounded-[10px] border border-[var(--color-border)] bg-white pl-2 pr-7 text-sm text-[var(--color-text-primary)] transition-colors focus:outline-none focus:border-[var(--green)]"
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
          className="flex h-11 shrink-0 items-center justify-center gap-1.5 rounded-[10px] bg-[var(--color-primary)] px-5 text-sm font-bold text-[var(--green-dark)] transition-colors hover:bg-[var(--color-primary-hover)] sm:w-auto"
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