type SafetySectionProps = {
  openCount: number
  cleaningCount: number
  blockedCount: number
}

const SafetySection = ({ openCount, cleaningCount, blockedCount }: SafetySectionProps) => (
  <div className="rounded-3xl border border-slate-800/70 bg-slate-900/60 p-5 shadow-xl shadow-indigo-500/10">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-indigo-200/80">Safety & reporting</p>
        <h3 className="text-xl font-semibold">Report issues • Live presence</h3>
      </div>
      <div className="rounded-full bg-rose-500/15 px-3 py-1 text-xs text-rose-100">Moderated</div>
    </div>
    <div className="mt-4 space-y-4 text-sm text-slate-200">
      <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold text-white">Flag restroom</p>
            <p className="text-slate-400">Broken door, blocked entry, or unsafe condition</p>
          </div>
          <button className="rounded-full bg-rose-500 px-4 py-2 text-xs font-semibold text-white transition hover:bg-rose-400">Report</button>
        </div>
      </div>
      <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
        <p className="font-semibold text-white">Live presence</p>
        <p className="text-slate-300">Auto-refresh every 60s; tap cards to force refresh.</p>
        <div className="mt-3 grid gap-2 text-xs text-slate-200 sm:grid-cols-3">
          <div className="rounded-xl bg-emerald-500/10 px-3 py-2 text-emerald-100 border border-emerald-500/30">Open • {openCount}</div>
          <div className="rounded-xl bg-amber-500/10 px-3 py-2 text-amber-100 border border-amber-500/30">Cleaning • {cleaningCount}</div>
          <div className="rounded-xl bg-rose-500/10 px-3 py-2 text-rose-100 border border-rose-500/30">Blocked • {blockedCount}</div>
        </div>
      </div>
      <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
        <p className="font-semibold text-white">Accessibility checklist</p>
        <ul className="mt-2 space-y-1 text-slate-200">
          <li>• Step-free entry and 32&quot;+ door width</li>
          <li>• Push-button or auto-open where available</li>
          <li>• Gender-neutral prioritization when requested</li>
          <li>• Wildcard-free options clearly labeled</li>
        </ul>
      </div>
    </div>
  </div>
)

export default SafetySection
