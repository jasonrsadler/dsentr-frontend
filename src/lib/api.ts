const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function joinWaitlist(email: string): Promise<string> {
    const res = await fetch(`${API_BASE_URL}/api/early-access`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
  
    if (!res.ok) {
      throw new Error(await res.text());
    }
  
    return await res.text(); // "Thanks for signing up!"
  }