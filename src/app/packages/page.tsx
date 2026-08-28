'use client'

import React from 'react'
import Link from 'next/link'
import { Clock, MapPin } from 'lucide-react'
import { Button, Card, Container, SectionHeading } from '@/components/ui'
import { popularPackages } from '@/data/packages'

export default function PackagesPage() {
  return (
    <div className="section-gap bg-[var(--color-surface-secondary)]">
      <Container>
        <SectionHeading title="Holiday Packages" description="Explore curated getaways with handpicked stays and experiences." />
        <div className="mt-10 grid gap-8 lg:grid-cols-3">
          {popularPackages.map((pkg) => <Card key={pkg.id} className="overflow-hidden bg-white" hover padding="none"><div className={`relative h-56 ${pkg.imageFallbackColor}`}>{pkg.imageUrl && <img src={pkg.imageUrl} alt={`${pkg.destination} travel package`} className="h-full w-full object-cover" />}<div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" /><span className="absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-1 text-sm font-semibold">{pkg.startingPrice}</span></div><div className="p-6"><div className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]"><Clock size={15} />{pkg.duration}</div><h2 className="mt-3 text-xl font-bold text-[var(--color-text-primary)]">{pkg.destination}</h2><p className="mt-2 text-sm leading-relaxed text-[var(--color-text-secondary)]">{pkg.description}</p><div className="mt-5 flex flex-wrap gap-2">{pkg.highlights.map((highlight) => <span key={highlight} className="rounded-full bg-[var(--color-secondary-soft)] px-2.5 py-1 text-xs font-semibold text-[var(--color-accent)]">{highlight}</span>)}</div><Button className="mt-6" fullWidth variant="outline" asChild><Link href={`/packages/${pkg.id}`}>View package</Link></Button></div></Card>)}
        </div>
        <p className="mt-8 flex items-center gap-2 text-sm text-[var(--color-text-secondary)]"><MapPin size={16} className="text-[var(--color-accent)]" />Sample package content for interface preview.</p>
      </Container>
    </div>
  )
}
