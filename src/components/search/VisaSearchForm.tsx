'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { Globe, FileText } from 'lucide-react'
import { Input, Button, Select } from '@/components/ui'
import { buildSearchUrl } from '@/lib/searchParams'

export function VisaSearchForm() {
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget as HTMLFormElement)
    const url = buildSearchUrl('/visa', formData)
    router.push(url)
  }

  return (
    <form onSubmit={handleSearch} className="flex min-h-[415px] w-full flex-col justify-between gap-3 rounded-lg bg-[#063b24] p-3 md:min-h-[253px] md:gap-4 md:p-4 lg:grid lg:min-h-[120px] lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-2 lg:p-3">
      <div className="grid min-w-0 grid-cols-1 items-end gap-3 md:grid-cols-2 md:gap-4">
        <Input
          name="destinationCountry"
          label="Destination Country"
          placeholder="Where are you travelling to?"
          leadingIcon={<Globe size={16} />}
          required
          theme="dark-green"
        />

        <Select
          name="visaType"
          label="Visa Type"
          defaultValue="tourist"
          theme="dark-green"
        >
          <option value="tourist">Tourist Visa</option>
          <option value="business">Business Visa</option>
          <option value="transit">Transit Visa</option>
          <option value="student">Student Visa</option>
        </Select>
      </div>

      <div className="flex justify-end lg:pb-0.5">
        <Button type="submit" size="lg" className="w-full px-5 md:w-auto lg:px-4">
          Check Requirements
        </Button>
      </div>
    </form>
  )
}
