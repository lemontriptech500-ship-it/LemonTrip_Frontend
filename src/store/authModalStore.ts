import { create } from 'zustand'

export type AuthModalMode = 'signin' | 'signup'

interface AuthModalState {
  isOpen: boolean
  mode: AuthModalMode
  /** Optional page to go to after a successful sign in (default: stay on the current page) */
  redirectTo: string | null
  open: (mode?: AuthModalMode, redirectTo?: string) => void
  close: () => void
  setMode: (mode: AuthModalMode) => void
}

/**
 * Controls the login / register pop-up.
 * From anywhere:  useAuthModalStore.getState().open('signin')
 * In components:  const openAuthModal = useAuthModalStore((s) => s.open)
 */
export const useAuthModalStore = create<AuthModalState>((set) => ({
  isOpen: false,
  mode: 'signin',
  redirectTo: null,
  open: (mode = 'signin', redirectTo) => set({ isOpen: true, mode, redirectTo: redirectTo ?? null }),
  close: () => set({ isOpen: false, redirectTo: null }),
  setMode: (mode) => set({ mode }),
}))