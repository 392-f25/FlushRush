import { useEffect, useMemo, useState } from 'react'
import BottomNav from './components/BottomNav'
import FilterBar from './components/FilterBar'
import HeroSection from './components/HeroSection'
import MapSection from './components/MapSection'
import RestroomList from './components/RestroomList'
import ReviewSection from './components/ReviewSection'
import SafetySection from './components/SafetySection'
import type { FilterState, Restroom, Review } from './types/restroom'

const restroomData: Restroom[] = [
  {
    id: 'tech',
    name: 'Tech Lounge',
    building: 'Technological Institute (L Wing)',
    distanceKm: 0.18,
    walkMins: 3,
    accessible: true,
    genderNeutral: true,
    wildcardFree: false,
    status: 'open',
    floor: '1st floor by elevator',
    notes: 'Automatic door, wide turning radius, powered sink controls.',
    rating: 4.8,
    reviewsCount: 48,
    tags: ['Wheelchair ready', 'Single-stall', 'Sensor faucet'],
  },
  {
    id: 'norris',
    name: 'Norris Hub',
    building: 'Norris Center',
    distanceKm: 0.32,
    walkMins: 6,
    accessible: true,
    genderNeutral: true,
    wildcardFree: true,
    status: 'open',
    floor: 'Ground floor near Starbucks',
    notes: 'No Wildcard scan required. Elevator within 20 ft.',
    rating: 4.6,
    reviewsCount: 62,
    tags: ['Wildcard-free', 'Family room', 'Power door'],
  },
  {
    id: 'library',
    name: 'Main Library Quiet',
    building: 'Main Library (East)',
    distanceKm: 0.48,
    walkMins: 9,
    accessible: true,
    genderNeutral: false,
    wildcardFree: false,
    status: 'cleaning',
    floor: '2nd floor near silent study',
    notes: 'Cleaning until :15 past the hour. Spacious stalls.',
    rating: 4.2,
    reviewsCount: 31,
    tags: ['Spacious', 'Changing table'],
  },
  {
    id: 'unihall',
    name: 'University Hall',
    building: 'University Hall',
    distanceKm: 0.62,
    walkMins: 12,
    accessible: true,
    genderNeutral: true,
    wildcardFree: false,
    status: 'open',
    floor: 'Lower level near elevator',
    notes: 'Ramp entry; automatic push-button door.',
    rating: 4.4,
    reviewsCount: 27,
    tags: ['Ramp', 'Push button', 'Bright lighting'],
  },
  {
    id: 'kresge',
    name: 'Kresge Atrium',
    building: 'Kresge Hall',
    distanceKm: 0.76,
    walkMins: 14,
    accessible: false,
    genderNeutral: false,
    wildcardFree: true,
    status: 'blocked',
    floor: '1st floor west hallway',
    notes: 'Temporarily blocked due to maintenance.',
    rating: 3.1,
    reviewsCount: 12,
    tags: ['Wildcard-free'],
  },
]

const initialReviews: Review[] = [
  {
    id: 'r1',
    restroomId: 'tech',
    author: 'Alex K.',
    rating: 5,
    note: 'Auto-door + wide turning radius. Quiet even at lunch.',
    time: '2m ago',
  },
  {
    id: 'r2',
    restroomId: 'norris',
    author: 'Maya P.',
    rating: 4,
    note: 'Easy to reach from lakefill path, no scan needed.',
    time: '12m ago',
  },
  {
    id: 'r3',
    restroomId: 'library',
    author: 'Sam R.',
    rating: 4,
    note: 'Cleaner finishes fast; worth the short wait.',
    time: '25m ago',
  },
]

const formatDistance = (km: number) => `${Math.round(km * 1000)} m`

const filterRestrooms = (data: Restroom[], filters: FilterState) => {
  const base = data.filter((r) => {
    if (filters.wheelchair && !r.accessible) return false
    if (filters.genderNeutral && !r.genderNeutral) return false
    if (filters.wildcardFree && !r.wildcardFree) return false
    if (filters.openNow && r.status !== 'open') return false
    return true
  })

  base.sort((a, b) => {
    if (filters.sortBy === 'distance') return a.distanceKm - b.distanceKm
    return b.rating - a.rating
  })

  return base
}

const App = () => {
  const [filters, setFilters] = useState<FilterState>({
    wheelchair: true,
    genderNeutral: false,
    wildcardFree: false,
    openNow: false,
    sortBy: 'distance',
  })
  const [selectedRestroomId, setSelectedRestroomId] = useState<string>(restroomData[0].id)
  const [liveCountdown, setLiveCountdown] = useState(55)
  const [reviews, setReviews] = useState<Review[]>(initialReviews)
  const [reviewDraft, setReviewDraft] = useState('')

  const filtered = useMemo(() => filterRestrooms(restroomData, filters), [filters])

  useEffect(() => {
    const id = setInterval(() => {
      setLiveCountdown((prev) => (prev <= 0 ? 60 : prev - 1))
    }, 1000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    if (filtered.length && !filtered.find((r) => r.id === selectedRestroomId)) {
      setSelectedRestroomId(filtered[0].id)
    }
  }, [filtered, selectedRestroomId])

  const selected = useMemo(
    () => filtered.find((r) => r.id === selectedRestroomId) ?? filtered[0] ?? restroomData[0],
    [filtered, selectedRestroomId],
  )

  const statusCounts = useMemo(
    () =>
      restroomData.reduce(
        (acc, restroom) => {
          acc[restroom.status] += 1
          return acc
        },
        { open: 0, cleaning: 0, blocked: 0 },
      ),
    [],
  )

  const handleToggleFilter = (key: keyof Omit<FilterState, 'sortBy'>) => {
    setFilters((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const handleSortChange = (mode: FilterState['sortBy']) => setFilters((prev) => ({ ...prev, sortBy: mode }))

  const quickFind = () => {
    const quickFilters: FilterState = {
      wheelchair: true,
      genderNeutral: true,
      wildcardFree: true,
      openNow: true,
      sortBy: 'distance',
    }
    const next = filterRestrooms(restroomData, quickFilters)
    setFilters(quickFilters)
    if (next.length) setSelectedRestroomId(next[0].id)
  }

  const handleAddReview = () => {
    if (!reviewDraft.trim()) return
    const nextReview: Review = {
      id: crypto.randomUUID(),
      restroomId: selected.id,
      author: 'You',
      rating: 5,
      note: reviewDraft.trim(),
      time: 'Just now',
    }
    setReviews((prev) => [nextReview, ...prev])
    setReviewDraft('')
  }

  const restroomReviews = reviews.filter((r) => r.restroomId === selected.id)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-slate-50">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 pb-24 pt-8 sm:px-6 lg:px-10">
        <HeroSection topMatch={filtered[0]} filters={filters} liveCountdown={liveCountdown} onQuickFind={quickFind} />
        <FilterBar filters={filters} onToggle={handleToggleFilter} onSortChange={handleSortChange} />
        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <MapSection selected={selected} formatDistance={formatDistance} />
          <RestroomList restrooms={filtered} selectedId={selected.id} onSelect={setSelectedRestroomId} formatDistance={formatDistance} />
        </section>
        <section className="grid gap-6 lg:grid-cols-2">
          <ReviewSection selected={selected} reviews={restroomReviews} draft={reviewDraft} onDraftChange={setReviewDraft} onAddReview={handleAddReview} />
          <SafetySection
            openCount={statusCounts.open}
            cleaningCount={statusCounts.cleaning}
            blockedCount={statusCounts.blocked}
          />
        </section>
      </div>
      <BottomNav />
    </div>
  )
}

export default App
