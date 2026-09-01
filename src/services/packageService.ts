import { popularPackages } from '@/data/packages'

export async function searchPackages(params: {
  destination?: string
  month?: string
  travellers?: string
}) {
  await new Promise((resolve) => setTimeout(resolve, 800))

  let results = [...popularPackages]

  if (params.destination) {
    const dest = params.destination.toLowerCase()
    results = results.filter((p) =>
      p.destination.toLowerCase().includes(dest)
    )
  }

  return { packages: results, total: results.length }
}

export async function getPackageById(id: string) {
  await new Promise((resolve) => setTimeout(resolve, 300))
  return popularPackages.find((p) => p.id === id) || null
}

export async function createPackageBooking(data: {
  packageId: string
  startDate: string
  travellers: number
  contact: { email: string; phone: string }
}): Promise<{ bookingId: string; status: string }> {
  await new Promise((resolve) => setTimeout(resolve, 1500))
  return {
    bookingId: `LT-PK-${Date.now().toString(36).toUpperCase()}`,
    status: 'confirmed',
  }
}
