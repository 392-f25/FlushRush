import type { FilterState, Restroom } from '../types/restroom'

type HeroSectionProps = {
  topMatch?: Restroom
  filters: FilterState
  liveCountdown: number
  onQuickFind: () => void
}

const HeroSection = ({ topMatch, filters, liveCountdown, onQuickFind }: HeroSectionProps) => (
  <header className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-purple-600 to-orange-400 p-[1px] shadow-2xl">
    <div className="relative flex flex-col gap-6 rounded-3xl bg-slate-950/90 p-6 sm:p-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-2">
          <p className="text-sm uppercase tracking-[0.2em] text-indigo-200/90">FlushRush • Northwestern</p>
          <h1 className="text-3xl font-semibold leading-tight sm:text-4xl">Find accessible bathrooms around you in seconds.</h1>
          <p className="max-w-2xl text-slate-200/80">
            Mobile-first map, filters for mobility + gender inclusivity, live availability, and one-tap navigation.
          </p>
          <div className="flex flex-wrap gap-3 text-sm text-indigo-100/90">
            <span className="rounded-full bg-indigo-500/20 px-3 py-1 border border-indigo-300/40">Wheelchair-first</span>
            <span className="rounded-full bg-white/10 px-3 py-1 border border-white/20">Wildcard scan-aware</span>
            <span className="rounded-full bg-amber-500/15 px-3 py-1 border border-amber-200/30">Live status</span>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <button
            onClick={onQuickFind}
            className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 text-lg font-semibold text-slate-900 shadow-[0_18px_40px_-20px_rgba(255,255,255,0.4)] transition hover:-translate-y-[1px] hover:shadow-[0_22px_50px_-20px_rgba(255,255,255,0.5)]"
          >
            <span>Find accessible bathroom near me</span>
            <span className="rounded-full bg-slate-900 text-white px-2 py-[2px] text-xs">Go</span>
          </button>
          <div className="flex items-center gap-3 text-sm text-slate-200/80">
            <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
            <span>Live campus availability • refreshes in {liveCountdown}s</span>
          </div>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <p className="text-sm text-indigo-100/80">Nearest match</p>
          <p className="text-2xl font-semibold">{topMatch ? topMatch.name : 'No match yet'}</p>
          {topMatch && <p className="text-sm text-slate-200/70">{Math.round(topMatch.distanceKm * 1000)} m • {topMatch.walkMins} min</p>}
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <p className="text-sm text-indigo-100/80">Preferences saved</p>
          <p className="text-2xl font-semibold">
            {filters.wheelchair ? 'Wheelchair' : 'General'} {filters.genderNeutral ? '• Gender-neutral' : ''}
          </p>
          <p className="text-sm text-slate-200/70">Quick toggle chips below</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <p className="text-sm text-indigo-100/80">Campus focus</p>
          <p className="text-xl font-semibold">Northwestern Evanston</p>
          <p className="text-sm text-slate-200/70">Inline map + external navigation</p>
        </div>
      </div>
    </div>
    <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-white/10 to-transparent" aria-hidden />
    <div className="absolute -left-12 bottom-0 h-32 w-32 rounded-full bg-white/10 blur-3xl" aria-hidden />
  </header>
)

export default HeroSection
