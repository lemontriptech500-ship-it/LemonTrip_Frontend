export interface LeadData {
  name: string
  phone: string
  email?: string
  service?: string
  destination?: string
  travelDate?: string
  message?: string
  source: string
}

export async function submitLead(data: LeadData): Promise<{ success: boolean; message: string }> {
  await new Promise((resolve) => setTimeout(resolve, 800))

  if (data.name && data.phone) {
    return { success: true, message: 'Thank you! Our team will contact you shortly.' }
  }
  return { success: false, message: 'Please fill in all required fields.' }
}

export async function submitCallbackRequest(data: {
  name: string
  phone: string
  service?: string
}): Promise<{ success: boolean; message: string }> {
  await new Promise((resolve) => setTimeout(resolve, 600))

  if (data.name && data.phone) {
    return { success: true, message: 'Callback request received. We will call you shortly.' }
  }
  return { success: false, message: 'Please provide your name and phone number.' }
}
