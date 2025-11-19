import type { Restroom } from '../types/restroom'
import StatusPill from './StatusPill'
import Tag from './Tag'

type RestroomListProps = {
  restrooms: Restroom[]
  selectedId: string
  onSelect: (id: string) => void
  formatDistance: (km: number) => string
}

const RestroomList = ({ restrooms, selectedId, onSelect, formatDistance }: RestroomListProps) => (
  <div className="flex max-h-[720px] flex-col gap-4 overflow-hidden rounded-3xl border border-slate-800/70 bg-slate-900/60 p-4 shadow-2xl shadow-indigo-500/10">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-indigo-200/80">Nearby bathrooms</p>
        <h2 className="text-xl font-semibold">Filtered results</h2>
      </div>
      <span className="rounded-full bg-slate-800/70 px-3 py-1 text-xs text-slate-200">
        {restrooms.length} match{restrooms.length === 1 ? '' : 'es'}
      </span>
    </div>
    <div className="flex flex-1 flex-col gap-3 overflow-y-auto pr-1">
      {restrooms.map((restroom) => (
        <button
          key={restroom.id}
          onClick={() => onSelect(restroom.id)}
          className={`flex flex-col gap-2 rounded-2xl border p-4 text-left transition ${
            restroom.id === selectedId
              ? 'border-indigo-400/70 bg-indigo-500/10 shadow-[0_18px_40px_-20px_rgba(99,102,241,0.7)]'
              : 'border-slate-800 bg-slate-900/80 hover:border-indigo-400/50'
          }`}
        >
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-sm uppercase tracking-wide text-indigo-100/90">{restroom.name}</p>
              <p className="text-lg font-semibold">{restroom.building}</p>
              <p className="text-sm text-slate-300">
                {formatDistance(restroom.distanceKm)} • {restroom.walkMins} min walk
              </p>
            </div>
            <div className="text-right text-sm text-slate-200">
              <p className="font-semibold">{restroom.rating.toFixed(1)} ★</p>
              <p className="text-xs text-slate-400">{restroom.reviewsCount} reviews</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <StatusPill status={restroom.status} />
            {restroom.genderNeutral && <Tag label="Gender-neutral" />}
            {restroom.wildcardFree && <Tag label="Wildcard-free" />}
            {restroom.accessible && <Tag label="Accessible" />}
          </div>
          <p className="text-sm text-slate-200/80">{restroom.notes}</p>
        </button>
      ))}
      {!restrooms.length && (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 text-sm text-slate-200">
          No matches with these filters. Try turning off a chip or choose &quot;Top rated&quot;.
        </div>
      )}
    </div>
  </div>
)

export default RestroomList
