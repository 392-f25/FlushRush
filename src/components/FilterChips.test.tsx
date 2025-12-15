import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import FilterChips from './FilterChips';
import type { FilterOptions } from '../types';

describe('FilterChips', () => {
  it('renders filter buttons', () => {
    const filters: FilterOptions = { wheelchairAccessible: false, genderNeutral: false, wildcardFree: false, sortByDistance: false };
    const onChange = vi.fn();
    render(<FilterChips filters={filters} onChange={onChange} />);

    expect(screen.getByRole('button', { name: /Wheelchair Accessible/i })).toBeTruthy();
    expect(screen.getByRole('button', { name: /Gender Neutral/i })).toBeTruthy();
    expect(screen.getByRole('button', { name: /No Wildcard Needed/i })).toBeTruthy();

    expect(screen.queryByLabelText(/Clear all filters/i)).toBeNull();
  });

  it('toggles a filter and calls onChange with toggled value', () => {
    const filters: FilterOptions = { wheelchairAccessible: false, genderNeutral: false, wildcardFree: false, sortByDistance: true };
    const onChange = vi.fn();
    render(<FilterChips filters={filters} onChange={onChange} />);

    fireEvent.click(screen.getByRole('button', { name: /Wheelchair Accessible/i }));

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith({
      ...filters,
      wheelchairAccessible: true,
    });
  });

  it('shows clear button when any filter active and clears while preserving sortByDistance', () => {
    const filters: FilterOptions = { wheelchairAccessible: true, genderNeutral: false, wildcardFree: false, sortByDistance: true };
    const onChange = vi.fn();
    render(<FilterChips filters={filters} onChange={onChange} />);

    const clearButton = screen.getByLabelText(/Clear all filters/i);
    expect(clearButton).toBeTruthy();

    fireEvent.click(clearButton);

    expect(onChange).toHaveBeenCalledWith({
      wheelchairAccessible: false,
      genderNeutral: false,
      wildcardFree: false,
      sortByDistance: true,
    });
  });
});
