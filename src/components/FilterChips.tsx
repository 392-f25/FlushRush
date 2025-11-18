import type { FilterOptions } from '../types';

interface FilterChipsProps {
  filters: FilterOptions;
  onChange: (filters: FilterOptions) => void;
}

const FilterChips = ({ filters, onChange }: FilterChipsProps) => {
  const toggleFilter = (key: keyof FilterOptions) => {
    onChange({
      ...filters,
      [key]: !filters[key],
    });
  };

  const chipBaseClass = "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border-2";
  const activeClass = "bg-purple-600 text-white border-purple-600";
  const inactiveClass = "bg-white text-gray-700 border-gray-300 hover:border-purple-300";

  return (
    <div className="flex flex-wrap gap-2 p-4">
      <button
        onClick={() => toggleFilter('wheelchairAccessible')}
        className={`${chipBaseClass} ${filters.wheelchairAccessible ? activeClass : inactiveClass}`}
        aria-pressed={filters.wheelchairAccessible}
      >
        ♿ Wheelchair Accessible
      </button>
      <button
        onClick={() => toggleFilter('genderNeutral')}
        className={`${chipBaseClass} ${filters.genderNeutral ? activeClass : inactiveClass}`}
        aria-pressed={filters.genderNeutral}
      >
        🚻 Gender Neutral
      </button>
      <button
        onClick={() => toggleFilter('wildcardFree')}
        className={`${chipBaseClass} ${filters.wildcardFree ? activeClass : inactiveClass}`}
        aria-pressed={filters.wildcardFree}
      >
        🔓 No Wildcard Needed
      </button>
    </div>
  );
};

export default FilterChips;
