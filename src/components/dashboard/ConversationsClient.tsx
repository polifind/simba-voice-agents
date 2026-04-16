'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MagnifyingGlassIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { FilterChips } from './FilterChips';

type Conversation = {
  conversation_id: string;
  agent_id: string;
  agent_name?: string;
  start_time_unix_secs?: number;
  call_duration_secs?: number;
  message_count?: number;
  status?: string;
  call_successful?: string;
};

function formatDate(unixSecs?: number): string {
  if (!unixSecs) return '—';
  return new Date(unixSecs * 1000).toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' });
}

function formatDuration(secs?: number): string {
  if (!secs) return '—';
  const m = Math.floor(secs / 60);
  const s = Math.round(secs % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

function StatusBadge({ status }: { status?: string }) {
  const label = status || 'unknown';
  const isSuccess = label === 'done' || label === 'successful' || label === 'success';
  return (
    <span className={clsx('inline-block rounded-full px-2.5 py-0.5 text-xs font-medium capitalize', isSuccess ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-simba-gray-100 text-simba-gray-600')}>
      {isSuccess ? 'Successful' : label}
    </span>
  );
}

const FILTER_LABELS = ['Date After', 'Date Before', 'Call status', 'Criteria', 'Data', 'Duration', 'Rating', 'Comments', 'Agent', 'Tools', 'Language', 'User', 'Channel'];

export function ConversationsClient({ conversations }: { conversations: Conversation[] }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<Set<string>>(new Set());

  const filtered = conversations.filter((c) => {
    const q = searchQuery.toLowerCase();
    if (!q) return true;
    return (
      (c.agent_name || '').toLowerCase().includes(q) ||
      (c.conversation_id || '').toLowerCase().includes(q) ||
      (c.call_successful || c.status || '').toLowerCase().includes(q)
    );
  });

  return (
    <>
      <h1 className="text-3xl font-black tracking-tight text-simba-black">Conversation history</h1>

      <div className="mt-5 relative">
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-simba-gray-400" />
        <input type="text" placeholder="Search conversations..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full rounded-xl border border-simba-gray-200 bg-white pl-9 pr-3 py-2.5 text-sm placeholder:text-simba-gray-400 focus:outline-none focus:ring-2 focus:ring-simba-blue/30 focus:border-simba-blue" />
      </div>

      <div className="mt-3">
        <FilterChips labels={FILTER_LABELS} activeFilters={activeFilters} onToggle={(l) => setActiveFilters((prev) => { const n = new Set(prev); n.has(l) ? n.delete(l) : n.add(l); return n; })} />
      </div>

      <div className="mt-6">
        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-simba-gray-200 bg-white py-20 px-6 flex flex-col items-center text-center">
            <div className="h-10 w-10 text-simba-gray-400 mb-4"><ChatBubbleLeftRightIcon /></div>
            <div className="text-sm font-semibold text-simba-black">{searchQuery ? 'No conversations match your search' : 'No conversations yet'}</div>
            <div className="mt-1 text-sm text-simba-gray-500">
              {searchQuery ? 'Try a different search term.' : 'Conversations will appear here once users start interacting with your agents.'}
            </div>
          </div>
        ) : (
          <div className="rounded-2xl border border-simba-gray-200 bg-white overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-simba-gray-100 bg-white">
                  <th className="text-left font-medium text-simba-gray-500 px-5 py-3">Date</th>
                  <th className="text-left font-medium text-simba-gray-500 px-5 py-3">Agent</th>
                  <th className="text-left font-medium text-simba-gray-500 px-5 py-3">Duration</th>
                  <th className="text-left font-medium text-simba-gray-500 px-5 py-3">Messages</th>
                  <th className="text-left font-medium text-simba-gray-500 px-5 py-3">Call status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((c) => (
                  <tr key={c.conversation_id} className="border-b border-simba-gray-100 last:border-b-0 hover:bg-simba-gray-50 cursor-pointer">
                    <td className="px-5 py-3 text-simba-gray-800"><Link href={`/dashboard/conversations/${c.conversation_id}`} className="hover:underline">{formatDate(c.start_time_unix_secs)}</Link></td>
                    <td className="px-5 py-3 text-simba-gray-800">{c.agent_name || c.agent_id || '—'}</td>
                    <td className="px-5 py-3 text-simba-gray-800">{formatDuration(c.call_duration_secs)}</td>
                    <td className="px-5 py-3 text-simba-gray-800">{c.message_count ?? '—'}</td>
                    <td className="px-5 py-3"><StatusBadge status={c.call_successful ?? c.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
