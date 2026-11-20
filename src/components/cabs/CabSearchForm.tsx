'use client'

import { useRouter } from 'next/navigation'
import { CarFront, MapPin, Search } from 'lucide-react'
import { Button, Input } from '@/components/ui'

export function CabSearchForm({ city = '', category = '' }: { city?: string; category?: string }) {
  const router = useRouter()

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const query = new URLSearchParams()
    const nextCity = String(formData.get('city') || '').trim()
    const nextCategory = String(formData.get('category') || '').trim()
    if (nextCity) query.set('city', nextCity)
    if (nextCategory) query.set('category', nextCategory)
    router.push(`/cabs${query.size ? `?${query}` : ''}`)
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)_auto] md:items-end">
      <Input name="city" label="Pickup city" placeholder="e.g. Delhi" defaultValue={city} leadingIcon={<MapPin size={16} />} />
      <label className="flex flex-col gap-2 text-sm font-semibold text-[var(--green-dark)]">
        Cab type
        <span className="relative">
          <CarFront size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
          <select name="category" defaultValue={category} className="min-h-12 w-full rounded-xl border border-[var(--color-border)] bg-white pl-10 pr-4 text-sm outline-none focus:border-[var(--green)] focus:ring-2 focus:ring-[var(--green)]/15">
            <option value="">All cab types</option>
            <option value="Sedan">Sedan</option>
            <option value="SUV">SUV</option>
            <option value="MPV">MPV</option>
            <option value="Luxury">Luxury</option>
          </select>
        </span>
      </label>
      <Button type="submit" size="lg" icon={<Search size={16} />} className="w-full md:w-auto">Find cabs</Button>
    </form>
  )
}
