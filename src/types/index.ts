// ============================================================
// LEMONTRIP — Shared TypeScript Types
// All platform-wide shared types live here.
// Module-specific types should live in that module's folder.
// ============================================================

// --- UI Primitive Types ---

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
export type ButtonSize = 'sm' | 'md' | 'lg'

export type BadgeVariant = 'default' | 'success' | 'warning' | 'error' | 'info' | 'neutral'

export type Alignment = 'left' | 'center' | 'right'

export type InputSize = 'sm' | 'md' | 'lg'

// --- Navigation ---

export interface NavItem {
  label: string
  href: string
  icon?: React.ComponentType<{ size?: number; className?: string }>
  children?: NavItem[]
}

// --- Generic Card Props (extended by module-specific cards) ---

export interface BaseCardProps {
  className?: string
}

// --- Section Layout ---

export interface SectionHeadingProps {
  title: string
  description?: string
  align?: Alignment
  action?: {
    label: string
    href: string
  }
}

// --- Tab System ---

export interface TabItem {
  id: string
  label: string
  icon?: React.ReactNode
  content: React.ReactNode
}

// --- Accordion ---

export interface AccordionItem {
  id: string
  title: string
  content: React.ReactNode
}

// --- Common API-shaped types (placeholders for future integration) ---

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  perPage: number
}

export type AsyncStatus = 'idle' | 'loading' | 'success' | 'error'
