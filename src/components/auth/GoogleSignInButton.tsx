'use client'

import { useEffect, useRef, useState } from 'react'
import { Alert } from '@/components/ui'
import { apiRequest } from '@/lib/apiClient'

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
let initializationClientId: string | null = null
let initializationPromise: Promise<void> | null = null
let activeCredentialCallback: ((idToken: string) => void) | null = null

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

function initializeGoogle(clientId: string, onCredential: (idToken: string) => void) {
  activeCredentialCallback = onCredential
  if (initializedClientId === clientId) return Promise.resolve()
  if (initializationPromise && initializationClientId === clientId) return initializationPromise

  initializationClientId = clientId
  initializationPromise = loadGoogleScript().then(() => {
    if (!window.google) throw new Error('Google Sign-In could not load.')
    window.google.accounts.id.initialize({
      client_id: clientId,
      callback: (response) => activeCredentialCallback?.(response.credential),
    })
    initializedClientId = clientId
  })

  return initializationPromise
}

export function GoogleSignInButton({ mode, onCredential }: GoogleSignInButtonProps) {
  const buttonRef = useRef<HTMLDivElement>(null)
  const onCredentialRef = useRef(onCredential)
  const [error, setError] = useState('')
  const [ready, setReady] = useState(false)
  const [clientId, setClientId] = useState('')
  const [loadingConfig, setLoadingConfig] = useState(true)

  onCredentialRef.current = onCredential

  useEffect(() => {
    let cancelled = false
    apiRequest<{ clientId: string }>('/auth/google/config', { suppressErrorLog: true })
      .then((config) => {
        if (cancelled) return
        if (config.clientId) setClientId(config.clientId)
        else setError('Google Sign-In is not configured on the server.')
      })
      .catch((reason: unknown) => {
        if (!cancelled) setError(reason instanceof Error ? reason.message : 'Google Sign-In is unavailable.')
      })
      .finally(() => {
        if (!cancelled) setLoadingConfig(false)
      })
    return () => { cancelled = true }
  }, [])

  useEffect(() => {
    if (!clientId || !buttonRef.current) return

    let cancelled = false
    initializeGoogle(clientId, (idToken) => {
      void onCredentialRef.current(idToken).catch((reason: unknown) => {
        setError(reason instanceof Error ? reason.message : 'Google Sign-In failed.')
      })
    })
      .then(() => {
        if (cancelled || !buttonRef.current || !window.google) return
        buttonRef.current.replaceChildren()
        window.google.accounts.id.renderButton(buttonRef.current, {
          theme: 'outline',
          size: 'large',
          width: Math.min(buttonRef.current.clientWidth, 400),
          text: mode === 'signup' ? 'signup_with' : 'signin_with',
        })
        setReady(true)
      })
      .catch((reason: unknown) => {
        if (!cancelled) setError(reason instanceof Error ? reason.message : 'Google Sign-In could not load.')
      })

    return () => {
      cancelled = true
    }
  }, [clientId, mode])

  if (!clientId) {
    return (
      <div className="space-y-2">
        <button
          type="button"
          disabled
          className="flex h-11 w-full items-center justify-center gap-3 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] text-sm font-medium text-[var(--color-text-secondary)] opacity-70"
        >
          <span className="font-semibold">G</span>
          {loadingConfig ? 'Loading Google Sign-In…' : 'Google Sign-In unavailable'}
        </button>
        {error && <Alert variant="error" title="Google Sign-In unavailable">{error}</Alert>}
      </div>
    )
  }

  return (
    <div className="space-y-2">
      {!ready && (
        <div className="flex h-11 w-full items-center justify-center rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] text-sm font-medium text-[var(--color-text-secondary)]">
          Loading Google Sign-In...
        </div>
      )}
      <div ref={buttonRef} className={ready ? 'flex min-h-10 justify-center' : 'hidden'} />
      {error && <Alert variant="error" title="Google Sign-In error">{error}</Alert>}
    </div>
  )
}
