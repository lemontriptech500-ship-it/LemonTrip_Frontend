'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { MapPin, Calendar, ArrowRightLeft } from 'lucide-react'
import { Input, Button, Select } from '@/components/ui'
import { buildSearchUrl } from '@/lib/searchParams'

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
    <form onSubmit={handleSearch} className="w-full min-h-[150px] rounded-lg bg-[#063b24] p-3 md:p-4 flex flex-col justify-between gap-3 md:gap-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 items-end relative md:gap-4">
        <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4 relative">
          <Input
            name="from"
            label="From"
            placeholder="Leaving from"
            leadingIcon={<MapPin size={16} />}
            required
            theme="dark-green"
          />

          <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 translate-y-1/4 z-10">
            <button
              type="button"
              className="bg-[var(--color-primary)] text-[var(--color-text-primary)] rounded-full p-2 shadow-md hover:bg-[var(--color-primary-hover)] transition-colors"
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
            theme="dark-green"
          />
        </div>

        <Input
          name="journeyDate"
          type="date"
          label="Journey Date"
          leadingIcon={<Calendar size={16} />}
          required
          theme="dark-green"
        />

        <Select
          name="travelClass"
          label="Travel Class"
          defaultValue="all"
          theme="dark-green"
        >
          <option value="all">All Classes</option>
          <option value="first">First Class</option>
          <option value="second">Second Class</option>
          <option value="sleeper">Sleeper</option>
        </Select>
      </div>

      <div className="flex justify-end">
        <Button type="submit" size="lg" className="w-full md:w-auto px-10">
          Search Trains
        </Button>
      </div>
    </form>
  )
}
