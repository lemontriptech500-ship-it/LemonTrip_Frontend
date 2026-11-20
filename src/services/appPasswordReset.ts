// This is the mobile API, deliberately separate from the website's /api/v1 API.
const APP_API_URL = (process.env.NEXT_PUBLIC_APP_API_URL || 'https://lemontripapp-backend.onrender.com').replace(/\/+$/, '')

export async function resetAppPassword(token: string, newPassword: string): Promise<{ success: boolean; message: string }> {
  try {
    const response = await fetch(`${APP_API_URL}/api/auth/reset-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      credentials: 'omit',
      body: JSON.stringify({ token, newPassword }),
      // Allow the app's Render service time to wake up.
      signal: AbortSignal.timeout(90_000),
    })
    const result = await response.json().catch(() => null)
    if (!response.ok || result?.success !== true) {
      return { success: false, message: typeof result?.error === 'string' ? result.error : 'Unable to reset your app password. Please try again.' }
    }
    return { success: true, message: 'Your app password has been updated. Return to the LemonTrip app and log in with your new password.' }
  } catch {
    return { success: false, message: 'Could not reach the app account service. Check your connection and try again.' }
  }
}
