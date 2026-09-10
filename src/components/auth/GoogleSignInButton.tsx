'use client'

import { useEffect, useRef, useState } from 'react'
import { Alert } from '@/components/ui'

interface GoogleCredentialResponse {
  credential: string
}

interface GoogleIdentity {
  accounts: {
    id: {
      initialize: (options: {
        client_id: string
        callback: (response: GoogleCredentialResponse) => void
      }) => void
      renderButton: (element: HTMLElement, options: {
        theme: 'outline' | 'filled_blue' | 'filled_black'
        size: 'large' | 'medium' | 'small'
        width: number
        text: 'signin_with' | 'signup_with' | 'continue_with' | 'signin'
      }) => void
    }
  }
}

declare global {
  interface Window {
    google?: GoogleIdentity
  }
}

interface GoogleSignInButtonProps {
  mode: 'signin' | 'signup'
  onCredential: (idToken: string) => Promise<void>
}

const GOOGLE_SCRIPT_ID = 'google-identity-services'
let initializedClientId: string | null = null

function loadGoogleScript() {
  if (window.google) return Promise.resolve()

  const existingScript = document.getElementById(GOOGLE_SCRIPT_ID)
  if (existingScript) {
    return new Promise<void>((resolve, reject) => {
      existingScript.addEventListener('load', () => resolve(), { once: true })
      existingScript.addEventListener('error', () => reject(new Error('Google Sign-In could not load.')), { once: true })
    })
  }

  return new Promise<void>((resolve, reject) => {
    const script = document.createElement('script')
    script.id = GOOGLE_SCRIPT_ID
    script.src = 'https://accounts.google.com/gsi/client'
    script.async = true
    script.defer = true
    script.onload = () => resolve()
    script.onerror = () => reject(new Error('Google Sign-In could not load.'))
    document.head.appendChild(script)
  })
}

export function GoogleSignInButton({ mode, onCredential }: GoogleSignInButtonProps) {
  const buttonRef = useRef<HTMLDivElement>(null)
  const onCredentialRef = useRef(onCredential)
  const [error, setError] = useState('')
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
  const isConfigured = Boolean(clientId && !clientId.startsWith('replace-with-'))

  onCredentialRef.current = onCredential

  useEffect(() => {
    if (!isConfigured || !clientId || !buttonRef.current) return

    let cancelled = false
    loadGoogleScript()
      .then(() => {
        if (cancelled || !buttonRef.current || !window.google) return
        buttonRef.current.replaceChildren()
        if (initializedClientId !== clientId) {
          window.google.accounts.id.initialize({
            client_id: clientId,
            callback: (response) => {
              void onCredentialRef.current(response.credential).catch((reason: unknown) => {
                setError(reason instanceof Error ? reason.message : 'Google Sign-In failed.')
              })
            },
          })
          initializedClientId = clientId
        }
        window.google.accounts.id.renderButton(buttonRef.current, {
          theme: 'outline',
          size: 'large',
          width: Math.min(buttonRef.current.clientWidth, 400),
          text: mode === 'signup' ? 'signup_with' : 'signin_with',
        })
      })
      .catch((reason: unknown) => {
        if (!cancelled) setError(reason instanceof Error ? reason.message : 'Google Sign-In could not load.')
      })

    return () => {
      cancelled = true
    }
  }, [clientId, isConfigured, mode])

  if (!isConfigured) {
    return (
      <div className="space-y-2">
        <button
          type="button"
          disabled
          className="flex h-11 w-full items-center justify-center gap-3 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] text-sm font-medium text-[var(--color-text-secondary)] opacity-70"
        >
          <span className="font-semibold">G</span>
          Continue with Google
        </button>
        <p className="text-center text-xs text-[var(--color-text-secondary)]">Google Sign-In will be available after its client ID is added.</p>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <div ref={buttonRef} className="flex min-h-10 justify-center" />
      {error && <Alert variant="error" title="Google Sign-In error">{error}</Alert>}
    </div>
  )
}
