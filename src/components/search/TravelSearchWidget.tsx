'use client'

import React from 'react'
import { Plane, Bed, BusFront, TrainFront, Briefcase, FileText } from 'lucide-react'
import { Tabs } from '@/components/ui'
import { FlightSearchForm } from './FlightSearchForm'
import { HotelSearchForm } from './HotelSearchForm'
import { BusSearchForm } from './BusSearchForm'
import { TrainSearchForm } from './TrainSearchForm'
import { PackageSearchForm } from './PackageSearchForm'
import { VisaSearchForm } from './VisaSearchForm'

export function TravelSearchWidget() {
  const tabItems = [
    {
      id: 'flights',
      label: 'Flights',
      icon: <Plane size={18} />,
      content: <FlightSearchForm />,
    },
    {
      id: 'hotels',
      label: 'Hotels',
      icon: <Bed size={18} />,
      content: <HotelSearchForm />,
    },
    {
      id: 'bus',
      label: 'Buses',
      icon: <BusFront size={18} />,
      content: <BusSearchForm />,
    },
    {
      id: 'trains',
      label: 'Trains',
      icon: <TrainFront size={18} />,
      content: <TrainSearchForm />,
    },
    {
      id: 'packages',
      label: 'Packages',
      icon: <Briefcase size={18} />,
      content: <PackageSearchForm />,
    },
    {
      id: 'visa',
      label: 'Visa',
      icon: <FileText size={18} />,
      content: <VisaSearchForm />,
    },
  ]

  return (
    <div className="bg-white rounded-[var(--radius-xl)] shadow-xl border border-[var(--color-border)] overflow-hidden w-full max-w-5xl mx-auto">
      <Tabs
        items={tabItems}
        defaultTabId="flights"
        className="w-full"
        tabListClassName="px-4 sm:px-6 pt-2 bg-[var(--color-surface-secondary)]"
        tabContentClassName="p-4 sm:p-6 lg:p-8"
      />
    </div>
  )
}
