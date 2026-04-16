'use client';

import { PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

type Props = {
  labels: string[];
  activeFilters?: Set<string>;
  onToggle?: (label: string) => void;
};

export function FilterChips({ labels, activeFilters, onToggle }: Props) {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      {labels.map((label) => {
        const active = activeFilters?.has(label) ?? false;
        return (
          <button
            key={label}
            type="button"
            onClick={() => onToggle?.(label)}
            className={clsx(
              'inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-medium transition-colors',
              active
                ? 'border-simba-black bg-simba-black text-white'
                : 'border-simba-gray-200 bg-white text-simba-gray-700 hover:bg-simba-gray-50',
            )}
          >
            {active ? <XMarkIcon className="h-3 w-3" /> : <PlusIcon className="h-3 w-3" />}
            {label}
          </button>
        );
      })}
    </div>
  );
}
