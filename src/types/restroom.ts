export type RestroomStatus = 'open' | 'cleaning' | 'blocked'

export type Restroom = {
  id: string
  name: string
  building: string
  distanceKm: number
  walkMins: number
  accessible: boolean
  genderNeutral: boolean
  wildcardFree: boolean
  status: RestroomStatus
  floor: string
  notes: string
  rating: number
  reviewsCount: number
  tags: string[]
}

export type FilterState = {
  wheelchair: boolean
  genderNeutral: boolean
  wildcardFree: boolean
  openNow: boolean
  sortBy: 'distance' | 'rating'
}

export type Review = {
  id: string
  restroomId: string
  author: string
  rating: number
  note: string
  time: string
}
