import React from 'react'

/** Package details use their destination gallery as the page hero. */
export default function PackageDetailsLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-[var(--color-background)]">{children}</div>
}
