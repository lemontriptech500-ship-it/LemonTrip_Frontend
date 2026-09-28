'use client'

import React, { useState } from 'react'
import { Plane, Bed, BusFront, TrainFront, Briefcase, FileText } from 'lucide-react'
import { FlightSearchForm } from './FlightSearchForm'
import { HotelSearchForm } from './HotelSearchForm'
import { BusSearchForm } from './BusSearchForm'
import { TrainSearchForm } from './TrainSearchForm'
import { PackageSearchForm } from './PackageSearchForm'
import { VisaSearchForm } from './VisaSearchForm'
import { cn } from '@/lib/utils'

/**
 * TravelSearchWidget
 * ------------------------------------------------------------
 * Glass treatment matching the header:
 *  - Outer card: bg-white/[0.06] + backdrop-blur-md + border-white/10
 *    (same values as the header's glass layer).
 *  - Nudged up with `relative -top-*` so nothing below it shifts.
 *    Increase the value (e.g. -top-12 sm:-top-20) to move it higher.
 *  - Tab strip: light dark-green tint (30%), still see-through.
 *  - Form body: fully transparent so the hero photo shows through.
 *    `[&_label]:text-white/85` turns <label> captions white. If the
 *    FROM / TO / DEPARTURE captions are <span> or <p> in the form
 *    components, they need changing inside those files instead.
 */

const tabItems = [
  { id: 'flights', label: 'Flights', icon: Plane, content: <FlightSearchForm /> },
  { id: 'hotels', label: 'Hotels', icon: Bed, content: <HotelSearchForm /> },
  { id: 'bus', label: 'Buses', icon: BusFront, content: <BusSearchForm /> },
  { id: 'trains', label: 'Trains', icon: TrainFront, content: <TrainSearchForm /> },
  { id: 'packages', label: 'Packages', icon: Briefcase, content: <PackageSearchForm /> },
  { id: 'visa', label: 'Visa', icon: FileText, content: <VisaSearchForm /> },
]

export function TravelSearchWidget() {
  const [activeTab, setActiveTab] = useState('flights')
  const activeItem = tabItems.find((item) => item.id === activeTab)

  return (
    <div className="relative -top-8 mx-auto max-w-[1100px] overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06] shadow-[var(--shadow-xl)] backdrop-blur-md sm:-top-12">
      {/* Tab strip: light green tint, still see-through */}
      <div className="flex items-center gap-1 overflow-x-auto border-b border-white/10 bg-[var(--green-dark)]/30 p-2 hide-scrollbar">
        {tabItems.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'flex shrink-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-semibold transition-all',
                isActive
                  ? 'bg-[var(--color-primary)] text-[var(--green-dark)] shadow-sm'
                  : 'text-white/80 hover:bg-white/10 hover:text-white'
              )}
            >
              <Icon size={16} />
              <span>{tab.label}</span>
            </button>
          )
        })}
      </div>

      {/* Form body: transparent, captions forced white */}
      <div className="bg-transparent p-3 sm:p-5 [&_label]:text-white/85">
        {activeItem?.content}
      </div>
    </div>
  )
}