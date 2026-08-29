'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Plane, MapPin, Calendar, ArrowRightLeft } from 'lucide-react'
import { Input, Button, Select } from '@/components/ui'
import { buildSearchUrl } from '@/lib/searchParams'

export function FlightSearchForm() {
  const router = useRouter()
  const [tripType, setTripType] = useState<'oneway' | 'roundtrip'>('roundtrip')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget as HTMLFormElement)
    const from = formData.get('from') as string
    const to = formData.get('to') as string

    if (from && to && from.trim().toLowerCase() === to.trim().toLowerCase()) {
      alert("Origin and destination cannot be the same.")
      return
    }

    if (tripType === 'roundtrip') {
      const depDate = formData.get('departureDate') as string
      const retDate = formData.get('returnDate') as string
      if (depDate && retDate && new Date(retDate) < new Date(depDate)) {
        alert("Return date cannot be before departure date.")
        return
      }
    } else {
      formData.delete('returnDate')
    }

    const url = buildSearchUrl('/flights', formData)
    router.push(url)
  }

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
          <Input
            name="from"
            label="From"
            placeholder="Departure City"
            leadingIcon={<Plane size={16} />}
            required
          />

          <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 translate-y-1/4 z-10">
            <button
              type="button"
              className="bg-[var(--color-primary)] text-white rounded-full p-2 shadow-md hover:bg-[var(--color-primary-hover)] transition-colors"
              aria-label="Swap origins"
            >
              <ArrowRightLeft size={14} />
            </button>
          </div>

          <Input
            name="to"
            label="To"
            placeholder="Arrival City"
            leadingIcon={<MapPin size={16} />}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4 lg:col-span-2">
          <Input
            name="departureDate"
            type="date"
            label="Departure"
            leadingIcon={<Calendar size={16} />}
            required
          />
          <Input
            name="returnDate"
            type="date"
            label="Return"
            leadingIcon={<Calendar size={16} />}
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
