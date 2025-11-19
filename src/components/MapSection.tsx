import type { Restroom } from '../types/restroom'
import StatusPill from './StatusPill'
import Tag from './Tag'

type MapSectionProps = {
  selected: Restroom
  formatDistance: (km: number) => string
}

const MapSection = ({ selected, formatDistance }: MapSectionProps) => (
  <div className="rounded-3xl border border-slate-800/70 bg-slate-900/60 p-5 shadow-2xl shadow-indigo-500/10">
    <div className="flex items-start justify-between gap-2">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-indigo-200/80">Campus map preview</p>
        <h2 className="text-2xl font-semibold leading-tight">Nearest accessible route</h2>
        <p className="text-sm text-slate-300">Tap a card to update; open Maps for live turn-by-turn.</p>
      </div>
      <a
        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selected.building)}`}
        target="_blank"
        rel="noreferrer"
        className="rounded-full bg-indigo-500 px-4 py-2 text-sm font-semibold text-white shadow-lg transition hover:bg-indigo-400"
      >
        Open in Maps
      </a>
    </div>
    <div className="mt-4 grid gap-4">
      <div className="relative h-64 overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-br from-indigo-800/60 via-slate-900 to-slate-950">
        <div className="absolute inset-0 opacity-50 mix-blend-screen">
          <div className="absolute left-8 top-10 h-16 w-16 rounded-full bg-indigo-400/30 blur-3xl" />
          <div className="absolute right-10 bottom-8 h-24 w-24 rounded-full bg-orange-400/20 blur-3xl" />
          <div className="absolute left-1/4 top-1/3 h-8 w-36 rounded-full bg-white/10 blur-2xl" />
        </div>
        <div className="relative flex h-full w-full items-center justify-center">
          <div className="relative h-[80%] w-[88%] rounded-[28px] border border-slate-800/80 bg-slate-950/70 backdrop-blur">
            <div className="absolute left-6 top-6 flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs text-slate-100">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              {selected.name}
            </div>
            <div className="absolute inset-x-0 bottom-0 h-20 rounded-[24px] border-t border-slate-800 bg-slate-950/80 px-4 py-3">
              <div className="flex items-center justify-between text-sm">
                <div>
                  <p className="font-semibold text-white">{selected.building}</p>
                  <p className="text-xs text-slate-300">
                    {formatDistance(selected.distanceKm)} • {selected.walkMins} min walk
                  </p>
                </div>
                <StatusPill status={selected.status} />
              </div>
            </div>
            <div className="absolute inset-0">
              <div className="absolute left-10 top-14 h-3 w-3 rounded-full bg-emerald-400 shadow-[0_0_0_8px_rgba(16,185,129,0.15)]" />
              <div className="absolute right-12 bottom-24 h-3 w-3 rounded-full bg-indigo-300 shadow-[0_0_0_8px_rgba(129,140,248,0.2)]" />
              <div className="absolute left-[24%] top-[55%] h-3 w-3 rounded-full bg-orange-300 shadow-[0_0_0_8px_rgba(253,186,116,0.2)]" />
              <div className="absolute left-10 top-14 right-12 bottom-24">
                <div className="h-full w-full rounded-[22px] border border-white/5 bg-white/5" />
                <div className="absolute inset-6 rounded-[18px] border border-white/10" />
                <div className="absolute left-12 right-16 top-10 h-[2px] bg-white/10" />
                <div className="absolute left-14 right-14 top-20 h-[2px] bg-white/10" />
                <div className="absolute inset-0">
                  <div className="absolute left-10 top-12 h-1 w-20 rounded-full bg-emerald-400/80 blur-[2px]" />
                  <div className="absolute left-28 top-12 h-24 w-1 rounded-full bg-emerald-400/50 blur-[2px]" />
                  <div className="absolute left-28 top-32 h-1 w-36 rounded-full bg-indigo-300/70 blur-[2px]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-indigo-200/80">Route</p>
              <p className="text-lg font-semibold">Estimated {selected.walkMins} min</p>
              <p className="text-sm text-slate-300">On-campus walking speed</p>
            </div>
            <div className="rounded-xl bg-indigo-500/20 px-3 py-2 text-xs text-indigo-100">{formatDistance(selected.distanceKm)}</div>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {selected.tags.map((tag) => (
              <Tag key={tag} label={tag} />
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-indigo-200/80">Access details</p>
          <p className="text-lg font-semibold">{selected.floor}</p>
          <p className="text-sm text-slate-300">{selected.notes}</p>
          <div className="mt-3 flex gap-2 text-sm text-slate-200/80">
            <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-emerald-100">Accessible</span>
            {selected.genderNeutral && <span className="rounded-full bg-white/10 px-3 py-1 text-white">Gender-neutral</span>}
            {selected.wildcardFree && <span className="rounded-full bg-amber-500/20 px-3 py-1 text-amber-100">No Wildcard</span>}
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default MapSection
