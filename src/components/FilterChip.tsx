type FilterChipProps = {
  label: string
  hint?: string
  active: boolean
  onClick: () => void
}

const FilterChip = ({ label, hint, active, onClick }: FilterChipProps) => (
  <button
    aria-pressed={active}
    onClick={onClick}
    className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition ${
      active
        ? 'bg-indigo-500/20 border-indigo-400/60 text-indigo-100 shadow-[0_10px_30px_-12px_rgba(99,102,241,0.65)]'
        : 'bg-slate-900/50 border-slate-800 text-slate-200 hover:border-indigo-400/60 hover:text-indigo-50'
    }`}
  >
    <span>{label}</span>
    {hint && <span className="hidden text-xs text-slate-400 sm:inline">{hint}</span>}
  </button>
)

export default FilterChip
