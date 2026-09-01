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
    <form onSubmit={handleSearch} className="w-full min-h-[150px] rounded-lg bg-[#063b24] p-3 md:p-4 flex flex-col justify-between gap-3 md:gap-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-end md:gap-4">
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

      <div className="flex justify-end">
        <Button type="submit" size="lg" className="w-full md:w-auto px-10">
          Check Requirements
        </Button>
      </div>
    </form>
  )
}
