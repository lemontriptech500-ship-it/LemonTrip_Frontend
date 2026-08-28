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
    <form onSubmit={handleSearch} className="flex flex-col gap-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
        <Input
          name="destination"
          label="Destination"
          placeholder="Where do you want to go?"
          leadingIcon={<MapPin size={18} />}
          required
        />

        <Input
          name="travelMonth"
          type="month"
          label="Travel Month"
          leadingIcon={<Calendar size={18} />}
          required
        />

        <Select
          name="travellers"
          label="Travellers"
          defaultValue="2"
        >
          <option value="1">1 Traveller</option>
          <option value="2">2 Travellers</option>
          <option value="3">3 Travellers</option>
          <option value="4+">4+ Travellers</option>
        </Select>
      </div>

      <div className="flex justify-end mt-2">
        <Button type="submit" size="lg" className="w-full md:w-auto px-8">
          Explore Packages
        </Button>
      </div>
    </form>
  )
}
