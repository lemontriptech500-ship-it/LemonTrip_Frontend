import { mockTrains } from '@/data/trains'

export interface TrainSearchResult {
  trains: typeof mockTrains
  total: number
}

export async function searchTrains(params: {
  from?: string
  to?: string
  date?: string
  trainClass?: string
  quota?: string
}): Promise<TrainSearchResult> {
  await new Promise((resolve) => setTimeout(resolve, 800))

  let results = [...mockTrains]

  if (params.from) {
    results = results.filter((t) =>
      t.from.toLowerCase().includes(params.from!.toLowerCase())
    )
  }
  if (params.to) {
    results = results.filter((t) =>
      t.to.toLowerCase().includes(params.to!.toLowerCase())
    )
  }

  return { trains: results, total: results.length }
}

export async function getTrainById(id: string) {
  await new Promise((resolve) => setTimeout(resolve, 300))
  return mockTrains.find((t) => t.id === id) || null
}

export async function createTrainBooking(data: {
  trainId: string
  trainClass: string
  passengers: unknown[]
  contact: { email: string; phone: string }
}): Promise<{ bookingId: string; status: string }> {
  await new Promise((resolve) => setTimeout(resolve, 1500))
  return {
    bookingId: `LT-TR-${Date.now().toString(36).toUpperCase()}`,
    status: 'confirmed',
  }
}
