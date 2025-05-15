import { API_BASE_URL } from '@/lib'
import { create } from 'zustand'

type User = {
  first_name: string
  lastName: string
  email: string
    id: string
    role: string
    plan: string
    companyName: string
}

type AuthState = {
  user: User | null
  isLoading: boolean
  login: (user: User) => void
  logout: () => void
  checkAuth: () => Promise<void>
}

export const useAuth = create<AuthState>((set) => ({
  user: null,
  isLoading: true,

  login: (user) => set({ user, isLoading: false }),

  logout: async () => {
    await fetch(`${API_BASE_URL}/api/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    })
    set({ user: null, isLoading: false })
  },

  checkAuth: async () => {
    set({ isLoading: true }) // explicitly show loading
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/me`, {
        method: 'GET',
        credentials: 'include',
      })
      if (!res.ok) throw new Error('Not authenticated')
      const user = await res.json()
      set({ user, isLoading: false })
    } catch {
      set({ user: null, isLoading: false })
    }
  },
}))
