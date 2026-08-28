import React from 'react'
import { cn } from '@/lib/utils'

// ============================================================
// Container — Max-width wrapper with responsive horizontal padding.
// Use this on every page section to maintain consistent layout.
// ============================================================

type ContainerElement = 'div' | 'section' | 'main' | 'article' | 'aside' | 'header' | 'footer'

interface ContainerProps {
  as?: ContainerElement
  className?: string
  children: React.ReactNode
  id?: string
}

export function Container({
  as: Tag = 'div',
  className,
  children,
  id,
}: ContainerProps) {
  return (
    <Tag
      id={id}
      className={cn('container-lemon', className)}
    >
      {children}
    </Tag>
  )
}
