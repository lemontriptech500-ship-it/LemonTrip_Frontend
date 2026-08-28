export interface TrainOption {
  id: string
  number: string
  name: string
  from: string
  to: string
  departure: string
  arrival: string
  duration: string
  classes: string[]
  price: string
}

export const mockTrains: TrainOption[] = [
  { id: 'train-1', number: '12951', name: 'Mumbai Rajdhani', from: 'Mumbai', to: 'Delhi', departure: '17:00', arrival: '08:35', duration: '15h 35m', classes: ['1A', '2A', '3A'], price: 'From INR 2,450' },
  { id: 'train-2', number: '12002', name: 'Bhopal Shatabdi', from: 'New Delhi', to: 'Bhopal', departure: '06:00', arrival: '14:40', duration: '8h 40m', classes: ['CC', 'EC'], price: 'From INR 1,280' },
  { id: 'train-3', number: '22691', name: 'Rajdhani Express', from: 'Bengaluru', to: 'New Delhi', departure: '20:20', arrival: '05:55', duration: '33h 35m', classes: ['2A', '3A'], price: 'From INR 2,150' },
]
