import { useAuthStore } from '@/store/authStore'

export const API_BASE_URL = (process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api/v1').replace(/\/$/, '')
export const isApiConfigured = Boolean(API_BASE_URL)

export class ApiError extends Error {
  status: number
  details?: unknown

  constructor(message: string, status: number, details?: unknown) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.details = details
  }
}

function clearSession() {
  useAuthStore.getState().logout()
}

type ApiRequestOptions = RequestInit & { suppressErrorLog?: boolean }

export async function apiRequest<T>(path: string, options: ApiRequestOptions = {}): Promise<T> {
  const { suppressErrorLog = false, ...requestOptions } = options
  const headers = new Headers(requestOptions.headers)
  const token = useAuthStore.getState().token

  if (!headers.has('Accept')) headers.set('Accept', 'application/json')
  if (!(requestOptions.body instanceof FormData) && requestOptions.body && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json')
  }
  if (token) headers.set('Authorization', `Bearer ${token}`)

  let response: Response
  try {
    response = await fetch(`${API_BASE_URL}${path.startsWith('/') ? path : `/${path}`}`, {
      ...requestOptions,
      headers,
    })
  } catch (error) {
    const url = `${API_BASE_URL}${path.startsWith('/') ? path : `/${path}`}`
    const message = error instanceof Error ? error.message : String(error)
    if (!suppressErrorLog) console.error('[api] Network request failed', { path, url, message })
    throw new ApiError('Unable to reach the server. Please try again.', 0, { path, url, message })
  }

  const contentType = response.headers.get('content-type') || ''
  const payload: unknown = contentType.includes('application/json')
    ? await response.json().catch(() => null)
    : await response.text()

  if (response.status === 401) {
    clearSession()
  }

  if (!response.ok) {
    const message = typeof payload === 'object' && payload && 'error' in payload
      ? typeof payload.error === 'string'
        ? payload.error
        : typeof payload.error === 'object' && payload.error && 'message' in payload.error
          ? String(payload.error.message)
          : `Request failed with status ${response.status}.`
      : typeof payload === 'object' && payload && 'message' in payload
        ? String(payload.message)
        : `Request failed with status ${response.status}.`
    const logDetails = { url: `${API_BASE_URL}${path.startsWith('/') ? path : `/${path}`}`, path, status: response.status, message, payload }
    if (!suppressErrorLog) {
      if (response.status >= 500) {
        console.error('[api] Server request failed', logDetails)
      } else {
        console.warn('[api] Request rejected', logDetails)
      }
    }
    throw new ApiError(message, response.status, payload)
  }

  if (typeof payload === 'object' && payload && 'success' in payload && 'data' in payload) {
    const envelope = payload as { success: boolean; data: T; error?: { message?: string } | string | null }
    if (!envelope.success) {
      const message = typeof envelope.error === 'string' ? envelope.error : envelope.error?.message || 'The request was not successful.'
      throw new ApiError(message, response.status, payload)
    }
    return envelope.data
  }

  return payload as T
}