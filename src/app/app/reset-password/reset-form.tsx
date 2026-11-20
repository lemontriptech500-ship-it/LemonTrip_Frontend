'use client'

import { useSearchParams } from 'next/navigation'
import { useState, type FormEvent } from 'react'
import { Alert, Button, Input } from '@/components/ui'
import { resetAppPassword } from '@/services/appPasswordReset'

export function AppResetForm() {
  const token = useSearchParams().get('token') || ''
  const validToken = token.length >= 20 && token.length <= 200
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<{ success: boolean; message: string } | null>(null)

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (loading || !validToken) return
    if (password.length < 8 || password.length > 128 || password !== confirm) {
      setStatus({ success: false, message: 'Passwords must match and contain 8–128 characters.' })
      return
    }
    setLoading(true)
    try {
      setStatus(await resetAppPassword(token, password))
    } finally {
      setLoading(false)
    }
  }

  return (
    <section aria-labelledby="app-reset-title" className="mx-auto my-12 w-full max-w-md rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-sm">
      <form onSubmit={submit} className="space-y-4">
        <p className="text-sm font-semibold text-[var(--color-primary)]">LemonTrip app</p>
        <h1 id="app-reset-title" className="text-2xl font-semibold">Reset your app password</h1>
        {!validToken && <Alert variant="error">This reset link is incomplete. Open Forgot password in the LemonTrip app to request a new link.</Alert>}
        {status && <Alert variant={status.success ? 'info' : 'error'}>{status.message}</Alert>}
        {!status?.success && validToken && <>
          <Input label="New password" type="password" autoComplete="new-password" minLength={8} maxLength={128} value={password} onChange={event => setPassword(event.target.value)} disabled={loading} required />
          <Input label="Confirm password" type="password" autoComplete="new-password" minLength={8} maxLength={128} value={confirm} onChange={event => setConfirm(event.target.value)} disabled={loading} required />
          <Button type="submit" fullWidth loading={loading} disabled={loading}>Reset app password</Button>
          <p className="text-sm text-[var(--color-text-secondary)]">Links expire after 30 minutes and work once. For a new link, use Forgot password in the app.</p>
        </>}
      </form>
    </section>
  )
}
