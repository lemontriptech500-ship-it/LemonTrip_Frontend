import { apiRequest } from '@/lib/apiClient'

export interface User {
  id: string
  name: string
  email: string
  phone: string
  avatar?: string
  provider?: 'local' | 'google'
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
}

function normalizeUser(user: User): User {
  return { ...user, phone: user.phone || '' }
}

export async function login(credentials: {
  email: string
  password: string
}): Promise<{ success: boolean; user?: User; token?: string; error?: string }> {
  try {
    const result = await apiRequest<{ user: User; token: string }>('/auth/login', { method: 'POST', body: JSON.stringify(credentials) })
    return { success: true, ...result, user: normalizeUser(result.user) }
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : 'Login failed' }
  }
}

export async function register(data: {
  name: string
  email: string
  phone: string
  password: string
}): Promise<{ success: boolean; user?: User; token?: string; error?: string }> {
  try {
    const result = await apiRequest<{ user: User; token: string }>('/auth/register', { method: 'POST', body: JSON.stringify(data) })
    return { success: true, ...result, user: normalizeUser(result.user) }
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : 'Registration failed' }
  }
}

export async function loginWithGoogle(idToken: string, mode: 'signin' | 'signup' = 'signin'): Promise<{ user: User; token: string }> {
  const result = await apiRequest<{ user: User; token: string }>('/auth/google', {
    method: 'POST',
    body: JSON.stringify({ idToken, mode }),
  })
  return { ...result, user: normalizeUser(result.user) }
}

export async function getCurrentUser(): Promise<User> {
  const result = await apiRequest<{ user: User }>('/auth/me')
  return normalizeUser(result.user)
}

export async function updateProfile(data: { name: string; phone: string }): Promise<User> {
  const result = await apiRequest<{ user: User }>('/auth/me', {
    method: 'PATCH',
    body: JSON.stringify(data),
  })
  return normalizeUser(result.user)
}

export async function forgotPassword(email: string): Promise<{ success: boolean; message: string }> {
  await new Promise((resolve) => setTimeout(resolve, 800))

  if (email) {
    return { success: true, message: 'Password reset link has been sent to your email' }
  }
  return { success: false, message: 'Please enter a valid email' }
}

export async function logout(): Promise<{ success: boolean }> {
  await new Promise((resolve) => setTimeout(resolve, 300))
  return { success: true }
}

export async function getSavedTravellers(): Promise<unknown[]> {
  await new Promise((resolve) => setTimeout(resolve, 400))
  return [
    {
      id: 'trav1',
      title: 'Mr',
      firstName: 'Rahul',
      lastName: 'Sharma',
      dateOfBirth: '1990-05-15',
      gender: 'Male',
      nationality: 'Indian',
    },
    {
      id: 'trav2',
      title: 'Mrs',
      firstName: 'Priya',
      lastName: 'Sharma',
      dateOfBirth: '1992-08-20',
      gender: 'Female',
      nationality: 'Indian',
    },
  ]
}
