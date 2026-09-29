'use client'

import React from 'react'
import { AuthShell, AuthSwitch } from '@/components/auth/AuthShell'
import { SignupForm } from '@/components/auth/SignupForm'

export default function SignupPage() {
  return (
    <AuthShell mode="signup">
      <SignupForm />
      <AuthSwitch mode="signup" />
    </AuthShell>
  )
}