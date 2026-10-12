'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense, useState } from 'react'
import Link from 'next/link'
import { AuthShell } from '@/components/auth/AuthShell'
import { Alert, Button, Input } from '@/components/ui'
import { resetPassword } from '@/services/authService'

function ResetForm() {
  const token = useSearchParams().get('token') || ''
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<{ success: boolean; message: string } | null>(null)
  async function submit(event: React.FormEvent) {
    event.preventDefault()
    if (password.length < 8 || password.length > 128 || password !== confirm) {
      setStatus({ success: false, message: 'Passwords must match and contain 8–128 characters.' })
      return
    }
    setLoading(true)
    setStatus(await resetPassword(token, password))
    setLoading(false)
  }
  return <AuthShell mode="signin"><form onSubmit={submit} className="space-y-4">
    <h2 className="text-xl font-semibold">Reset your password</h2>
    {!token && <Alert variant="error">Missing reset token. Request a new reset link.</Alert>}
    {status && <Alert variant={status.success ? 'info' : 'error'}>{status.message}</Alert>}
    {!status?.success && <><Input label="New password" type="password" autoComplete="new-password" value={password} onChange={e => setPassword(e.target.value)} required />
    <Input label="Confirm password" type="password" autoComplete="new-password" value={confirm} onChange={e => setConfirm(e.target.value)} required />
    <Button type="submit" fullWidth loading={loading} disabled={!token}>Reset Password</Button></>}
    <Link href="/login" className="block text-center underline">Back to Sign In</Link>
  </form></AuthShell>
}
export default function ResetPasswordPage() { return <Suspense fallback={<p>Loading...</p>}><ResetForm /></Suspense> }
