import { apiRequest, isApiConfigured } from '@/lib/apiClient'

export interface User {
  id: string
  name: string
  email: string
  phone: string
  avatar?: string
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
}

const MOCK_USER: User = {
  id: 'u1',
  name: 'Demo User',
  email: 'demo@lemontrip.com',
  phone: '+91 98765 43210',
}

export async function login(credentials: {
  email: string
  password: string
}): Promise<{ success: boolean; user?: User; token?: string; error?: string }> {
  if (isApiConfigured) {
    try {
      return { success: true, ...(await apiRequest<{ user: User; token: string }>('/auth/login', { method: 'POST', body: JSON.stringify(credentials) })) }
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Login failed' }
    }
  }
  await new Promise((resolve) => setTimeout(resolve, 800))

  if (credentials.email && credentials.password.length >= 6) {
    return { success: true, user: MOCK_USER, token: 'demo-token' }
  }
  return { success: false, error: 'Invalid email or password' }
}

export async function register(data: {
  name: string
  email: string
  phone: string
  password: string
}): Promise<{ success: boolean; user?: User; token?: string; error?: string }> {
  if (isApiConfigured) {
    try {
      return { success: true, ...(await apiRequest<{ user: User; token: string }>('/auth/register', { method: 'POST', body: JSON.stringify(data) })) }
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Registration failed' }
    }
  }
  await new Promise((resolve) => setTimeout(resolve, 1000))

  if (data.name && data.email && data.phone && data.password.length >= 6) {
    return { success: true, user: { ...MOCK_USER, name: data.name, email: data.email, phone: data.phone }, token: 'demo-token' }
  }
  return { success: false, error: 'Please fill all required fields' }
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
