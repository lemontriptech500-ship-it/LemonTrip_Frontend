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
    <form onSubmit={handleSearch} className="flex flex-col gap-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end relative">
        <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4 relative">
          <Input
            name="from"
            label="From"
            placeholder="Leaving from"
            leadingIcon={<MapPin size={18} />}
            required
          />
          
          <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 translate-y-1/4 z-10">
            <button
              type="button"
              className="bg-white border border-[var(--color-border)] rounded-full p-1.5 shadow-sm hover:shadow-md transition-shadow text-[var(--color-primary)]"
              aria-label="Swap stations"
            >
              <ArrowRightLeft size={16} />
            </button>
          </div>

          <Input
            name="to"
            label="To"
            placeholder="Going to"
            leadingIcon={<MapPin size={18} />}
            required
          />
        </div>

        <Input
          name="journeyDate"
          type="date"
          label="Journey Date"
          leadingIcon={<Calendar size={18} />}
          required
        />

        <Select
          name="travelClass"
          label="Travel Class"
          defaultValue="all"
        >
          <option value="all">All Classes</option>
          <option value="first">First Class</option>
          <option value="second">Second Class</option>
          <option value="sleeper">Sleeper</option>
        </Select>
      </div>

      <div className="flex justify-end mt-2">
        <Button type="submit" size="lg" className="w-full md:w-auto px-8">
          Search Trains
        </Button>
      </div>
    </form>
  )
}
