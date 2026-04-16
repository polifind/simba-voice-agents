'use client';

import { useState } from 'react';
import clsx from 'clsx';
import { ChartBarIcon, PlusIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { Modal } from './Modal';
import { Toast, useToast } from './Toast';

type Agent = { agent_id: string; name: string };
type Stat = { label: string; value: string };

const TABS = ['General', 'Evaluation', 'Data Collection', 'Audio', 'Tools', 'LLMs', 'Knowledge Base', 'Advanced'] as const;
const DATE_RANGES = ['Last week', 'Last month', 'Last 3 months', 'All time'] as const;
const GRANULARITIES = ['Hour', 'Day', 'Week', 'Month'] as const;

export function DashboardHomeClient({
  name,
  greeting,
  stats,
  agentCount,
  agents,
}: {
  name: string;
  greeting: string;
  stats: Stat[];
  agentCount: number;
  agents: Agent[];
}) {
  const [activeTab, setActiveTab] = useState(0);
  const [dateRange, setDateRange] = useState<string>('Last week');
  const [granularity, setGranularity] = useState<string>('Day');
  const [selectedAgent, setSelectedAgent] = useState('All');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showGranularity, setShowGranularity] = useState(false);
  const [showAgentPicker, setShowAgentPicker] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [viewName, setViewName] = useState('');
  const { toast, showToast, dismiss } = useToast();

  const inputCls = 'w-full rounded-xl border border-simba-gray-200 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-simba-blue/30 focus:border-simba-blue placeholder:text-simba-gray-400';

  return (
    <>
      {/* Status row */}
      <div className="flex items-center justify-between">
        <div className="inline-flex items-center gap-2 rounded-full border border-simba-gray-200 bg-white px-3 py-1 text-xs text-simba-gray-700">
          <span className="h-2 w-2 rounded-full bg-simba-gray-500" />
          Active calls: <span className="font-semibold text-simba-black">0</span>
        </div>
      </div>

      {/* Greeting */}
      <div className="mt-8">
        <div className="text-xs uppercase tracking-wider text-simba-gray-500">My Workspace</div>
        <h1 className="mt-1 text-3xl sm:text-4xl font-black tracking-tight text-simba-black">{greeting}, {name}</h1>
      </div>

      {/* Tabs */}
      <div className="mt-8 border-b border-simba-gray-200 overflow-x-auto">
        <div className="flex items-center gap-6 min-w-max">
          {TABS.map((tab, i) => (
            <button key={tab} type="button" onClick={() => setActiveTab(i)} className={clsx('pb-3 text-sm transition-colors border-b-2 -mb-px whitespace-nowrap', activeTab === i ? 'border-simba-black text-simba-black font-semibold' : 'border-transparent text-simba-gray-500 hover:text-simba-gray-700')}>
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Filter row */}
      <div className="mt-5 flex flex-wrap items-center gap-2">
        <button type="button" onClick={() => setShowViewModal(true)} className="inline-flex items-center gap-1 rounded-full border border-simba-gray-200 bg-white px-3 py-1 text-xs font-medium text-simba-gray-700 hover:bg-simba-gray-50">
          <PlusIcon className="h-3 w-3" /> Create view
        </button>

        {/* Date Range */}
        <div className="relative">
          <button type="button" onClick={() => { setShowDatePicker(!showDatePicker); setShowGranularity(false); setShowAgentPicker(false); }} className="inline-flex items-center gap-2 rounded-full border border-simba-gray-200 bg-white px-3 py-1 text-xs text-simba-gray-700 hover:bg-simba-gray-50">
            <span className="text-simba-gray-500">Date Range</span>
            <span className="font-medium text-simba-black">{dateRange}</span>
            <ChevronDownIcon className="h-3 w-3" />
          </button>
          {showDatePicker && (
            <div className="absolute top-full mt-1 left-0 z-20 w-44 rounded-xl border border-simba-gray-200 bg-white shadow-lg py-1">
              {DATE_RANGES.map((r) => (
                <button key={r} type="button" onClick={() => { setDateRange(r); setShowDatePicker(false); }} className={clsx('w-full text-left px-3 py-2 text-xs hover:bg-simba-gray-50', dateRange === r ? 'font-semibold text-simba-black' : 'text-simba-gray-700')}>
                  {r}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Granularity */}
        <div className="relative">
          <button type="button" onClick={() => { setShowGranularity(!showGranularity); setShowDatePicker(false); setShowAgentPicker(false); }} className="inline-flex items-center gap-2 rounded-full border border-simba-gray-200 bg-white px-3 py-1 text-xs text-simba-gray-700 hover:bg-simba-gray-50">
            <span className="text-simba-gray-500">Granularity</span>
            <span className="font-medium text-simba-black">{granularity}</span>
            <ChevronDownIcon className="h-3 w-3" />
          </button>
          {showGranularity && (
            <div className="absolute top-full mt-1 left-0 z-20 w-36 rounded-xl border border-simba-gray-200 bg-white shadow-lg py-1">
              {GRANULARITIES.map((g) => (
                <button key={g} type="button" onClick={() => { setGranularity(g); setShowGranularity(false); }} className={clsx('w-full text-left px-3 py-2 text-xs hover:bg-simba-gray-50', granularity === g ? 'font-semibold text-simba-black' : 'text-simba-gray-700')}>
                  {g}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Agent */}
        <div className="relative">
          <button type="button" onClick={() => { setShowAgentPicker(!showAgentPicker); setShowDatePicker(false); setShowGranularity(false); }} className="inline-flex items-center gap-2 rounded-full border border-simba-gray-200 bg-white px-3 py-1 text-xs text-simba-gray-700 hover:bg-simba-gray-50">
            <span className="font-medium text-simba-black">{selectedAgent === 'All' ? 'Agent' : selectedAgent}</span>
            <ChevronDownIcon className="h-3 w-3" />
          </button>
          {showAgentPicker && (
            <div className="absolute top-full mt-1 left-0 z-20 w-52 rounded-xl border border-simba-gray-200 bg-white shadow-lg py-1 max-h-48 overflow-y-auto">
              <button type="button" onClick={() => { setSelectedAgent('All'); setShowAgentPicker(false); }} className={clsx('w-full text-left px-3 py-2 text-xs hover:bg-simba-gray-50', selectedAgent === 'All' ? 'font-semibold text-simba-black' : 'text-simba-gray-700')}>
                All agents
              </button>
              {agents.map((a) => (
                <button key={a.agent_id} type="button" onClick={() => { setSelectedAgent(a.name); setShowAgentPicker(false); }} className={clsx('w-full text-left px-3 py-2 text-xs hover:bg-simba-gray-50 truncate', selectedAgent === a.name ? 'font-semibold text-simba-black' : 'text-simba-gray-700')}>
                  {a.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {activeTab === 0 ? (
        <>
          {/* Stat strip */}
          <div className="mt-5 rounded-2xl border border-simba-gray-200 bg-white overflow-hidden">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 divide-y md:divide-y-0 md:divide-x divide-simba-gray-200">
              {stats.map((s, i) => (
                <div key={s.label} className={clsx('px-5 py-4', i === 0 && 'relative')}>
                  <div className="text-xs text-simba-gray-500">{s.label}</div>
                  <div className="mt-2 text-lg font-black text-simba-black">{s.value}</div>
                  {i === 0 && <span className="absolute left-0 bottom-0 h-0.5 w-full bg-simba-black" />}
                </div>
              ))}
            </div>
            <div className="h-60 flex flex-col items-center justify-center text-simba-gray-500">
              <ChartBarIcon className="h-10 w-10 text-simba-gray-300" />
              <div className="mt-3 text-sm">No data has been collected</div>
            </div>
          </div>

          <div className="mt-5 grid md:grid-cols-2 gap-5">
            <div className="rounded-2xl border border-simba-gray-200 bg-white p-5">
              <div className="text-sm font-semibold text-simba-black">Overall Success Rate</div>
              <div className="mt-3 text-3xl font-black text-simba-gray-300">---</div>
            </div>
            <div className="rounded-2xl border border-simba-gray-200 bg-white p-5">
              <div className="text-sm font-semibold text-simba-black">Average CSAT Rating</div>
              <div className="mt-3 text-3xl font-black text-simba-gray-300">---</div>
            </div>
          </div>

          <div className="mt-5 flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-simba-gray-500">Filter</span>
              <select className="rounded-md border border-simba-gray-200 bg-white px-2 py-1 text-sm text-simba-black font-medium focus:outline-none focus:ring-2 focus:ring-simba-blue/30">
                <option>All</option>
              </select>
            </div>
            <a href="/dashboard/conversations" className="text-sm font-medium text-simba-black inline-flex items-center gap-1 hover:underline">
              Filtered call history <span className="text-xs">↗</span>
            </a>
          </div>

          <div className="mt-5 grid md:grid-cols-2 gap-5">
            <div className="rounded-2xl border border-simba-gray-200 bg-white p-5">
              <div className="flex items-center gap-1 text-sm font-semibold text-simba-black">
                Agent Response Time
                <span className="h-3.5 w-3.5 rounded-full border border-simba-gray-300 text-[9px] flex items-center justify-center text-simba-gray-400" title="Average time for agent to respond">i</span>
              </div>
              <div className="mt-2 text-3xl font-black text-simba-gray-300">---</div>
              <div className="mt-8 flex flex-col items-center justify-center text-simba-gray-400 py-6">
                <ChartBarIcon className="h-8 w-8 text-simba-gray-300" />
                <div className="mt-2 text-xs">No data has been collected</div>
              </div>
            </div>
            <div className="rounded-2xl border border-simba-gray-200 bg-white p-5">
              <div className="flex items-center gap-1 text-sm font-semibold text-simba-black">
                Total Conversation Duration
                <span className="h-3.5 w-3.5 rounded-full border border-simba-gray-300 text-[9px] flex items-center justify-center text-simba-gray-400" title="Total duration of all conversations">i</span>
              </div>
              <div className="mt-2 text-3xl font-black text-simba-gray-300">---</div>
              <div className="mt-8 flex flex-col items-center justify-center text-simba-gray-400 py-6">
                <ChartBarIcon className="h-8 w-8 text-simba-gray-300" />
                <div className="mt-2 text-xs">No data has been collected</div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="mt-5 rounded-2xl border border-simba-gray-200 bg-white py-20 px-6 flex flex-col items-center text-center">
          <ChartBarIcon className="h-10 w-10 text-simba-gray-300 mb-4" />
          <div className="text-sm font-semibold text-simba-black">No {TABS[activeTab].toLowerCase()} data collected</div>
          <div className="mt-1 text-sm text-simba-gray-500">Data will appear here once your agents start processing conversations.</div>
        </div>
      )}

      <div className="mt-5 text-xs text-simba-gray-500">
        {agentCount} agent{agentCount === 1 ? '' : 's'} configured · Connected to your ElevenLabs workspace
      </div>

      {/* Create View Modal */}
      <Modal open={showViewModal} onClose={() => { setShowViewModal(false); setViewName(''); }} title="Create View">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-simba-black mb-1">View Name</label>
            <input type="text" placeholder="My custom view" value={viewName} onChange={(e) => setViewName(e.target.value)} className={inputCls} />
          </div>
          <div className="flex justify-end">
            <button type="button" onClick={() => { showToast('View created'); setShowViewModal(false); setViewName(''); }} disabled={!viewName.trim()} className="rounded-md bg-simba-black text-white px-4 py-2 text-sm font-semibold hover:bg-simba-gray-800 disabled:opacity-40">
              Create
            </button>
          </div>
        </div>
      </Modal>

      <Toast message={toast.message} type={toast.type} visible={toast.visible} onDismiss={dismiss} />
    </>
  );
}
