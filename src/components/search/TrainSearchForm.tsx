'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { MapPin, Calendar, ArrowRightLeft, ArrowRight } from 'lucide-react'
import { Input, Button, Select } from '@/components/ui'
import { buildSearchUrl } from '@/lib/searchParams'

/**
 * TrainSearchForm
 * ------------------------------------------------------------
 * Same pass as BusSearchForm: dark box wrapper removed,
 * `theme="dark-green"` dropped from Input/Select, swap button
 * recolored to solid green for consistency with the other forms.
 */

export function TrainSearchForm() {
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

    const url = buildSearchUrl('/trains', formData)
    router.push(url)
  }

  return (
    <form onSubmit={handleSearch} className="flex w-full flex-col gap-4 lg:grid lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-3">
      <div className="relative grid min-w-0 grid-cols-1 items-end gap-4 md:grid-cols-4">
        <div className="relative grid grid-cols-1 gap-4 md:col-span-2 md:grid-cols-2">
          <Input
            name="from"
            label="From"
            placeholder="Leaving from"
            leadingIcon={<MapPin size={16} />}
            required
          />

          <div className="absolute left-1/2 top-1/2 z-10 hidden -translate-x-1/2 translate-y-1/4 md:flex">
            <button
              type="button"
              className="rounded-full bg-[var(--green)] p-2 text-white shadow-md transition-colors hover:bg-[var(--green-2)]"
              aria-label="Swap stations"
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
        </div>

        <Input
          name="journeyDate"
          type="date"
          label="Journey Date"
          leadingIcon={<Calendar size={16} />}
          required
        />

        <Select name="travelClass" label="Travel Class" defaultValue="all">
          <option value="all">All Classes</option>
          <option value="first">First Class</option>
          <option value="second">Second Class</option>
          <option value="sleeper">Sleeper</option>
        </Select>
      </div>

      <div className="flex justify-end">
        <Button type="submit" size="lg" icon={<ArrowRight size={16} />} iconPosition="right" className="w-full px-5 md:w-auto">
          Search Trains
        </Button>
      </div>
    </form>
  )
}