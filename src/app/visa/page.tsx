'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowRight, Clock, FileText } from 'lucide-react'
import { Button, Card, Container, SectionHeading } from '@/components/ui'
import { mockVisaServices } from '@/data/visaServices'

export default function VisaPage() {
  return (
    <div className="section-gap bg-[var(--color-background)]">
      <Container>
        <SectionHeading title="Visa Services" description="Explore guided visa support options for popular destinations." />
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {mockVisaServices.map((service) => <Card key={service.id} className="overflow-hidden" hover padding="none"><div className="relative h-48"><img src={service.imageUrl} alt={`${service.country} travel visa destination`} className="h-full w-full object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" /><span className="absolute bottom-4 left-4 flex items-center gap-2 font-semibold text-white"><FileText size={17} />{service.country}</span></div><div className="p-5"><h2 className="font-bold text-[var(--color-text-primary)]">{service.visaType}</h2><div className="mt-4 flex items-center gap-2 text-sm text-[var(--color-text-secondary)]"><Clock size={15} />{service.processingTime}</div><div className="mt-2 font-semibold text-[var(--color-accent)]">{service.startingFrom}</div><Button fullWidth variant="outline" className="mt-5" icon={<ArrowRight size={15} />} asChild><Link href={`/visa/${service.id}`}>View requirements</Link></Button></div></Card>)}
        </div>
        <p className="mt-8 text-sm text-[var(--color-text-secondary)]">Visa services shown are mock content. No applications are submitted.</p>
      </Container>
    </div>
  )
}
