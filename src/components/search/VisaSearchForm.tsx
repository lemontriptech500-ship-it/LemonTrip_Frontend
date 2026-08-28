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
    <form onSubmit={handleSearch} className="flex flex-col gap-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
        <Input
          name="destinationCountry"
          label="Destination Country"
          placeholder="Where are you travelling to?"
          leadingIcon={<Globe size={18} />}
          required
        />

        <Select
          name="visaType"
          label="Visa Type"
          defaultValue="tourist"
        >
          <option value="tourist">Tourist Visa</option>
          <option value="business">Business Visa</option>
          <option value="transit">Transit Visa</option>
          <option value="student">Student Visa</option>
        </Select>
      </div>

      <div className="flex justify-end mt-2">
        <Button type="submit" size="lg" className="w-full md:w-auto px-8">
          Check Requirements
        </Button>
      </div>
    </form>
  )
}
