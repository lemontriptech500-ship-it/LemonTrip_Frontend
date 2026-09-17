'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { MapPin, Calendar, ArrowRight } from 'lucide-react'
import { Input, Button, Select } from '@/components/ui'
import { buildSearchUrl } from '@/lib/searchParams'

/**
 * PackageSearchForm
 * ------------------------------------------------------------
 * Same pass as the other forms: dark box wrapper removed,
 * `theme="dark-green"` dropped, submit button gets a trailing
 * arrow to match "Explore Packages →".
 */

export function PackageSearchForm() {
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget as HTMLFormElement)
    const url = buildSearchUrl('/packages', formData)
    router.push(url)
  }

  return (
    <form onSubmit={handleSearch} className="flex w-full flex-col gap-4 lg:grid lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-3">
      <div className="grid min-w-0 grid-cols-1 items-end gap-4 md:grid-cols-3">
        <Input
          name="destination"
          label="Destination"
          placeholder="Where do you want to go?"
          leadingIcon={<MapPin size={16} />}
          required
        />

        <Input
          name="travelMonth"
          type="month"
          label="Travel Month"
          leadingIcon={<Calendar size={16} />}
          required
        />

        <Select name="travellers" label="Travellers" defaultValue="2">
          <option value="1">1 Traveller</option>
          <option value="2">2 Travellers</option>
          <option value="3">3 Travellers</option>
          <option value="4+">4+ Travellers</option>
        </Select>
      </div>

      <div className="flex justify-end">
        <Button type="submit" size="lg" icon={<ArrowRight size={16} />} iconPosition="right" className="w-full px-5 md:w-auto">
          Explore Packages
        </Button>
      </div>
    </form>
  )
}