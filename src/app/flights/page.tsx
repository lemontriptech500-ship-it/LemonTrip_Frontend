'use client'

import React, { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Container, Button } from '@/components/ui'
import { EmptyState } from '@/components/common'
import { Filter } from 'lucide-react'

import { parseFlightSearchParams } from '@/lib/searchParams'
import { MOCK_FLIGHTS } from '@/data/flights'
import { searchFlights } from '@/services/flightService'
import { isApiConfigured } from '@/lib/apiClient'
import { useFlightFilters } from '@/hooks/useFlightFilters'

import { FlightPageHero } from '@/components/flights/FlightPageHero'
import { FlightSearchForm } from '@/components/search/FlightSearchForm'
import { FlightFilters } from '@/components/flights/FlightFilters'
import { FlightResultsHeader } from '@/components/flights/FlightResultsHeader'
import { FlightResultCard } from '@/components/flights/FlightResultCard'
import { FlightResultSkeleton } from '@/components/flights/FlightResultSkeleton'

function FlightResultsContent() {
  const searchParams = useSearchParams()
  const parsedParams = parseFlightSearchParams(searchParams)

  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [flights, setFlights] = useState(MOCK_FLIGHTS)

  const {
    filters,
    updateFilter,
    resetFilters,
    sortOption,
    setSortOption,
    results,
    totalResults,
    filteredCount,
  } = useFlightFilters(flights)

  const availableAirlines = Array.from(new Set(flights.map(f => f.airline)))

  useEffect(() => {
    let active = true
    setIsLoading(true)
    if (!isApiConfigured) {
      const timer = setTimeout(() => active && setIsLoading(false), 800)
      return () => { active = false; clearTimeout(timer) }
    }
    searchFlights({
      from: parsedParams.from,
      to: parsedParams.to,
      departureDate: parsedParams.departureDate,
      returnDate: parsedParams.returnDate,
      class: parsedParams.travelClass,
    }).then((result) => {
      if (active) setFlights(result.flights)
    }).catch(() => {
      if (active) setFlights([])
    }).finally(() => {
      if (active) setIsLoading(false)
    })
    return () => { active = false }
  }, [parsedParams.from, parsedParams.to, parsedParams.departureDate, parsedParams.returnDate, parsedParams.travelClass])

  const heroTitle =
    parsedParams.from && parsedParams.to
      ? `Flights from ${parsedParams.from} to ${parsedParams.to}`
      : 'Find your flight'

  return (
    // NOTE: no `section-gap` here — the hero handles its own top spacing
    <div className="pb-20">
      <FlightPageHero title={heroTitle} subtitle="Compare fares across airlines and book in minutes.">
        {/* Search form lives directly on the page — no modal */}
        <div className="rounded-[var(--radius-xl)] border border-[var(--color-border-light)] bg-white p-4 shadow-lg sm:p-6">
          <FlightSearchForm />
        </div>
      </FlightPageHero>

      <Container className="pt-10">
        <div className="flex flex-col lg:flex-row gap-8">

          <div className="hidden lg:block w-72 shrink-0">
            <FlightFilters
              filters={filters}
              updateFilter={updateFilter}
              resetFilters={resetFilters}
              availableAirlines={availableAirlines}
            />
          </div>

          <div className="lg:hidden flex justify-end">
            <Button variant="outline" size="sm" onClick={() => setIsMobileFiltersOpen(true)} icon={<Filter size={16} />}>
              Filters
            </Button>
          </div>

          <div className="flex-1 min-w-0">
            <FlightResultsHeader
              totalResults={totalResults}
              filteredCount={filteredCount}
              sortOption={sortOption}
              onSortChange={setSortOption}
            />

            <div className="flex flex-col gap-4">
              {isLoading ? (
                <>
                  <FlightResultSkeleton />
                  <FlightResultSkeleton />
                  <FlightResultSkeleton />
                </>
              ) : filteredCount > 0 ? (
                results.map(flight => (
                  <FlightResultCard key={flight.id} flight={flight} />
                ))
              ) : (
                <EmptyState
                  title="No Flights Found"
                  description="We couldn't find any flights matching your current filters. Try adjusting them."
                  action={{ label: "Reset Filters", onClick: resetFilters }}
                />
              )}
            </div>
          </div>
        </div>
      </Container>

      {isMobileFiltersOpen && (
        <div className="fixed inset-0 z-[100] flex bg-[rgba(44,62,80,0.50)] backdrop-blur-sm lg:hidden animate-in fade-in">
          <div className="absolute right-0 top-0 bottom-0 w-[min(300px,calc(100vw-1rem))] bg-[var(--color-surface)] shadow-2xl overflow-y-auto animate-in slide-in-from-right">
            <div className="p-4 border-b border-[var(--color-border)] flex items-center justify-between sticky top-0 bg-[var(--color-surface)] z-10">
              <h2 className="font-bold text-lg text-[var(--color-text-primary)]">Filters</h2>
              <Button variant="ghost" size="sm" onClick={() => setIsMobileFiltersOpen(false)}>Close</Button>
            </div>
            <div className="p-2">
              <FlightFilters
                filters={filters}
                updateFilter={updateFilter}
                resetFilters={resetFilters}
                availableAirlines={availableAirlines}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default function FlightsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading search results...</div>}>
      <FlightResultsContent />
    </Suspense>
  )
}