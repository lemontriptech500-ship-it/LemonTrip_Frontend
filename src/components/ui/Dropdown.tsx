'use client'

import React, { useState, useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'

// ============================================================
// Dropdown — Simple click-to-open dropdown menu.
// Handles outside clicks and focus trapping.
// ============================================================

export interface DropdownProps {
  trigger: React.ReactNode
  children: React.ReactNode
  align?: 'left' | 'right'
  className?: string
  contentClassName?: string
}

export function Dropdown({
  trigger,
  children,
  align = 'left',
  className,
  contentClassName,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const menuId = React.useId()

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick)
      document.addEventListener('keydown', handleEscapeKey)
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
      document.removeEventListener('keydown', handleEscapeKey)
    }
  }, [isOpen])

  return (
    <div className={cn('relative inline-block text-left', className)} ref={dropdownRef}>
      {React.isValidElement(trigger) ? (
        React.cloneElement(trigger as React.ReactElement<any>, {
          type: 'button',
          onClick: (event: React.MouseEvent) => {
            trigger.props.onClick?.(event)
            setIsOpen(!isOpen)
          },
          onKeyDown: (event: React.KeyboardEvent) => {
            trigger.props.onKeyDown?.(event)
            if (!event.defaultPrevented && (event.key === 'Enter' || event.key === ' ')) {
              event.preventDefault()
              setIsOpen(!isOpen)
            }
          },
          'aria-expanded': isOpen,
          'aria-controls': menuId,
        })
      ) : (
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-controls={menuId}
          className="inline-flex max-w-full focus-visible:outline-none"
        >
          {trigger}
        </button>
      )}

      {isOpen && (
        <div
          id={menuId}
          className={cn(
            'absolute z-50 mt-2 w-56 origin-top-right rounded-[var(--radius-md)] bg-[var(--color-surface)] shadow-lg ring-1 ring-[var(--color-border)] ring-opacity-5 focus:outline-none',
            align === 'right' ? 'right-0' : 'left-0',
            contentClassName
          )}
          role="menu"
          aria-orientation="vertical"
          tabIndex={-1}
        >
          <div className="py-1" role="none">
            {children}
          </div>
        </div>
      )}
    </div>
  )
}
