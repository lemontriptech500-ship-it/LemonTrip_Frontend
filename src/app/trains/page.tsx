'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { ArrowRight, Clock, Heart, TrainFront } from 'lucide-react'
import { Button, Card, Container, SectionHeading } from '@/components/ui'
import { mockTrains } from '@/data/trains'
import { searchTrains } from '@/services/trainService'
import { useWishlistStore } from '@/store/wishlistStore'

/**
 * Stopgap: extracts a numeric amount from strings like "From INR 899"
 * so the wishlist/cart have a real number to work with.
 * TODO: replace with a numeric price field from the backend once
 * train_services exposes one, same as hotels.starting_price.
 */
function parseTrainPrice(price: string): number {
  const match = price.match(/[\d,]+/)
  if (!match) return 0
  return Number(match[0].replace(/,/g, '')) || 0
}

function TrainResultsContent() {
  const searchParams = useSearchParams()
  const [trains, setTrains] = useState<typeof mockTrains>(mockTrains)
  const [isLoading, setIsLoading] = useState(true)
  const { toggleItem, isWishlisted, hasHydrated } = useWishlistStore()

  useEffect(() => {
    let active = true
    setIsLoading(true)
    searchTrains({
      from: searchParams.get('from') || undefined,
      to: searchParams.get('to') || undefined,
      date: searchParams.get('journeyDate') || undefined,
      trainClass: searchParams.get('travelClass') || undefined,
    }).then((result) => {
      if (active) setTrains(result.trains)
    }).finally(() => {
      if (active) setIsLoading(false)
    })
    return () => { active = false }
  }, [searchParams])

  return (
    <div className="section-gap bg-[var(--color-background)]">
      <Container>
        <SectionHeading title="Trains" description="Browse sample routes, classes, and departure times." />
        {isLoading ? <p className="mt-10 text-center text-[var(--color-text-secondary)]">Loading trains...</p> : <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {trains.map((train) => {
            const wishlistId = `train-${train.id}`
            const wishlisted = hasHydrated && isWishlisted(wishlistId)

            const handleToggleWishlist = () => {
              toggleItem({
                id: wishlistId,
                type: 'train',
                name: train.name,
                description: `${train.from} → ${train.to} · ${train.departure}–${train.arrival} · Train ${train.number}`,
                price: parseTrainPrice(train.price),
                details: {
                  trainId: train.id,
                  number: train.number,
                  from: train.from,
                  to: train.to,
                },
              })
            }

            return (
              <Card key={train.id} className="relative flex h-full flex-col" hover>
                <button
                  type="button"
                  onClick={handleToggleWishlist}
                  aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                  aria-pressed={wishlisted}
                  className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-muted)] transition hover:border-[var(--color-error)] hover:text-[var(--color-error)]"
                >
                  <Heart size={16} fill={wishlisted ? 'currentColor' : 'none'} className={wishlisted ? 'text-[var(--color-error)]' : ''} />
                </button>

                <div className="flex items-center gap-3 border-b border-[var(--color-border-light)] pb-5 pr-10">
                  <div className="rounded-[var(--radius-md)] bg-[var(--color-primary)] p-3 text-[var(--green-dark)]">
                    <TrainFront size={22} />
                  </div>
                  <div>
                    <h2 className="font-bold text-[var(--color-text-primary)]">{train.name}</h2>
                    <p className="text-sm text-[var(--color-text-secondary)]">Train {train.number}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-3 py-6">
                  <div>
                    <p className="text-xl font-bold text-[var(--color-text-primary)]">{train.departure}</p>
                    <p className="text-sm text-[var(--color-text-secondary)]">{train.from}</p>
                  </div>
                  <div className="flex flex-1 flex-col items-center gap-1 text-xs text-[var(--color-text-secondary)]">
                    <Clock size={14} />
                    <span>{train.duration}</span>
                    <div className="h-px w-full bg-[var(--color-border)]" />
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-[var(--color-text-primary)]">{train.arrival}</p>
                    <p className="text-sm text-[var(--color-text-secondary)]">{train.to}</p>
                  </div>
                </div>

                <div className="mt-auto space-y-4 border-t border-[var(--color-border-light)] pt-5">
                  <div className="flex flex-wrap gap-2">
                    {train.classes.map((item) => (
                      <span key={item} className="rounded-full bg-[var(--color-primary-soft)] px-2.5 py-1 text-xs font-semibold text-[var(--green-dark)]">
                        {item}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-semibold text-[var(--color-text-primary)]">{train.price}</span>
                    <Button variant="outline" size="sm" icon={<ArrowRight size={15} />} asChild>
                      <Link href={`/trains/${train.id}`}>View route</Link>
                    </Button>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>}
        <p className="mt-8 text-sm text-[var(--color-text-secondary)]">Train schedules and availability are supplied by the configured IRCTC adapter.</p>
      </Container>
    </div>
  )
}

export default function TrainsPage() {
  return (
    <React.Suspense fallback={<div className="section-gap min-h-[40vh]" aria-busy="true" />}>
      <TrainResultsContent />
    </React.Suspense>
  )
}