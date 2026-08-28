'use client'

import React from 'react'
import { Container, SectionHeading } from '@/components/ui'
import { EmptyState } from '@/components/common'
import { BookOpen } from 'lucide-react'

export default function BlogPage() {
  return (
    <div className="section-gap">
      <Container>
        <SectionHeading title="Blog" description="Read our latest travel guides and articles." />
        <div className="mt-8">
          <EmptyState title="Blog Module" description="Coming in a future module." icon={<BookOpen />} action={{ label: 'Go Home', onClick: () => window.location.href = '/' }} />
        </div>
      </Container>
    </div>
  )
}
