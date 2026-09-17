'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Plane, MapPin, ArrowRightLeft, ArrowRight } from 'lucide-react'
import { DatePicker } from '@/components/ui/DatePicker'
import { buildSearchUrl } from '@/lib/searchParams'

/**
 * FlightSearchForm
 * ------------------------------------------------------------
 * Fixes + restyle:
 *  - BUG FIX: the One Way / Round Trip toggle's active and
 *    inactive branches used the exact same classes
 *    (`bg-[#063b24] text-[#FFD21A]` in both), so the selected
 *    state was never visible. Active is now a solid yellow pill
 *    with dark-green text; inactive is muted text with a subtle
 *    hover, on the new white background.
 *  - BUG FIX: field icons were yellow (`#FFD21A`) inside white
 *    inputs — very low contrast. Switched to brand green.
 *  - Removed the dark green box wrapper entirely — this form now
 *    renders on plain white (the shell's tab strip carries the
 *    green), matching the reference's white field row.
 *  - Added a small muted label above each field ("From", "To",
 *    "Departure", "Return", "Travellers & Class"), since the
 *    reference labels fields explicitly rather than relying on
 *    placeholder text alone.
 *  - Search button switched to solid yellow with a trailing
 *    arrow, matching "Search Flights →" in the reference.
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

  const fieldLabelClass = 'mb-1 block text-[11px] font-medium uppercase tracking-wide text-[var(--color-text-muted)]'
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

      {/* All fields in one row on desktop, stacked on mobile */}
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end">
        {/* FROM */}
        <div className="min-w-0 flex-1">
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

        {/* Swap - visible alongside the desktop row */}
        <button
          type="button"
          onClick={swapCities}
          className="mb-[1px] hidden h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--green)] text-white shadow-sm transition-colors hover:bg-[var(--green-2)] lg:flex"
          aria-label="Swap cities"
        >
          <ArrowRightLeft size={14} />
        </button>

        {/* Stacked-layout swap, used on phones and tablets */}
        <div className="flex items-center justify-center lg:hidden">
          <button
            type="button"
            onClick={swapCities}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--green)] text-white shadow-sm transition-colors hover:bg-[var(--green-2)]"
            aria-label="Swap cities"
          >
            <ArrowRightLeft size={14} />
          </button>
        </div>

        {/* TO */}
        <div className="min-w-0 flex-1">
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
        <div className="min-w-0 flex-1">
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
        <div className="min-w-0 flex-1">
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
        <div className="min-w-0 flex-1">
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
          className="flex h-11 w-full shrink-0 items-center justify-center gap-1.5 rounded-[10px] bg-[var(--color-primary)] px-5 text-sm font-bold text-[var(--green-dark)] transition-colors hover:bg-[var(--color-primary-hover)] lg:w-auto"
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
