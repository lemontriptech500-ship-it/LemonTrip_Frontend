'use client'

import React from 'react'
import { AuthShell, AuthSwitch } from '@/components/auth/AuthShell'
import { LoginForm } from '@/components/auth/LoginForm'

export default function LoginPage() {
  return (
    <AuthShell mode="signin">
      <LoginForm />
      <AuthSwitch mode="signin" />
    </AuthShell>
  )
}