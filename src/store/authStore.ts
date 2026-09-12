import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface User {
  id: string
  name: string
  email: string
  phone: string
  avatar?: string
  provider?: 'local' | 'google'
}

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  hasHydrated: boolean
  setHydrated: () => void
  login: (user: User, token?: string | null) => void
  logout: () => void
  updateUser: (user: User) => void
}

function setSessionCookie(token: string | null) {
  if (typeof document === 'undefined') return
  document.cookie = token
    ? `lemontrip-session=${encodeURIComponent(token)}; Path=/; SameSite=Lax`
    : 'lemontrip-session=; Path=/; Max-Age=0; SameSite=Lax'
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      hasHydrated: false,
      setHydrated: () => set({ hasHydrated: true }),
      login: (user, token = null) => {
        setSessionCookie(token)
        set({ user, token, isAuthenticated: true })
      },
      logout: () => {
        setSessionCookie(null)
        set({ user: null, token: null, isAuthenticated: false })
      },
      updateUser: (user) => set({ user, isAuthenticated: true }),
    }),
    {
      name: 'lemontrip-auth',
      onRehydrateStorage: () => (state) => {
        state?.setHydrated?.()
      },
    }
  )
)
