'use client';

import { useState } from 'react';
import { MagnifyingGlassIcon, UsersIcon } from '@heroicons/react/24/outline';
import { FilterChips } from './FilterChips';

export function UsersClient() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<Set<string>>(new Set());

  const toggleFilter = (label: string) => {
    setActiveFilters((prev) => {
      const n = new Set(prev);
      n.has(label) ? n.delete(label) : n.add(label);
      return n;
    });
  };

  return (
    <>
      <h1 className="text-3xl font-black tracking-tight text-simba-black">Users</h1>

      <div className="mt-5 relative">
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-simba-gray-400" />
        <input
          type="text"
          placeholder="Search users by ID..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full rounded-xl border border-simba-gray-200 bg-white pl-9 pr-3 py-2.5 text-sm placeholder:text-simba-gray-400 focus:outline-none focus:ring-2 focus:ring-simba-blue/30 focus:border-simba-blue"
        />
      </div>

      <div className="mt-3">
        <FilterChips
          labels={['Date After', 'Date Before', 'Agent', 'Branch']}
          activeFilters={activeFilters}
          onToggle={toggleFilter}
        />
      </div>

      <div className="mt-6 rounded-2xl border border-simba-gray-200 bg-white py-20 px-6 flex flex-col items-center text-center">
        <div className="h-10 w-10 text-simba-gray-400 mb-4"><UsersIcon /></div>
        <div className="text-sm font-semibold text-simba-black">No users found</div>
        <div className="mt-1 text-sm text-simba-gray-500">No users have interacted with your agents yet.</div>
      </div>
    </>
  );
}
