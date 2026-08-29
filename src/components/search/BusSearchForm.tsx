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
    <form onSubmit={handleSearch} className="flex flex-col gap-5">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end relative">
        <Input
          name="from"
          label="From"
          placeholder="Leaving from"
          leadingIcon={<MapPin size={16} />}
          required
        />

        <div className="hidden md:flex absolute left-1/3 top-1/2 -translate-x-1/2 translate-y-1/4 z-10">
          <button
            type="button"
            className="bg-[var(--color-primary)] text-white rounded-full p-2 shadow-md hover:bg-[var(--color-primary-hover)] transition-colors"
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
        <Button type="submit" size="lg" className="w-full md:w-auto px-10">
          Search Buses
        </Button>
      </div>
    </form>
  )
}
