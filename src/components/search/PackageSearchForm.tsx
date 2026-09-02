'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { MapPin, Calendar, Users } from 'lucide-react'
import { Input, Button, Select } from '@/components/ui'
import { buildSearchUrl } from '@/lib/searchParams'

export function PackageSearchForm() {
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget as HTMLFormElement)
    const url = buildSearchUrl('/packages', formData)
    router.push(url)
  }

  return (
    <form onSubmit={handleSearch} className="flex min-h-[415px] w-full flex-col justify-between gap-3 rounded-lg bg-[#063b24] p-3 md:min-h-[253px] md:gap-4 md:p-4 lg:grid lg:min-h-[120px] lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-2 lg:p-3">
      <div className="grid min-w-0 grid-cols-1 items-end gap-3 md:grid-cols-3 md:gap-4">
        <Input
          name="destination"
          label="Destination"
          placeholder="Where do you want to go?"
          leadingIcon={<MapPin size={16} />}
          required
          theme="dark-green"
        />

        <Input
          name="travelMonth"
          type="month"
          label="Travel Month"
          leadingIcon={<Calendar size={16} />}
          required
          theme="dark-green"
        />

        <Select
          name="travellers"
          label="Travellers"
          defaultValue="2"
          theme="dark-green"
        >
          <option value="1">1 Traveller</option>
          <option value="2">2 Travellers</option>
          <option value="3">3 Travellers</option>
          <option value="4+">4+ Travellers</option>
        </Select>
      </div>

      <div className="flex justify-end lg:pb-0.5">
        <Button type="submit" size="lg" className="w-full px-5 md:w-auto lg:px-4">
          Explore Packages
        </Button>
      </div>
    </form>
  )
}
