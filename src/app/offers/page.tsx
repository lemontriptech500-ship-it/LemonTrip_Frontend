'use client'

import React from 'react'
import Link from 'next/link'
import { Tag } from 'lucide-react'
import { Button, Card, Container, SectionHeading } from '@/components/ui'
import { featuredOffers } from '@/data/offers'

export default function OffersPage() {
  return (
    <div className="section-gap bg-[var(--color-background)]">
      <Container>
        <SectionHeading title="Offers" description="Discover current demo promotions across flights, stays, packages, and visa support." />
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {featuredOffers.map((offer) => <Card key={offer.id} className="overflow-hidden" hover padding="none"><div className={`relative h-44 ${offer.imageColor}`}>{offer.imageUrl ? <img src={offer.imageUrl} alt="" className="h-full w-full object-cover" /> : <Tag className="absolute inset-0 m-auto text-[var(--color-primary)]" size={48} aria-hidden="true" />}<div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" /></div><div className="p-5"><p className="text-xs font-bold uppercase tracking-wider text-[var(--color-primary)]">{offer.category}</p><h2 className="mt-2 font-bold text-[var(--color-text-primary)]">{offer.title}</h2><p className="mt-2 text-sm leading-relaxed text-[var(--color-text-secondary)]">{offer.description}</p>{offer.code && <div className="mt-5 rounded border border-dashed border-[var(--color-border)] bg-[var(--color-surface-secondary)] p-2 text-center font-mono text-sm font-bold text-[var(--color-text-primary)]">{offer.code}</div>}<Button className="mt-5" fullWidth variant="outline" asChild><Link href={`/offers/${offer.id}`}>View offer</Link></Button></div></Card>)}
        </div>
        <p className="mt-8 text-sm text-[var(--color-text-secondary)]">Promotions shown are mock content for frontend development.</p>
      </Container>
    </div>
  )
}
