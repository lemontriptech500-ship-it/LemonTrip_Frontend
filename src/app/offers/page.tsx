'use client'

import React from 'react'
import { Container, SectionHeading } from '@/components/ui'
import { EmptyState } from '@/components/common'
import { Tag } from 'lucide-react'

export default function OffersPage() {
  return (
    <div className="section-gap">
      <Container>
        <SectionHeading title="Offers" description="Discover our latest travel deals." />
        <div className="mt-8">
          <EmptyState title="Offers Module" description="Coming in a future module." icon={<Tag />} action={{ label: 'Go Home', onClick: () => window.location.href = '/' }} />
        </div>
      </Container>
    </div>
  )
}
