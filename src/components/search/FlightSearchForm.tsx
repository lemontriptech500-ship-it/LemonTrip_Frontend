'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Plane, MapPin, ArrowRightLeft } from 'lucide-react'
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

  const swapCities = () => {
    setFromCity(toCity)
    setToCity(fromCity)
  }

  return (
    <form onSubmit={handleSearch} className="min-h-[415px] w-full rounded-lg bg-[#063b24] p-3 md:min-h-[253px] lg:min-h-[120px]">
      {/* Trip Type */}
      <div className="flex items-center gap-2 mb-2">
        <button
          type="button"
          onClick={() => setTripType('oneway')}
          className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
            tripType === 'oneway'
              ? 'bg-[#063b24] text-[#FFD21A]'
              : 'bg-[#063b24] text-[#FFD21A] hover:bg-[#0a4b2c]'
          }`}
        >
          One Way
        </button>
        <button
          type="button"
          onClick={() => setTripType('roundtrip')}
          className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
            tripType === 'roundtrip'
              ? 'bg-[#063b24] text-[#FFD21A]'
              : 'bg-[#063b24] text-[#FFD21A] hover:bg-[#0a4b2c]'
          }`}
        >
          Round Trip
        </button>
      </div>

      {/* All fields in one row on desktop, stacked on mobile */}
      <div className="flex flex-col md:flex-row md:items-end gap-2">
        {/* FROM */}
        <div className="flex-1 min-w-0">
          <div className="relative">
            <Plane size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#FFD21A] pointer-events-none" />
            <input
              type="text"
              value={fromCity}
              onChange={(e) => setFromCity(e.target.value)}
              placeholder="Departure City"
              required
              className="w-full h-10 pl-8 pr-2 rounded-[10px] border border-[#063b24]/20 bg-white text-xs text-[#063b24] placeholder:text-[#063b24]/60 focus:outline-none focus:border-[#063b24] transition-colors"
            />
          </div>
        </div>

        {/* Swap - hidden on mobile, visible on md+ */}
        <button
          type="button"
          onClick={swapCities}
          className="hidden md:flex w-7 h-7 rounded-full bg-[#063b24] text-white items-center justify-center shadow-sm hover:bg-[#0d4a2b] transition-colors shrink-0 mb-[1px]"
          aria-label="Swap cities"
        >
          <ArrowRightLeft size={12} />
        </button>

        {/* Mobile swap - inline between inputs on mobile */}
        <div className="flex md:hidden items-center justify-center">
          <button
            type="button"
            onClick={swapCities}
            className="w-7 h-7 rounded-full bg-[#063b24] text-white flex items-center justify-center shadow-sm hover:bg-[#0d4a2b] transition-colors"
            aria-label="Swap cities"
          >
            <ArrowRightLeft size={12} />
          </button>
        </div>

        {/* TO */}
        <div className="flex-1 min-w-0">
          <div className="relative">
            <MapPin size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#FFD21A] pointer-events-none" />
            <input
              type="text"
              value={toCity}
              onChange={(e) => setToCity(e.target.value)}
              placeholder="Arrival City"
              required
              className="w-full h-10 pl-8 pr-2 rounded-[10px] border border-[#063b24]/20 bg-white text-xs text-[#063b24] placeholder:text-[#063b24]/60 focus:outline-none focus:border-[#063b24] transition-colors"
            />
          </div>
        </div>

        {/* DEPARTURE */}
        <div className="flex-1 min-w-0">
          <DatePicker
            value={departureDate}
            onChange={setDepartureDate}
            placeholder="Select date"
            minDate={today}
            required
            theme="dark-green"
          />
        </div>

        {/* RETURN */}
        <div className="flex-1 min-w-0">
          <DatePicker
            value={returnDate}
            onChange={setReturnDate}
            placeholder="Select date"
            minDate={departureDate || today}
            disabled={tripType === 'oneway'}
            required={tripType === 'roundtrip'}
            theme="dark-green"
          />
        </div>

        {/* TRAVELLERS & CLASS */}
        <div className="flex-1 min-w-0">
          <div className="relative">
            <select
              defaultValue="1-economy"
              className="w-full h-10 pl-2 pr-7 rounded-[10px] border border-[#063b24]/20 bg-white text-xs text-[#063b24] appearance-none focus:outline-none focus:border-[#063b24] transition-colors cursor-pointer"
            >
              <option value="1-economy">1 Adult, Economy</option>
              <option value="2-economy">2 Adults, Economy</option>
              <option value="1-business">1 Adult, Business</option>
              <option value="2-business">2 Adults, Business</option>
            </select>
            <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-[#063b24] pointer-events-none" />
          </div>
        </div>

        {/* Search */}
        <button
          type="submit"
          className="w-full md:w-[130px] h-10 rounded-[10px] bg-[#063b24] hover:bg-[#0d4a2b] text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 shrink-0"
        >
          <Plane size={14} />
          Search Flights
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
