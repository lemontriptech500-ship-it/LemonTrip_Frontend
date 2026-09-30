'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Clock, FileCheck2, FileText } from 'lucide-react'
import { Button, Card, Container } from '@/components/ui'
import { FlightPageHero, PAGE_HERO_IMAGES } from '@/components/flights/FlightPageHero'
import { mockVisaServices } from '@/data/visaServices'

export default function VisaPage() {
  return (
    <div className="bg-[var(--color-background)] pb-20">
      <FlightPageHero
        compact
        backgroundImage={PAGE_HERO_IMAGES.visa}
        title="Visa Services"
        subtitle="Explore guided visa support options for popular destinations."
      />
      <Container className="pt-10">
        <div className="grid items-stretch gap-5 md:grid-cols-2 lg:grid-cols-3">
          {mockVisaServices.map((service) => (
            <Card key={service.id} className="group flex h-full flex-col overflow-hidden" hover padding="none">
              <div className="relative h-48 overflow-hidden bg-[var(--color-background-soft)]">
                <Image src={service.imageUrl} alt={`${service.country} travel visa destination`} fill sizes="(max-width: 768px) 100vw, 33vw" onError={(event) => { event.currentTarget.src = '/hero.png' }} className="object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#062d1b]/80 via-transparent to-black/10" />
                <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-[#063b24]/75 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
                  <FileText size={14} aria-hidden="true" />
                  {service.country}
                </span>
                <span className="absolute bottom-4 left-4 rounded-md bg-white px-3 py-1.5 text-sm font-bold text-[var(--green-dark)] shadow-sm">
                  {service.startingFrom}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <p className="text-label text-[var(--green)]">Visa assistance</p>
                <h2 className="mt-1.5 text-h4 leading-snug">{service.visaType}</h2>
                <div className="mt-4 flex items-center gap-2 border-t border-[var(--color-border-light)] pt-3 text-sm text-[var(--color-text-secondary)]">
                  <Clock size={15} className="shrink-0 text-[var(--green)]" aria-hidden="true" />
                  <span>{service.processingTime}</span>
                </div>
                <div className="mt-3 flex items-center gap-2 text-xs text-[var(--color-text-muted)]">
                  <FileCheck2 size={14} className="shrink-0" aria-hidden="true" />
                  <span>{service.documents?.length ?? 0} supporting documents</span>
                </div>
                <Button fullWidth variant="outline" className="mt-auto pt-4" icon={<ArrowRight size={14} />} iconPosition="right" asChild>
                  <Link href={`/visa/${service.id}`}>View requirements</Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>
        <p className="mt-6 text-sm text-[var(--color-text-muted)]">Visa services shown are mock content. No applications are submitted.</p>
      </Container>
    </div>
  )
}