'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Plane, MapPin, Calendar, Users, ArrowRightLeft } from 'lucide-react'
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
    <form onSubmit={handleSearch} className="flex flex-col gap-4">
      {/* Trip Type Toggle */}
      <div className="flex items-center gap-4">
        <label className="flex items-center gap-2 cursor-pointer text-sm font-medium">
          <input
            type="radio"
            name="tripType"
            value="oneway"
            checked={tripType === 'oneway'}
            onChange={() => setTripType('oneway')}
            className="text-[var(--color-primary)] focus:ring-[var(--color-primary)] h-4 w-4"
          />
          One Way
        </label>
        <label className="flex items-center gap-2 cursor-pointer text-sm font-medium">
          <input
            type="radio"
            name="tripType"
            value="roundtrip"
            checked={tripType === 'roundtrip'}
            onChange={() => setTripType('roundtrip')}
            className="text-[var(--color-primary)] focus:ring-[var(--color-primary)] h-4 w-4"
          />
          Round Trip
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
        {/* From / To Wrapper */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4 relative">
          <Input
            name="from"
            label="From"
            placeholder="Departure City"
            leadingIcon={<Plane size={18} />}
            required
          />
          
          {/* Swap Button - Absolute positioning on desktop, hidden on mobile for simplicity or shown between */}
          <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 translate-y-1/4 z-10">
            <button
              type="button"
              className="bg-white border border-[var(--color-border)] rounded-full p-1.5 shadow-sm hover:shadow-md transition-shadow text-[var(--color-primary)]"
              aria-label="Swap origins"
            >
              <ArrowRightLeft size={16} />
            </button>
          </div>

          <Input
            name="to"
            label="To"
            placeholder="Arrival City"
            leadingIcon={<MapPin size={18} />}
            required
          />
        </div>

        {/* Dates */}
        <div className="grid grid-cols-2 gap-4 lg:col-span-2">
          <Input
            name="departureDate"
            type="date"
            label="Departure"
            leadingIcon={<Calendar size={18} />}
            required
          />
          <Input
            name="returnDate"
            type="date"
            label="Return"
            leadingIcon={<Calendar size={18} />}
            disabled={tripType === 'oneway'}
            required={tripType === 'roundtrip'}
          />
        </div>

        {/* Travellers & Class */}
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

      <div className="flex justify-end mt-2">
        <Button type="submit" size="lg" className="w-full md:w-auto px-8">
          Search Flights
        </Button>
      </div>
    </form>
  )
}
