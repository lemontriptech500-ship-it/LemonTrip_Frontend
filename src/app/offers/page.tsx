'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowRight, CalendarDays, Tag } from 'lucide-react'
import { Button, Card, Container } from '@/components/ui'
import { FlightPageHero, PAGE_HERO_IMAGES } from '@/components/flights/FlightPageHero'
import { featuredOffers } from '@/data/offers'

export default function OffersPage() {
  return (
    <div className="bg-[var(--color-background)] pb-20">
      <FlightPageHero
        compact
        backgroundImage={PAGE_HERO_IMAGES.offer}
        title="Offers"
        subtitle="Discover current promotions across flights, stays, packages, and visa support."
      />
      <Container className="pt-10">
        <div className="grid items-stretch gap-5 md:grid-cols-2 xl:grid-cols-4">
          {featuredOffers.map((offer) => (
            <Card key={offer.id} className="group flex h-full flex-col overflow-hidden" hover padding="none">
              <div className={`relative h-44 overflow-hidden ${offer.imageColor}`}>
                {offer.imageUrl ? (
                  <img src={offer.imageUrl} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                ) : (
                  <Tag className="absolute inset-0 m-auto text-[var(--color-text-muted)]" size={40} aria-hidden="true" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#062d1b]/75 via-transparent to-black/10" />
                <span className="absolute left-4 top-4 rounded-full border border-white/25 bg-[#063b24]/75 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur-sm">
                  {offer.category}
                </span>
                {offer.discount && (
                  <span className="absolute bottom-4 right-4 rounded-md bg-[var(--yellow)] px-3 py-1.5 text-xs font-extrabold text-[var(--green-dark)] shadow-sm">
                    {offer.discount}
                  </span>
                )}
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h2 className="line-clamp-2 text-h4 leading-snug">{offer.title}</h2>
                <p className="mt-2 line-clamp-3 text-body-sm text-[var(--color-text-secondary)]">{offer.description}</p>
                {offer.code && (
                  <div className="mt-4 flex items-center justify-between gap-2 rounded-md border border-dashed border-[var(--color-border-strong)] bg-[var(--color-background-soft)] px-3 py-2">
                    <span className="text-[10px] font-semibold uppercase tracking-wide text-[var(--color-text-muted)]">Use code</span>
                    <span className="font-mono text-sm font-bold text-[var(--green-dark)]">{offer.code}</span>
                  </div>
                )}
                <div className="mt-auto flex items-center justify-between gap-2 pt-4">
                  {offer.validTill && (
                    <span className="inline-flex items-center gap-1.5 text-[11px] text-[var(--color-text-muted)]">
                      <CalendarDays size={13} aria-hidden="true" />
                      Until {new Date(`${offer.validTill}T00:00:00`).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                    </span>
                  )}
                  <Button className="ml-auto" size="sm" variant="outline" icon={<ArrowRight size={14} />} iconPosition="right" asChild>
                    <Link href={`/offers/${offer.id}`}>View offer</Link>
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
        <p className="mt-6 text-sm text-[var(--color-text-muted)]">Promotions shown are mock content for frontend development.</p>
      </Container>
    </div>
  )
}