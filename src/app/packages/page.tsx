'use client'

import React from 'react'
import { Container, SectionHeading } from '@/components/ui'
import { EmptyState } from '@/components/common'
import { Map } from 'lucide-react'

export default function PackagesPage() {
  return (
    <div className="section-gap">
      <Container>
        <SectionHeading title="Holiday Packages" description="Explore curated holiday packages." />
        <div className="mt-8">
          <EmptyState title="Packages Module" description="Coming in a future module." icon={<Map />} action={{ label: 'Go Home', onClick: () => window.location.href = '/' }} />
        </div>
      </Container>
    </div>
  )
}
