'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { MapPin, Calendar, ArrowRightLeft } from 'lucide-react'
import { Input, Button } from '@/components/ui'
import { buildSearchUrl } from '@/lib/searchParams'

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
    <form onSubmit={handleSearch} className="flex min-h-[415px] w-full flex-col justify-between gap-3 rounded-lg bg-[#063b24] p-3 md:min-h-[253px] md:gap-4 md:p-4 lg:grid lg:min-h-[120px] lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-2 lg:p-3">
      <div className="relative grid min-w-0 grid-cols-1 items-end gap-3 md:grid-cols-3 md:gap-4">
        <Input
          name="from"
          label="From"
          placeholder="Leaving from"
          leadingIcon={<MapPin size={16} />}
          required
          theme="dark-green"
        />

        <div className="hidden md:flex absolute left-1/3 top-1/2 -translate-x-1/2 translate-y-1/4 z-10">
          <button
            type="button"
            className="bg-[var(--color-primary)] text-[var(--color-text-primary)] rounded-full p-2 shadow-md hover:bg-[var(--color-primary-hover)] transition-colors"
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
          theme="dark-green"
        />

        <Input
          name="travelDate"
          type="date"
          label="Travel Date"
          leadingIcon={<Calendar size={16} />}
          required
          theme="dark-green"
        />
      </div>

      <div className="flex justify-end lg:pb-0.5">
        <Button type="submit" size="lg" className="w-full px-5 md:w-auto lg:px-4">
          Search Buses
        </Button>
      </div>
    </form>
  )
}
