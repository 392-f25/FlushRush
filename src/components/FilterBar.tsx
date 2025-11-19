import FilterChip from './FilterChip'
import type { FilterState } from '../types/restroom'

type FilterBarProps = {
  filters: FilterState
  onToggle: (key: keyof Omit<FilterState, 'sortBy'>) => void
  onSortChange: (mode: FilterState['sortBy']) => void
}

const FilterBar = ({ filters, onToggle, onSortChange }: FilterBarProps) => (
  <section className="sticky top-0 z-10 -mx-4 mb-2 bg-gradient-to-b from-slate-950 via-slate-950/95 to-transparent px-4 pb-2 pt-4 sm:px-6 lg:px-10">
    <div className="flex flex-wrap items-center gap-3">
      <FilterChip label="Wheelchair ready" hint="Prioritize accessible" active={filters.wheelchair} onClick={() => onToggle('wheelchair')} />
      <FilterChip label="Gender-neutral" active={filters.genderNeutral} onClick={() => onToggle('genderNeutral')} />
      <FilterChip label="Wildcard-free" hint="No scan" active={filters.wildcardFree} onClick={() => onToggle('wildcardFree')} />
      <FilterChip label="Open now" active={filters.openNow} onClick={() => onToggle('openNow')} />
      <div className="ml-auto flex gap-2 rounded-full bg-slate-900/60 p-1 text-sm font-medium">
        <button
          className={`rounded-full px-3 py-1 ${filters.sortBy === 'distance' ? 'bg-white text-slate-900' : 'text-slate-300'}`}
          onClick={() => onSortChange('distance')}
        >
          Closest
        </button>
        <button
          className={`rounded-full px-3 py-1 ${filters.sortBy === 'rating' ? 'bg-white text-slate-900' : 'text-slate-300'}`}
          onClick={() => onSortChange('rating')}
        >
          Top rated
        </button>
      </div>
    </div>
  </section>
)

export default FilterBar
