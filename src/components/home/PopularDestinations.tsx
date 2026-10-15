'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Container } from '@/components/ui'

const filters = ['All places', 'Beach', 'Culture', 'Mountains', 'City breaks']
const places = [
  { name: 'Jaipur', type: 'Culture', label: 'Culture & heritage', image: 'https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?w=900&q=85' },
  { name: 'Goa', type: 'Beach', label: 'Sun, sand & slow days', image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=900&q=85' },
  { name: 'Manali', type: 'Mountains', label: 'Mountains & adventure', image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=900&q=85' },
  { name: 'Singapore', type: 'City breaks', label: 'City escapes', image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=900&q=85' },
]

export function PopularDestinations() {
  const [activeFilter, setActiveFilter] = useState('All places')
  const visiblePlaces = activeFilter === 'All places' ? places : places.filter((place) => place.type === activeFilter)

  return (
    <section id="popular-destinations" aria-labelledby="destinations-title" className="bg-[#07382f] py-10 text-white sm:py-16">
      <Container>
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--yellow)]">Where to next?</p>
            <h2 id="destinations-title" className="mt-3 max-w-2xl font-heading text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl">Places you’ll talk about for years</h2>
            <p className="mt-3 text-sm text-white/65 sm:text-base">From quiet coastlines to electric cities.</p>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-2" aria-label="Filter destinations">
          {filters.map((filter) => (
            <button key={filter} type="button" onClick={() => setActiveFilter(filter)} aria-pressed={activeFilter === filter} className={`min-h-11 rounded-full border px-4 py-2 text-xs font-semibold transition ${activeFilter === filter ? 'border-[var(--yellow)] bg-[var(--yellow)] text-[var(--green-dark)]' : 'border-white/20 text-white/75 hover:border-white/50'}`}>
              {filter}
            </button>
          ))}
        </div>

        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {visiblePlaces.map((place) => (
            <Link key={place.name} href="/packages" className="group relative isolate flex min-h-[260px] min-w-0 overflow-hidden rounded-[22px] sm:min-h-[320px]">
              <Image src={place.image} alt={`${place.name} destination`} fill sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 25vw" className="absolute inset-0 -z-20 object-cover transition duration-700 group-hover:scale-105" />
              <span className="absolute inset-0 -z-10 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />
              <span className="mt-auto p-4 sm:p-5">
                <span className="block text-[9px] font-bold uppercase tracking-[0.12em] text-[var(--yellow)] sm:text-[10px]">{place.label}</span>
                <span className="mt-2 block font-heading text-2xl font-semibold sm:text-3xl">{place.name}</span>
                <span className="mt-2 inline-flex items-center gap-2 text-[11px] text-white/85 sm:text-xs">Explore stays &amp; experiences <ArrowRight size={14} /></span>
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  )
}
