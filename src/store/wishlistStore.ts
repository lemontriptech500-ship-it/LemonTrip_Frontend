import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface WishlistItem {
  id: string
  type: 'flight' | 'hotel' | 'bus' | 'train' | 'package' | 'visa'
  name: string
  description?: string
  price?: number
  imageUrl?: string
  details?: Record<string, string>
}

interface WishlistState {
  items: WishlistItem[]
  hasHydrated: boolean
  setHydrated: () => void
  addItem: (item: WishlistItem) => void
  removeItem: (id: string) => void
  toggleItem: (item: WishlistItem) => void
  isWishlisted: (id: string) => boolean
  clearWishlist: () => void
  totalItems: () => number
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      hasHydrated: false,
      setHydrated: () => set({ hasHydrated: true }),

      addItem: (item) => {
        if (get().items.some((i) => i.id === item.id)) return
        set({ items: [...get().items, item] })
      },

      removeItem: (id) => {
        set({ items: get().items.filter((i) => i.id !== id) })
      },

      toggleItem: (item) => {
        const exists = get().items.some((i) => i.id === item.id)
        if (exists) {
          get().removeItem(item.id)
        } else {
          get().addItem(item)
        }
      },

      isWishlisted: (id) => get().items.some((i) => i.id === id),

      clearWishlist: () => set({ items: [] }),

      totalItems: () => get().items.length,
    }),
    {
      name: 'lemontrip-wishlist',
      onRehydrateStorage: () => (state) => {
        state?.setHydrated?.()
      },
    }
  )
)