import React from 'react'
import { FlightPageHero, PAGE_HERO_IMAGES } from '@/components/flights/FlightPageHero'

/**
 * Save as: src/app/blog/[postId]/layout.tsx
 * Banner behind the transparent header on the blog article page.
 * Uses --color-surface-secondary to match the article page's own background.
 */
export default function BlogPostLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="print:hidden">
        <FlightPageHero
          compact
          backgroundImage={PAGE_HERO_IMAGES.travel}
          title="Travel Journal"
          subtitle="Guides, tips and inspiration for your next journey."
        />
      </div>
      <div className="bg-[var(--color-surface-secondary)] pt-10 print:pt-0">{children}</div>
    </>
  )
}