import { API_BASE_URL } from './config'

let cachedCsrfToken: string | null = null

export async function getCsrfToken(): Promise<string> {
  if (cachedCsrfToken) {
    console.log('Using cached CSRF token:', cachedCsrfToken)
    return cachedCsrfToken
  }

  const res = await fetch(`${API_BASE_URL}/api/auth/csrf-token`, {
    credentials: 'include'
  })

  if (!res.ok) {
    throw new Error('Failed to fetch CSRF token')
  }

  const token = await res.text()
  cachedCsrfToken = token
  console.log('Fetched CSRF token:', token)
  console.log('Cached CSRF token:', cachedCsrfToken)
  return token
}
