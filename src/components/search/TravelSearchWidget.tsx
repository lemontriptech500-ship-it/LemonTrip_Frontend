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
 * Restyled the tab strip to match the reference: tabs now sit on
 * a dark green bar with the active tab rendered as a solid yellow
 * pill, instead of a white bar with an underline indicator.
 *
 *  - Outer card corners bumped to rounded-2xl and shadow deepened
 *    to --shadow-xl (this widget floats and overlaps the hero, so
 *    it needs a stronger shadow than an inline element would).
 *  - Removed the border-b divider between the tab strip and the
 *    form content — the green tab bar and whatever the active
 *    form renders now sit flush, like the reference's single
 *    continuous card.
 *  - Active tab: solid yellow pill, dark green text, rounded-full.
 *  - Inactive tabs: white/75 text directly on the green bar
 *    (previously #7A8793 gray on white).
 *
 * NOTE: I don't have FlightSearchForm.tsx / HotelSearchForm.tsx /
 * etc. — the reference's white field row (labeled "From / To /
 * Departure / Return / Travellers & Class" with no pill-shaped
 * inputs) lives inside those files, not here. If you want the
 * fields themselves restyled to match, share FlightSearchForm.tsx
 * and I'll do the same pass on it.
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
<div className="mx-auto max-w-[1100px] overflow-hidden rounded-2xl bg-white shadow-[var(--shadow-xl)]">      <div className="flex items-center gap-1 overflow-x-auto bg-[var(--green-dark)] p-2 hide-scrollbar">
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
                  : 'text-white/75 hover:bg-white/10 hover:text-white'
              )}
            >
              <Icon size={16} />
              <span>{tab.label}</span>
            </button>
          )
        })}
      </div>

      <div className="p-3 sm:p-5">
        {activeItem?.content}
      </div>
    </div>
  )
}