'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { Globe, ArrowRight } from 'lucide-react'
import { Input, Button, Select } from '@/components/ui'
import { buildSearchUrl } from '@/lib/searchParams'

/**
 * VisaSearchForm
 * ------------------------------------------------------------
 * Same pass as the other forms: dark box wrapper removed,
 * `theme="dark-green"` dropped, submit button gets a trailing
 * arrow to match "Check Requirements →".
 */

export function VisaSearchForm() {
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget as HTMLFormElement)
    const url = buildSearchUrl('/visa', formData)
    router.push(url)
  }

  return (
    <form onSubmit={handleSearch} className="flex w-full flex-col gap-4 lg:grid lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-3">
      <div className="grid min-w-0 grid-cols-1 items-end gap-4 md:grid-cols-2">
        <Input
          name="destinationCountry"
          label="Destination Country"
          placeholder="Where are you travelling to?"
          leadingIcon={<Globe size={16} />}
          required
        />

        <Select name="visaType" label="Visa Type" defaultValue="tourist">
          <option value="tourist">Tourist Visa</option>
          <option value="business">Business Visa</option>
          <option value="transit">Transit Visa</option>
          <option value="student">Student Visa</option>
        </Select>
      </div>

      <div className="flex justify-end">
        <Button type="submit" size="lg" icon={<ArrowRight size={16} />} iconPosition="right" className="w-full px-5 md:w-auto">
          Check Requirements
        </Button>
      </div>
    </form>
  )
}