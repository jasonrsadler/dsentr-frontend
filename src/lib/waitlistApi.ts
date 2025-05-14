import { API_BASE_URL } from './config'

export async function joinWaitlist(email: string): Promise<string> {
  try {
    type ApiResponse = {
      status: string
      message: string
    }
    const res = await fetch(`${API_BASE_URL}/api/early-access`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    })

    const data: ApiResponse = await res.json()
    if (res.ok && data.status === 'success') {
      return data.message // "Thanks for signing up!"
    } else {
      throw new Error(data.message || 'Failed to join the waitlist')
    }
  } catch (error) {
    console.error('An error occurred joining waitlist:', error)
    throw new Error(
      'An error occurred while joining the waitlist. Please try again later.'
    )
  }
}
