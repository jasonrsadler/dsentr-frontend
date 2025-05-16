import { useAuth } from '@/stores/auth'
import { API_BASE_URL } from './config'

export async function signupUser(formData: {
  first_name: string
  last_name: string
  email: string
  password: string
  company_name?: string
  country?: string
  tax_id?: string
  settings?: Record<string, any>
}): Promise<{ success: boolean; message: string }> {
  formData.email = formData.email.toLocaleLowerCase()
  try {
    const res = await fetch(`${API_BASE_URL}/api/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })

    const data = await res.json()

    if (!res.ok) {
      throw new Error(data.message || 'Signup failed')
    }

    return {
      success: true,
      message: data.message || 'Signup successful'
    }
  } catch (error) {
    console.error('Signup error:', error)
    throw new Error(`An error occurred while signing up: ${error}`)
  }
}

export async function loginWithEmail({
  email,
  password,
  remember
}: {
  email: string
  password: string
  remember?: boolean
}) {
  const { login } = useAuth.getState() // ✅ access Zustand store outside React

  try {
    email = email.toLocaleLowerCase()
    const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password, remember }),
      credentials: 'include'
    })

    const data = await res.json()

    if (!res.ok || !data.success) {
      return {
        success: false,
        message: data?.message || 'Login failed'
      }
    }
    console.log('Login response:', data)

    if (data.user) {
      login(data.user) // ✅ immediately update Zustand state
    }

    return { success: true, data }
  } catch (err: any) {
    return {
      success: false,
      message: err instanceof Error ? err.message : 'Unexpected error occurred'
    }
  }
}

export function loginWithOAuth(provider: 'google' | 'github' | 'apple') {
  const redirectUri = `${API_BASE_URL}/api/auth/oauth/${provider}`

  // Optional: include return path or remember state
  const returnTo = encodeURIComponent(window.location.origin + '/dashboard')
  const url = `${redirectUri}?redirect_uri=${returnTo}`

  window.location.href = url
}
