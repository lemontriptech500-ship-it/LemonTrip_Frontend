import React from 'react'
import Image from 'next/image'
import { Container, SectionHeading, Card } from '@/components/ui'
import { featuredOffers } from '@/data/offers'
import { Tag } from 'lucide-react'

export function FeaturedOffers() {
  return (
    <section className="section-gap bg-[var(--color-background)]">
      <Container>
        <SectionHeading 
          title="Exclusive Offers" 
          description="Save on your next journey with these limited-time deals."
          action={{ label: 'View All Offers', href: '/offers' }}
        />

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {featuredOffers.map((offer) => (
            <Card 
              key={offer.id} 
              hover 
              shadow="sm"
              className="flex flex-col h-full overflow-hidden"
            >
              <div className={`relative h-36 w-full overflow-hidden ${offer.imageColor}`}>
                {offer.imageUrl ? (
                  <Image src={offer.imageUrl} alt="" fill sizes="(max-width: 768px) 100vw, 25vw" className="object-cover" />
                ) : (
                  <Tag className="absolute inset-0 m-auto text-[var(--color-text-muted)]" size={40} aria-hidden="true" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(44,62,80,0.30)] to-transparent" />
              </div>
              
              <div className="p-4 flex flex-col flex-grow">
                <span className="text-label text-[var(--color-primary)] mb-1.5">
                  {offer.category}
                </span>
                <h3 className="text-h4 mb-1.5">{offer.title}</h3>
                <p className="text-body-sm text-[var(--color-text-secondary)] mb-3 flex-grow">
                  {offer.description}
                </p>
                
                {offer.code && (
                  <div className="mt-auto bg-[var(--color-surface-secondary)] p-2 rounded-[var(--radius-sm)] border border-dashed border-[var(--color-border)] flex items-center justify-between">
                    <span className="text-caption text-[var(--color-text-muted)]">Code:</span>
                    <span className="font-mono font-bold text-xs text-[var(--color-text-primary)]">{offer.code}</span>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  )
}
