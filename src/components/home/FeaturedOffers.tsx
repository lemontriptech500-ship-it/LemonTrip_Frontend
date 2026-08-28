import React from 'react'
import { Container, SectionHeading, Card } from '@/components/ui'
import { featuredOffers } from '@/data/offers'
import { Tag } from 'lucide-react'

export function FeaturedOffers() {
  return (
    <section className="section-gap bg-[var(--color-background)]">
      <Container>
        <SectionHeading 
          title="Exclusive Offers for You" 
          description="Save big on your next journey with these limited-time deals."
          action={{ label: 'View All Offers', href: '/offers' }}
        />

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredOffers.map((offer) => (
            <Card 
              key={offer.id} 
              hover 
              shadow="sm"
              className="flex flex-col h-full overflow-hidden border-none"
            >
              <div className={`relative h-40 w-full overflow-hidden ${offer.imageColor}`}>
                {offer.imageUrl ? (
                  <img src={offer.imageUrl} alt="" className="h-full w-full object-cover" />
                ) : (
                  <Tag className="absolute inset-0 m-auto text-black/20" size={48} aria-hidden="true" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
              </div>
              
              <div className="p-5 flex flex-col flex-grow">
                <span className="text-caption font-semibold text-[var(--color-primary)] uppercase tracking-wider mb-2">
                  {offer.category}
                </span>
                <h3 className="text-h4 mb-2">{offer.title}</h3>
                <p className="text-body-sm text-[var(--color-text-secondary)] mb-4 flex-grow">
                  {offer.description}
                </p>
                
                {offer.code && (
                  <div className="mt-auto bg-[var(--color-surface-secondary)] p-2 rounded border border-dashed border-[var(--color-border)] flex items-center justify-between">
                    <span className="text-caption text-[var(--color-text-muted)]">Use Code:</span>
                    <span className="font-mono font-bold text-sm text-[var(--color-text-primary)]">{offer.code}</span>
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
