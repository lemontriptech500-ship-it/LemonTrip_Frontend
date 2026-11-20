import type { Metadata } from 'next'
import { Suspense } from 'react'
import { AppResetForm } from './reset-form'

export const metadata: Metadata = {
  title: 'Reset your app password',
  robots: { index: false, follow: false },
  referrer: 'no-referrer',
}

export default function AppResetPasswordPage() {
  return <Suspense fallback={<p>Loading...</p>}><AppResetForm /></Suspense>
}
