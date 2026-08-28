'use client'

import React from 'react'
import { Container, SectionHeading } from '@/components/ui'
import { EmptyState } from '@/components/common'
import { FileText } from 'lucide-react'

export default function VisaPage() {
  return (
    <div className="section-gap">
      <Container>
        <SectionHeading title="Visa Services" description="Apply for your travel visa." />
        <div className="mt-8">
          <EmptyState title="Visa Module" description="Coming in a future module." icon={<FileText />} action={{ label: 'Go Home', onClick: () => window.location.href = '/' }} />
        </div>
      </Container>
    </div>
  )
}
