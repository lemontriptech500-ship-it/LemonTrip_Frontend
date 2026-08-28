'use client'

import React from 'react'
import { Container, SectionHeading } from '@/components/ui'
import { EmptyState } from '@/components/common'
import { Bus } from 'lucide-react'

export default function BusesPage() {
  return (
    <div className="section-gap">
      <Container>
        <SectionHeading title="Buses" description="Book intercity bus tickets." />
        <div className="mt-8">
          <EmptyState title="Bus Module" description="Coming in a future module." icon={<Bus />} action={{ label: 'Go Home', onClick: () => window.location.href = '/' }} />
        </div>
      </Container>
    </div>
  )
}
