'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Plane, MapPin, ArrowRightLeft } from 'lucide-react'
import { Button, Select } from '@/components/ui'
import { DatePicker } from '@/components/ui/DatePicker'
import { buildSearchUrl } from '@/lib/searchParams'

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

  return (
    <form onSubmit={handleSearch} className="flex flex-col gap-5">
      {/* Trip Type Toggle */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setTripType('oneway')}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
            tripType === 'oneway'
              ? 'bg-[var(--color-primary)] text-white shadow-sm'
              : 'bg-[var(--color-surface-secondary)] text-[var(--color-text-secondary)] hover:bg-[var(--color-border-light)]'
          }`}
        >
          One Way
        </button>
        <button
          type="button"
          onClick={() => setTripType('roundtrip')}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
            tripType === 'roundtrip'
              ? 'bg-[var(--color-primary)] text-white shadow-sm'
              : 'bg-[var(--color-surface-secondary)] text-[var(--color-text-secondary)] hover:bg-[var(--color-border-light)]'
          }`}
        >
          Round Trip
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4 relative">
          <div className="flex flex-col gap-1.5">
            <label className="text-label text-[var(--color-text-primary)]">From</label>
            <div className="relative">
              <Plane size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
              <input
                type="text"
                value={fromCity}
                onChange={(e) => setFromCity(e.target.value)}
                placeholder="Departure City"
                required
                className="w-full h-11 pl-10 pr-3 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]/20 focus-visible:border-[var(--color-primary)] hover:border-[var(--color-border-strong)] transition-all"
              />
            </div>
          </div>

          <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 translate-y-1/4 z-10">
            <button
              type="button"
              onClick={() => {
                const temp = fromCity
                setFromCity(toCity)
                setToCity(temp)
              }}
              className="bg-[var(--color-primary)] text-white rounded-full p-2 shadow-md hover:bg-[var(--color-primary-hover)] transition-colors"
              aria-label="Swap origins"
            >
              <ArrowRightLeft size={14} />
            </button>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-label text-[var(--color-text-primary)]">To</label>
            <div className="relative">
              <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
              <input
                type="text"
                value={toCity}
                onChange={(e) => setToCity(e.target.value)}
                placeholder="Arrival City"
                required
                className="w-full h-11 pl-10 pr-3 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]/20 focus-visible:border-[var(--color-primary)] hover:border-[var(--color-border-strong)] transition-all"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 lg:col-span-2">
          <DatePicker
            label="Departure"
            value={departureDate}
            onChange={setDepartureDate}
            placeholder="Select date"
            minDate={today}
            required
          />
          <DatePicker
            label="Return"
            value={returnDate}
            onChange={setReturnDate}
            placeholder="Select date"
            minDate={departureDate || today}
            disabled={tripType === 'oneway'}
            required={tripType === 'roundtrip'}
          />
        </div>

        <Select
          name="travelClass"
          label="Travellers & Class"
          defaultValue="1-economy"
        >
          <option value="1-economy">1 Adult, Economy</option>
          <option value="2-economy">2 Adults, Economy</option>
          <option value="1-business">1 Adult, Business</option>
          <option value="2-business">2 Adults, Business</option>
        </Select>
      </div>

      <div className="flex justify-end">
        <Button type="submit" size="lg" className="w-full md:w-auto px-10">
          Search Flights
        </Button>
      </div>
    </form>
  )
}
