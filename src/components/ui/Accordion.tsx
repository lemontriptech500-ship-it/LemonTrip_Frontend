'use client'

import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { AccordionItem } from '@/types'

// ============================================================
// Accordion — Generic collapsible sections.
// ============================================================

export interface AccordionProps {
  items: AccordionItem[]
  allowMultiple?: boolean
  defaultExpandedIds?: string[]
  className?: string
}

export function Accordion({
  items,
  allowMultiple = false,
  defaultExpandedIds = [],
  className,
}: AccordionProps) {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set(defaultExpandedIds))

  const toggleItem = (id: string) => {
    const newExpanded = new Set(expandedIds)
    if (newExpanded.has(id)) {
      newExpanded.delete(id)
    } else {
      if (!allowMultiple) {
        newExpanded.clear()
      }
      newExpanded.add(id)
    }
    setExpandedIds(newExpanded)
  }

  if (!items?.length) return null

  return (
    <div className={cn('flex flex-col divide-y divide-[var(--color-border)] border-y border-[var(--color-border)]', className)}>
      {items.map((item) => {
        const isExpanded = expandedIds.has(item.id)

        return (
          <div key={item.id} className="flex flex-col">
            <button
              type="button"
              id={`accordion-btn-${item.id}`}
              aria-expanded={isExpanded}
              aria-controls={`accordion-panel-${item.id}`}
              onClick={() => toggleItem(item.id)}
              className={cn(
                'flex w-full items-center justify-between py-4 text-left font-medium text-[var(--color-text-primary)]',
                'transition-colors hover:text-[var(--color-primary-active)]',
                'focus-visible:outline-none focus-visible:bg-[var(--color-surface-secondary)]'
              )}
            >
              <span className="text-body-lg">{item.title}</span>
              <ChevronDown
                size={20}
                className={cn(
                  'text-[var(--color-text-muted)] transition-transform duration-200',
                  isExpanded && 'rotate-180 transform text-[var(--color-primary)]'
                )}
                aria-hidden
              />
            </button>
            <div
              id={`accordion-panel-${item.id}`}
              role="region"
              aria-labelledby={`accordion-btn-${item.id}`}
              hidden={!isExpanded}
              className={cn(
                'grid transition-all duration-200',
                isExpanded ? 'grid-rows-[1fr] pb-4 opacity-100' : 'grid-rows-[0fr] opacity-0'
              )}
            >
              <div className="overflow-hidden text-[var(--color-text-secondary)]">
                {item.content}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
