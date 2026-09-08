import { mockVisaServices } from '@/data/visaServices'
import { apiRequest, isApiConfigured } from '@/lib/apiClient'

export interface VisaApplication {
  id: string
  country: string
  visaType: string
  applicantName: string
  status: 'submitted' | 'under_process' | 'appointment' | 'approved' | 'rejected'
  submittedDate: string
  documents: string[]
}

export async function searchVisaServices(params: {
  country?: string
  visaType?: string
}) {
  if (isApiConfigured) return apiRequest(`/visa/services?${new URLSearchParams(params).toString()}`)
  await new Promise((resolve) => setTimeout(resolve, 600))

  let results = [...mockVisaServices]

  if (params.country) {
    const country = params.country.toLowerCase()
    results = results.filter((v) =>
      v.country.toLowerCase().includes(country)
    )
  }

  return { services: results, total: results.length }
}

export async function getVisaServiceById(id: string) {
  if (isApiConfigured) return apiRequest(`/visa/services/${encodeURIComponent(id)}`)
  await new Promise((resolve) => setTimeout(resolve, 300))
  return mockVisaServices.find((v) => v.id === id) || null
}

export async function createVisaApplication(data: {
  serviceId: string
  personalDetails: Record<string, string>
  passportDetails: Record<string, string>
  travelDetails: Record<string, string>
}): Promise<{ applicationId: string; status: string }> {
  if (isApiConfigured) return apiRequest('/visa/applications', { method: 'POST', body: JSON.stringify(data) })
  await new Promise((resolve) => setTimeout(resolve, 1500))
  return {
    applicationId: `LT-VISA-${Date.now().toString(36).toUpperCase()}`,
    status: 'submitted',
  }
}

export interface VisaApplicationFormData {
  serviceId: string
  personalDetails: Record<string, string>
  passportDetails: Record<string, string>
  travelDetails: Record<string, string>
  passportFront: File
  passportBack: File
  photograph: File
}

export async function submitVisaApplication(data: VisaApplicationFormData): Promise<{ applicationId: string; status: string }> {
  if (!isApiConfigured) return createVisaApplication(data)

  const formData = new FormData()
  formData.append('serviceId', data.serviceId)
  formData.append('personalDetails', JSON.stringify(data.personalDetails))
  formData.append('passportDetails', JSON.stringify(data.passportDetails))
  formData.append('travelDetails', JSON.stringify(data.travelDetails))
  formData.append('passportFront', data.passportFront)
  formData.append('passportBack', data.passportBack)
  formData.append('photograph', data.photograph)
  return apiRequest('/visa/applications', { method: 'POST', body: formData })
}

export async function trackVisaApplication(applicationId: string): Promise<VisaApplication | null> {
  if (isApiConfigured) return apiRequest<VisaApplication | null>(`/visa/applications/${encodeURIComponent(applicationId)}`)
  await new Promise((resolve) => setTimeout(resolve, 500))

  const statuses: VisaApplication['status'][] = ['submitted', 'under_process', 'appointment', 'approved']
  const randomStatus = statuses[Math.floor(Math.random() * statuses.length)]

  return {
    id: applicationId,
    country: 'France',
    visaType: 'Tourist Visa',
    applicantName: 'Demo User',
    status: randomStatus,
    submittedDate: new Date().toISOString().split('T')[0],
    documents: ['Passport', 'Photograph', 'Bank Statement'],
  }
}
