import { mockVisaServices } from '@/data/visaServices'

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
  await new Promise((resolve) => setTimeout(resolve, 300))
  return mockVisaServices.find((v) => v.id === id) || null
}

export async function createVisaApplication(data: {
  serviceId: string
  personalDetails: Record<string, string>
  passportDetails: Record<string, string>
  travelDetails: Record<string, string>
}): Promise<{ applicationId: string; status: string }> {
  await new Promise((resolve) => setTimeout(resolve, 1500))
  return {
    applicationId: `LT-VISA-${Date.now().toString(36).toUpperCase()}`,
    status: 'submitted',
  }
}

export async function trackVisaApplication(applicationId: string): Promise<VisaApplication | null> {
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
