'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  PlusIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
  LifebuoyIcon,
  BuildingOfficeIcon,
  PhoneArrowUpRightIcon,
} from '@heroicons/react/24/outline';
import { FilterChips } from './FilterChips';

type Agent = {
  agent_id: string;
  name: string;
  created_at_unix_secs?: number;
  access_info?: { creator_email?: string };
};

type Template = { id: string; name: string; description: string; icon: React.ReactNode };

const TEMPLATES: Template[] = [
  { id: 'support', name: 'Customer Support', description: 'Customer support representative to field support inquiries', icon: <LifebuoyIcon className="h-5 w-5" /> },
  { id: 'receptionist', name: 'Front Desk Receptionist', description: 'A general front desk receptionist to handle department transfers and inquiries', icon: <BuildingOfficeIcon className="h-5 w-5" /> },
  { id: 'outbound', name: 'Outbound Sales Representative', description: 'Sales rep to conduct outbound and book meetings', icon: <PhoneArrowUpRightIcon className="h-5 w-5" /> },
];

function formatDate(unixSecs?: number): string {
  if (!unixSecs) return '—';
  return new Date(unixSecs * 1000).toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' });
}

export function AgentsListClient({ agents, loadError }: { agents: Agent[]; loadError: string | null }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showTemplates, setShowTemplates] = useState(true);
  const [activeFilters, setActiveFilters] = useState<Set<string>>(new Set());

  const filtered = agents.filter((a) =>
    (a.name || '').toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <>
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <h1 className="text-3xl font-black tracking-tight text-simba-black">Agents</h1>
        <div className="flex items-center gap-2">
          <Link href="/dashboard/agents/templates" className="inline-flex items-center h-9 px-3 rounded-md border border-simba-gray-200 text-sm font-medium text-simba-gray-800 hover:bg-simba-gray-50">
            Browse templates
          </Link>
          <Link href="/dashboard/agents/new" className="inline-flex items-center gap-1 h-9 px-3 rounded-md bg-simba-black text-white text-sm font-semibold hover:bg-simba-gray-800">
            <PlusIcon className="h-4 w-4" /> New agent
          </Link>
        </div>
      </div>

      {showTemplates && (
        <div className="mt-5 rounded-2xl border border-simba-gray-200 bg-simba-gray-50 p-5 relative">
          <button type="button" onClick={() => setShowTemplates(false)} aria-label="Dismiss templates" className="absolute top-3 right-3 h-7 w-7 rounded-md hover:bg-simba-gray-200 flex items-center justify-center text-simba-gray-500">
            <XMarkIcon className="h-4 w-4" />
          </button>
          <div className="text-sm font-bold text-simba-black">Get started with a template</div>
          <div className="text-xs text-simba-gray-600 mt-0.5">Build faster with pre-configured agent templates</div>
          <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {TEMPLATES.map((t) => (
              <Link key={t.id} href="/dashboard/agents/templates" className="text-left rounded-xl border border-simba-gray-200 bg-white p-4 hover:border-simba-gray-300 transition-colors block">
                <div className="flex items-center gap-2">
                  <span className="h-6 w-6 rounded-full bg-gradient-to-br from-simba-blue to-simba-blue-light flex items-center justify-center text-white">
                    <span className="block h-3 w-3 rounded-full bg-white/70" />
                  </span>
                  <span className="text-sm font-semibold text-simba-black">{t.name}</span>
                </div>
                <div className="mt-2 text-xs text-simba-gray-600 leading-relaxed">{t.description}</div>
              </Link>
            ))}
          </div>
          <Link href="/dashboard/agents/templates" className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-simba-black">
            Browse all templates →
          </Link>
        </div>
      )}

      <div className="mt-6 relative">
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-simba-gray-400" />
        <input type="text" placeholder="Search agents..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full rounded-xl border border-simba-gray-200 bg-white pl-9 pr-3 py-2.5 text-sm placeholder:text-simba-gray-400 focus:outline-none focus:ring-2 focus:ring-simba-blue/30 focus:border-simba-blue" />
      </div>

      <div className="mt-3">
        <FilterChips labels={['Creator', 'Archived']} activeFilters={activeFilters} onToggle={(l) => setActiveFilters((prev) => { const n = new Set(prev); n.has(l) ? n.delete(l) : n.add(l); return n; })} />
      </div>

      <div className="mt-6 rounded-2xl border border-simba-gray-200 bg-white overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-white border-b border-simba-gray-100">
              <th className="text-left font-medium text-simba-gray-500 px-5 py-3">Name</th>
              <th className="text-left font-medium text-simba-gray-500 px-5 py-3">Created by</th>
              <th className="text-left font-medium text-simba-gray-500 px-5 py-3"><span className="inline-flex items-center gap-1"><span>↓</span> Created at</span></th>
              <th className="w-10" />
            </tr>
          </thead>
          <tbody>
            {loadError && (
              <tr><td colSpan={4} className="px-5 py-8 text-center text-sm text-simba-gray-500">Couldn&apos;t load agents right now. Try again in a moment.</td></tr>
            )}
            {!loadError && filtered.length === 0 && (
              <tr><td colSpan={4} className="px-5 py-12 text-center text-sm text-simba-gray-500">{searchQuery ? 'No agents match your search.' : 'No agents yet — create your first one.'}</td></tr>
            )}
            {filtered.map((a) => (
              <tr key={a.agent_id} className="border-b border-simba-gray-100 last:border-b-0 hover:bg-simba-gray-50">
                <td className="px-5 py-3"><Link href={`/dashboard/agents/${a.agent_id}`} className="text-simba-black font-medium hover:underline">{a.name || 'Untitled agent'}</Link></td>
                <td className="px-5 py-3 text-simba-gray-600">{a.access_info?.creator_email || '—'}</td>
                <td className="px-5 py-3 text-simba-gray-600">{formatDate(a.created_at_unix_secs)}</td>
                <td className="px-5 py-3 text-right text-simba-gray-400">···</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
