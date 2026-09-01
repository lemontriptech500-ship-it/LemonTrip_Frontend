import React from 'react'
import { Skeleton } from '@/components/ui'

export function HotelResultSkeleton() {
  return (
    <div className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] overflow-hidden border border-[var(--color-border)]">
      <div className="flex flex-col md:flex-row">
        <Skeleton className="w-full md:w-64 lg:w-72 h-48 md:h-auto md:min-h-[220px] rounded-none" />
        <div className="flex-1 p-5 flex flex-col gap-3">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-6 w-2/3" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <div className="flex justify-between items-end mt-2">
            <Skeleton className="h-8 w-28" />
            <Skeleton className="h-10 w-28" />
          </div>
        </div>
      </div>
    </div>
  )
}
