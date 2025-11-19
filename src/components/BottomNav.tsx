const BottomNav = () => (
  <nav className="fixed inset-x-0 bottom-0 z-20 border-t border-slate-800/80 bg-slate-950/90 backdrop-blur">
    <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 text-sm text-slate-200 sm:px-6 lg:px-10">
      <div className="flex items-center gap-2">
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-indigo-500 text-lg font-bold text-white">FR</span>
        <div>
          <p className="font-semibold text-white">FlushRush</p>
          <p className="text-xs text-slate-400">Inclusive campus restrooms</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button className="rounded-full bg-slate-800 px-4 py-2 text-xs text-white transition hover:bg-slate-700">Filters</button>
        <button className="rounded-full bg-indigo-500 px-4 py-2 text-xs font-semibold text-white transition hover:bg-indigo-400">
          Start navigation
        </button>
      </div>
    </div>
  </nav>
)

export default BottomNav
