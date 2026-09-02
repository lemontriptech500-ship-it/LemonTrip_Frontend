'use client'

import React from 'react'
import Link from 'next/link'

export function AccountEntry() {
  return (
    <div className="hidden items-center gap-2 lg:flex xl:gap-3">
      <Link
        href="/login"
        className="inline-flex h-9 items-center justify-center rounded-[10px] border border-[var(--green)] bg-white px-3 text-sm font-bold text-[var(--green)] transition hover:bg-[var(--green)] hover:text-white xl:h-10 xl:px-5"
      >
        Login
      </Link>
      <Link
        href="/signup"
        className="inline-flex h-9 items-center justify-center rounded-[10px] bg-[var(--yellow)] px-4 text-sm font-bold text-[var(--green-dark)] shadow-[0_8px_18px_rgba(255,210,26,0.25)] transition hover:brightness-95 xl:h-10 xl:px-6"
      >
        Book Now
      </Link>
    </div>
  )
}
