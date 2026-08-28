'use client'

import React from 'react'
import { Container, SectionHeading } from '@/components/ui'
import { EmptyState } from '@/components/common'
import { Train } from 'lucide-react'

export default function TrainsPage() {
  return (
    <div className="section-gap">
      <Container>
        <SectionHeading title="Trains" description="Book train tickets." />
        <div className="mt-8">
          <EmptyState title="Train Module" description="Coming in a future module." icon={<Train />} action={{ label: 'Go Home', onClick: () => window.location.href = '/' }} />
        </div>
      </Container>
    </div>
  )
}
