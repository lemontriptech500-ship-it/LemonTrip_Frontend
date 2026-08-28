'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowRight, Clock, TrainFront } from 'lucide-react'
import { Button, Card, Container, SectionHeading } from '@/components/ui'
import { mockTrains } from '@/data/trains'

export default function TrainsPage() {
  return (
    <div className="section-gap bg-[var(--color-background)]">
      <Container>
        <SectionHeading title="Trains" description="Browse sample routes, classes, and departure times." />
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {mockTrains.map((train) => (
            <Card key={train.id} className="flex h-full flex-col" hover>
              <div className="flex items-center gap-3 border-b border-[var(--color-border-light)] pb-5"><div className="rounded-[var(--radius-md)] bg-[var(--color-secondary-soft)] p-3 text-[var(--color-accent)]"><TrainFront size={22} /></div><div><h2 className="font-bold text-[var(--color-text-primary)]">{train.name}</h2><p className="text-sm text-[var(--color-text-secondary)]">Train {train.number}</p></div></div>
              <div className="flex items-center justify-between gap-3 py-6"><div><p className="text-xl font-bold text-[var(--color-text-primary)]">{train.departure}</p><p className="text-sm text-[var(--color-text-secondary)]">{train.from}</p></div><div className="flex flex-1 flex-col items-center gap-1 text-xs text-[var(--color-text-secondary)]"><Clock size={14} /><span>{train.duration}</span><div className="h-px w-full bg-[var(--color-border)]" /></div><div className="text-right"><p className="text-xl font-bold text-[var(--color-text-primary)]">{train.arrival}</p><p className="text-sm text-[var(--color-text-secondary)]">{train.to}</p></div></div>
              <div className="mt-auto space-y-4 border-t border-[var(--color-border-light)] pt-5"><div className="flex flex-wrap gap-2">{train.classes.map((item) => <span key={item} className="rounded-full bg-[var(--color-surface-secondary)] px-2.5 py-1 text-xs font-semibold text-[var(--color-text-secondary)]">{item}</span>)}</div><div className="flex items-center justify-between gap-3"><span className="font-semibold text-[var(--color-text-primary)]">{train.price}</span><Button variant="outline" size="sm" icon={<ArrowRight size={15} />} asChild><Link href={`/trains/${train.id}`}>View route</Link></Button></div></div>
            </Card>
          ))}
        </div>
        <p className="mt-8 text-sm text-[var(--color-text-secondary)]">Mock schedules shown for interface preview. Booking actions will be connected in a future module.</p>
      </Container>
    </div>
  )
}
