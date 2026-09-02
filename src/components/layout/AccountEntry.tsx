'use client'

import React from 'react'
import Link from 'next/link'

export function AccountEntry() {
  return (
    <div className="hidden lg:flex items-center gap-3">
      <Link
        href="/login"
        className="inline-flex h-[46px] items-center justify-center rounded-[12px] border border-[var(--green)] bg-white px-6 text-base font-bold text-[var(--green)] transition hover:bg-[var(--green)] hover:text-white"
      >
        Login
      </Link>
      <Link
        href="/signup"
        className="inline-flex h-[46px] items-center justify-center rounded-[12px] bg-[var(--yellow)] px-7 text-base font-bold text-[var(--green-dark)] shadow-[0_8px_18px_rgba(255,210,26,0.25)] transition hover:brightness-95"
      >
        Book Now
      </Link>
    </div>
  )
}
