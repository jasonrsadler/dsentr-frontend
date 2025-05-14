import { API_BASE_URL } from './config'

export async function verifyEmail(token: string | null) {
  if (!token) {
    return { success: false, message: 'Missing token' }
  }

  try {
    const res = await fetch(`${API_BASE_URL}/api/auth/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    })

    const data = await res.json()

    if (!res.ok || !data.success) {
      return {
        success: false,
        message: data?.message || 'Verification failed',
      }
    }

    return { success: true }
  } catch (err: any) {
    return {
      success: false,
      message:
        err instanceof Error ? err.message : 'Unexpected error occurred',
    }
  }
}