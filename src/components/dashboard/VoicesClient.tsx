'use client';

import { useState } from 'react';
import { PlusIcon, MagnifyingGlassIcon, SpeakerWaveIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { Toast, useToast } from './Toast';

type Voice = {
  voice_id: string;
  name: string;
  category?: string;
  labels?: Record<string, string>;
  description?: string;
};

const TABS = ['Explore', 'My Voices', 'Default Voices'] as const;
const CATEGORY_CHIPS = ['Conversational', 'Narration', 'Characters', 'Social Media', 'Educational', 'Advertisement'];

const USE_CASES = [
  { label: 'Customer Support', gradient: 'from-gray-600 to-gray-800' },
  { label: 'Sales', gradient: 'from-slate-500 to-slate-700' },
  { label: 'Coach', gradient: 'from-zinc-600 to-zinc-800' },
  { label: 'Personal Assistants', gradient: 'from-stone-500 to-stone-700' },
];

function VoiceAvatar({ name }: { name: string }) {
  const hue = name.split('').reduce((sum, c) => sum + c.charCodeAt(0), 0) % 360;
  return (
    <div className="h-11 w-11 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0" style={{ background: `hsl(${hue}, 60%, 55%)` }}>
      {name.charAt(0).toUpperCase()}
    </div>
  );
}

export function VoicesClient({ voices }: { voices: Voice[] }) {
  const [activeTab, setActiveTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeChips, setActiveChips] = useState<Set<string>>(new Set());
  const { toast, showToast, dismiss } = useToast();

  const toggleChip = (c: string) => {
    setActiveChips((prev) => { const n = new Set(prev); n.has(c) ? n.delete(c) : n.add(c); return n; });
  };

  // Filter voices based on tab, search, and category
  const filteredVoices = voices.filter((v) => {
    // Tab filter
    if (activeTab === 1) return false; // "My Voices" — no custom voices in demo
    if (activeTab === 2 && v.category !== 'premade') return false;

    // Search filter
    if (searchQuery && !v.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;

    // Category chip filter
    if (activeChips.size > 0) {
      const cat = v.category?.toLowerCase() ?? '';
      const matchesChip = Array.from(activeChips).some((chip) => cat.includes(chip.toLowerCase()));
      if (!matchesChip) return false;
    }

    return true;
  });

  const trending = filteredVoices
    .filter((v) => { const cat = v.category?.toLowerCase() ?? ''; return cat.includes('general') || cat.includes('premade') || cat.includes('professional'); })
    .slice(0, 6);
  const displayed = trending.length >= 6 ? trending : filteredVoices.slice(0, 6);

  return (
    <>
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-6">
          {TABS.map((tab, i) => (
            <button key={tab} type="button" onClick={() => setActiveTab(i)} className={clsx('flex items-center gap-1.5 text-sm font-medium transition-colors', activeTab === i ? 'text-simba-black' : 'text-simba-gray-500 hover:text-simba-gray-700')}>
              {i === 0 && <SpeakerWaveIcon className="h-4 w-4" />}
              {tab}
            </button>
          ))}
        </div>
        <button type="button" onClick={() => showToast('Voice creation requires ElevenLabs Voice Lab setup.', 'error')} className="inline-flex items-center gap-1 h-9 px-3 rounded-md bg-simba-black text-white text-sm font-semibold hover:bg-simba-gray-800">
          <PlusIcon className="h-4 w-4" /> Create Voice
        </button>
      </div>

      <div className="mt-5 relative">
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-simba-gray-400" />
        <input type="text" placeholder="Search library voices..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full rounded-xl border border-simba-gray-200 bg-white pl-9 pr-3 py-2.5 text-sm placeholder:text-simba-gray-400 focus:outline-none focus:ring-2 focus:ring-simba-blue/30 focus:border-simba-blue" />
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <button type="button" className="inline-flex items-center gap-1 rounded-full border border-simba-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-simba-gray-700 hover:bg-simba-gray-50">
          <span className="text-base leading-none">🌐</span> Language
        </button>
        <button type="button" className="inline-flex items-center gap-1 rounded-full border border-simba-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-simba-gray-700 hover:bg-simba-gray-50">
          Accent ↓
        </button>
        <span className="h-4 w-px bg-simba-gray-200" />
        {CATEGORY_CHIPS.map((c) => (
          <button key={c} type="button" onClick={() => toggleChip(c)} className={clsx('inline-flex items-center gap-1 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors', activeChips.has(c) ? 'border-simba-black bg-simba-black text-white' : 'border-simba-gray-200 bg-white text-simba-gray-700 hover:bg-simba-gray-50')}>
            {c}
          </button>
        ))}
      </div>

      {activeTab === 1 ? (
        <div className="mt-8 rounded-2xl border border-simba-gray-200 bg-white py-20 px-6 flex flex-col items-center text-center">
          <div className="h-10 w-10 text-simba-gray-400 mb-4"><SpeakerWaveIcon /></div>
          <div className="text-sm font-semibold text-simba-black">No custom voices</div>
          <div className="mt-1 text-sm text-simba-gray-500">You haven&apos;t created any custom voices yet.</div>
        </div>
      ) : (
        <>
          <div className="mt-8">
            <h2 className="text-lg font-bold text-simba-black">Trending voices <span className="text-simba-gray-400">›</span></h2>
            {displayed.length === 0 ? (
              <div className="mt-4 rounded-2xl border border-simba-gray-200 bg-white py-12 px-6 text-center text-sm text-simba-gray-500">
                No voices match your filters.
              </div>
            ) : (
              <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {displayed.map((v) => (
                  <button key={v.voice_id} type="button" className="flex items-center gap-3 rounded-xl border border-simba-gray-200 bg-white p-3 text-left hover:border-simba-gray-300 transition-colors">
                    <VoiceAvatar name={v.name} />
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-simba-black truncate">{v.name}</div>
                      <div className="text-xs text-simba-gray-500 truncate">{v.category ?? 'Voice'}</div>
                      <div className="mt-0.5 flex items-center gap-1 text-xs text-simba-gray-500">
                        <span>🇺🇸</span> English
                        {v.labels?.accent && <span className="text-simba-gray-400">· {v.labels.accent}</span>}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="mt-10">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-simba-black">Handpicked for your use case</h2>
              <div className="flex gap-1">
                <button type="button" className="h-7 w-7 rounded-full border border-simba-gray-200 flex items-center justify-center text-simba-gray-500 hover:bg-simba-gray-50">‹</button>
                <button type="button" className="h-7 w-7 rounded-full border border-simba-gray-200 flex items-center justify-center text-simba-gray-500 hover:bg-simba-gray-50">›</button>
              </div>
            </div>
            <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {USE_CASES.map((uc) => (
                <div key={uc.label} className={clsx('relative rounded-2xl bg-gradient-to-br p-5 h-40 flex flex-col justify-end overflow-hidden', uc.gradient)}>
                  <span className="text-lg font-bold text-white leading-tight">{uc.label}</span>
                  <div className="absolute bottom-3 right-3 h-7 w-7 rounded-full bg-white/20 flex items-center justify-center text-white text-sm">→</div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      <div className="mt-10 text-xs text-simba-gray-500">{voices.length} voice{voices.length === 1 ? '' : 's'} in library</div>

      <Toast message={toast.message} type={toast.type} visible={toast.visible} onDismiss={dismiss} />
    </>
  );
}
