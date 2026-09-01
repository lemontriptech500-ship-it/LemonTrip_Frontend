import React from 'react'
import Link from 'next/link'
import { Container, SectionHeading, Card, Button } from '@/components/ui'
import { popularPackages } from '@/data/packages'
import { Clock, CheckCircle2 } from 'lucide-react'

export function PopularPackages() {
  return (
    <section className="section-gap bg-[var(--color-background)]">
      <Container>
        <SectionHeading 
          title="Popular Holiday Packages" 
          description="Handpicked travel packages for your perfect getaway."
          action={{ label: 'Explore Packages', href: '/packages' }}
        />

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {popularPackages.map((pkg) => (
            <Card key={pkg.id} hover className="overflow-hidden flex flex-col h-full">
              <div className={`relative h-48 w-full ${pkg.imageFallbackColor}`}>
                {pkg.imageUrl && <img src={pkg.imageUrl} alt={`${pkg.destination} travel package`} className="h-full w-full object-cover" />}
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(44,62,80,0.40)] to-transparent" />
                <div className="absolute top-3 right-3 bg-[var(--color-surface)]/95 backdrop-blur-sm px-2.5 py-1 rounded-[var(--radius-sm)] text-xs font-bold shadow-sm">
                  {pkg.startingPrice}
                </div>
              </div>
              
              <div className="p-5 flex flex-col flex-grow">
                <div className="flex items-center gap-2 text-[var(--color-text-secondary)] mb-2">
                  <Clock size={14} />
                  <span className="text-xs font-medium">{pkg.duration}</span>
                </div>
                
                <h3 className="text-h3 mb-2">{pkg.destination}</h3>
                <p className="text-body-sm text-[var(--color-text-secondary)] mb-4 flex-grow">
                  {pkg.description}
                </p>
                
                <div className="space-y-1.5 mb-5">
                  {pkg.highlights.slice(0, 3).map((highlight, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-[var(--color-text-primary)]">
                      <CheckCircle2 size={14} className="text-[var(--color-success)] shrink-0" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
                
                <Button variant="outline" fullWidth asChild>
                  <Link href={`/packages/${pkg.id}`}>View Details</Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  )
}
