import React from 'react'
import Link from 'next/link'
import { Container, SectionHeading, Card, Button } from '@/components/ui'
import { popularPackages } from '@/data/packages'
import { Clock, CheckCircle2 } from 'lucide-react'

export function PopularPackages() {
  return (
    <section className="section-gap bg-[var(--color-surface-secondary)]">
      <Container>
        <SectionHeading 
          title="Popular Holiday Packages" 
          description="Handpicked travel packages for your perfect getaway."
          action={{ label: 'Explore Packages', href: '/packages' }}
        />

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {popularPackages.map((pkg) => (
            <Card key={pkg.id} hover className="overflow-hidden border-none flex flex-col h-full bg-white">
              <div className={`relative h-52 w-full ${pkg.imageFallbackColor}`}>
                {pkg.imageUrl && <img src={pkg.imageUrl} alt={`${pkg.destination} travel package`} className="h-full w-full object-cover" />}
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold shadow-sm">
                  {pkg.startingPrice}
                </div>
              </div>
              
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-2 text-[var(--color-text-secondary)] mb-3">
                  <Clock size={16} />
                  <span className="text-sm font-medium">{pkg.duration}</span>
                </div>
                
                <h3 className="text-h3 mb-3">{pkg.destination}</h3>
                <p className="text-body text-[var(--color-text-secondary)] mb-6 flex-grow">
                  {pkg.description}
                </p>
                
                <div className="space-y-2 mb-6">
                  {pkg.highlights.map((highlight, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-[var(--color-text-primary)]">
                      <CheckCircle2 size={16} className="text-[var(--color-success)]" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
                
                <Button variant="outline" fullWidth asChild>
                  <Link href="/packages">View Details</Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  )
}
