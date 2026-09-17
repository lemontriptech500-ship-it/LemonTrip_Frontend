'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { MapPin, Calendar, ArrowRightLeft, ArrowRight } from 'lucide-react'
import { Input, Button } from '@/components/ui'
import { buildSearchUrl } from '@/lib/searchParams'

/**
 * BusSearchForm
 * ------------------------------------------------------------
 * Restyle: removed the dark green box wrapper and its
 * mobile/desktop min-height rules — those existed to give the
 * dark box a stable shape, which is no longer needed on a plain
 * white background. Dropped `theme="dark-green"` from Input
 * (same assumption as HotelSearchForm — a light default exists;
 * share Input.tsx if not). Swap button recolored from
 * --color-primary/--color-text-primary (yellow bg, dark text) to
 * a solid green circle, matching the swap button style used in
 * the restyled FlightSearchForm for consistency across forms.
 */

export function BusSearchForm() {
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget as HTMLFormElement)
    const from = formData.get('from') as string
    const to = formData.get('to') as string

    if (from && to && from.trim().toLowerCase() === to.trim().toLowerCase()) {
      alert("Origin and destination cannot be the same.")
      return
    }

    const url = buildSearchUrl('/buses', formData)
    router.push(url)
  }

  return (
    <form onSubmit={handleSearch} className="flex w-full flex-col gap-4 lg:grid lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-3">
      <div className="relative grid min-w-0 grid-cols-1 items-end gap-4 md:grid-cols-3">
        <Input
          name="from"
          label="From"
          placeholder="Leaving from"
          leadingIcon={<MapPin size={16} />}
          required
        />

        <div className="absolute left-1/3 top-1/2 z-10 hidden -translate-x-1/2 translate-y-1/4 md:flex">
          <button
            type="button"
            className="rounded-full bg-[var(--green)] p-2 text-white shadow-md transition-colors hover:bg-[var(--green-2)]"
            aria-label="Swap cities"
          >
            <ArrowRightLeft size={14} />
          </button>
        </div>

        <Input
          name="to"
          label="To"
          placeholder="Going to"
          leadingIcon={<MapPin size={16} />}
          required
        />

        <Input
          name="travelDate"
          type="date"
          label="Travel Date"
          leadingIcon={<Calendar size={16} />}
          required
        />
      </div>

      <div className="flex justify-end">
        <Button type="submit" size="lg" icon={<ArrowRight size={16} />} iconPosition="right" className="w-full px-5 md:w-auto">
          Search Buses
        </Button>
      </div>
    </form>
  )
}