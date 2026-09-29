'use client'

import React, { Suspense, useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Building, Filter } from 'lucide-react'
import { Button, Container } from '@/components/ui'
import { EmptyState } from '@/components/common'
import type { Hotel } from '@/types/hotels'
import { searchHotels } from '@/services/hotelService'
import { useHotelFilters } from '@/hooks/useHotelFilters'
import { getHotelSearchFromUrl, getNightCount } from '@/lib/hotelUtils'
import { HotelPageHero } from '@/components/hotels/HotelPageHero'
import { HotelSearchForm } from '@/components/search/HotelSearchForm' // <-- check this name/path
import { HotelFilters, HotelMobileFilters } from '@/components/hotels/HotelFilters'
import { HotelResultsHeader } from '@/components/hotels/HotelResultsHeader'
import { HotelResultCard } from '@/components/hotels/HotelResultCard'
import { HotelResultSkeleton } from '@/components/hotels/HotelResultSkeleton'

function HotelResultsContent() {
  const searchParams = useSearchParams()
  const searchQuery = searchParams.toString()
  const search = useMemo(() => getHotelSearchFromUrl(new URLSearchParams(searchQuery)), [searchQuery])
  const nights = getNightCount(search.checkIn, search.checkOut)

  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false)

  const [matchedHotels, setMatchedHotels] = useState<Hotel[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let active = true
    setIsLoading(true)
    searchHotels(search)
      .then((result) => {
        if (active) setMatchedHotels(result.hotels)
      })
      .catch(() => {
        if (active) setMatchedHotels([])
      })
      .finally(() => {
        if (active) setIsLoading(false)
      })

    return () => {
      active = false
    }
  }, [search])

  const {
    filters,
    updateFilter,
    resetFilters,
    hasActiveFilters,
    sortOption,
    setSortOption,
    results,
    totalResults,
    filteredCount,
  } = useHotelFilters(matchedHotels)

  // The search form is now on the page, so "modify search" just scrolls to it
  const scrollToSearch = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  const filterProps = {
    filters,
    updateFilter,
    resetFilters,
    hasActiveFilters,
  }

  const heroTitle = search.destination ? `Hotels in ${search.destination}` : 'Find your stay'

  return (
    // No `section-gap`: the hero handles its own top spacing
    <div className="pb-20">
      <HotelPageHero title={heroTitle} subtitle="Compare stays and book the right room in minutes.">
        <div className="rounded-[var(--radius-xl)] border border-[var(--color-border-light)] bg-white p-4 shadow-lg sm:p-6">
          <HotelSearchForm />
        </div>
      </HotelPageHero>

      <Container className="pt-10">
        {isLoading ? (
          <div className="flex flex-col gap-4" aria-busy="true" aria-label="Loading hotel search results">
            <HotelResultSkeleton />
            <HotelResultSkeleton />
          </div>
        ) : totalResults === 0 ? (
          <EmptyState
            title="No stays found"
            description="We couldn't find any hotels right now. Try a destination, or adjust your search."
            icon={<Building />}
            action={{ label: 'Change search', onClick: scrollToSearch }}
          />
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            <aside className="hidden lg:block w-72 shrink-0">
              <HotelFilters {...filterProps} />
            </aside>

            <div className="lg:hidden flex justify-end">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsMobileFiltersOpen(true)}
                icon={<Filter size={16} />}
              >
                Filters
              </Button>
            </div>

            <div className="flex-1 min-w-0">
              <HotelResultsHeader
                totalResults={totalResults}
                filteredCount={filteredCount}
                sortOption={sortOption}
                onSortChange={setSortOption}
              />

              {filteredCount > 0 ? (
                <div className="flex flex-col gap-4">
                  {results.map((hotel) => (
                    <HotelResultCard
                      key={hotel.id}
                      hotel={hotel}
                      nights={nights}
                      search={search}
                    />
                  ))}
                </div>
              ) : (
                <EmptyState
                  title="No hotels match your current filters"
                  description="Try clearing filters or choosing a broader price, rating, or amenity combination."
                  icon={<Building />}
                  action={{ label: 'Clear filters', onClick: resetFilters }}
                />
              )}
            </div>
          </div>
        )}
      </Container>

      <HotelMobileFilters
        isOpen={isMobileFiltersOpen}
        onClose={() => setIsMobileFiltersOpen(false)}
        {...filterProps}
      />
    </div>
  )
}

export default function HotelsPage() {
  return (
    <Suspense
      fallback={
        <div className="pb-20">
          {/* Keep the banner in the fallback so the transparent header is never over a white page */}
          <HotelPageHero title="Find your stay" />
          <Container className="pt-10">
            <div className="flex flex-col gap-4" aria-busy="true" aria-label="Loading hotel search results">
              <HotelResultSkeleton />
              <HotelResultSkeleton />
            </div>
          </Container>
        </div>
      }
    >
      <HotelResultsContent />
    </Suspense>
  )
}