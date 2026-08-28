'use client'

import React, { useState, useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'
import type { TabItem } from '@/types'

// ============================================================
// Tabs — Generic accessible tab system.
// Completely agnostic to content (can be used for Flight search, etc.)
// ============================================================

export interface TabsProps {
  items: TabItem[]
  defaultTabId?: string
  activeTabId?: string
  onChange?: (tabId: string) => void
  className?: string
  tabListClassName?: string
  tabContentClassName?: string
}

export function Tabs({
  items,
  defaultTabId,
  activeTabId: externalActiveTabId,
  onChange,
  className,
  tabListClassName,
  tabContentClassName,
}: TabsProps) {
  const [internalActiveTabId, setInternalActiveTabId] = useState(
    defaultTabId || items[0]?.id
  )
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])

  const isControlled = externalActiveTabId !== undefined
  const activeTabId = isControlled ? externalActiveTabId : internalActiveTabId

  const handleTabClick = (tabId: string) => {
    if (!isControlled) {
      setInternalActiveTabId(tabId)
    }
    onChange?.(tabId)
  }

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    let newIndex = index
    if (e.key === 'ArrowRight') {
      newIndex = index === items.length - 1 ? 0 : index + 1
    } else if (e.key === 'ArrowLeft') {
      newIndex = index === 0 ? items.length - 1 : index - 1
    } else {
      return
    }

    e.preventDefault()
    const newTabId = items[newIndex].id
    handleTabClick(newTabId)
    tabRefs.current[newIndex]?.focus()
  }

  if (!items?.length) return null

  return (
    <div className={cn('flex flex-col', className)}>
      {/* Tab List */}
      <div
        role="tablist"
        aria-orientation="horizontal"
        className={cn(
          'flex items-center overflow-x-auto border-b border-[var(--color-border)] hide-scrollbar',
          tabListClassName
        )}
      >
        {items.map((tab, index) => {
          const isActive = activeTabId === tab.id
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              aria-controls={`panel-${tab.id}`}
              id={`tab-${tab.id}`}
              tabIndex={isActive ? 0 : -1}
              ref={(el) => { tabRefs.current[index] = el }}
              onClick={() => handleTabClick(tab.id)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className={cn(
                'flex items-center gap-2 whitespace-nowrap px-4 py-3 font-medium transition-all',
                'focus-visible:outline-none focus-visible:bg-[var(--color-surface-secondary)]',
                isActive
                  ? 'border-b-2 border-[var(--color-primary)] text-[var(--color-primary)]'
                  : 'border-b-2 border-transparent text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:border-[var(--color-border-light)]'
              )}
            >
              {tab.icon && <span aria-hidden>{tab.icon}</span>}
              <span>{tab.label}</span>
            </button>
          )
        })}
      </div>

      {/* Tab Panels */}
      <div className={cn('pt-4 focus-visible:outline-none', tabContentClassName)}>
        {items.map((tab) => {
          const isActive = activeTabId === tab.id
          if (!isActive) return null

          return (
            <div
              key={tab.id}
              role="tabpanel"
              id={`panel-${tab.id}`}
              aria-labelledby={`tab-${tab.id}`}
              tabIndex={0}
              className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 rounded-[var(--radius-sm)]"
            >
              {tab.content}
            </div>
          )
        })}
      </div>
    </div>
  )
}
