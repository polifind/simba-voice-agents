'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import clsx from 'clsx';
import { ArrowLeftIcon, MagnifyingGlassIcon, WrenchScrewdriverIcon } from '@heroicons/react/24/outline';
import { AGENT_TEMPLATES, TEMPLATE_CATEGORIES, type AgentTemplate } from '@/data/agent-templates';

export default function BrowseTemplatesPage() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<string>('All');
  const [creating, setCreating] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const filtered = AGENT_TEMPLATES.filter((t) => {
    const matchesSearch =
      !search ||
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.description.toLowerCase().includes(search.toLowerCase());
    const matchesCat = category === 'All' || t.category === category;
    return matchesSearch && matchesCat;
  });

  const useTemplate = async (t: AgentTemplate) => {
    if (creating) return;
    setCreating(t.id);
    setError(null);
    try {
      const res = await fetch('/api/elevenlabs/agents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: t.name,
          conversation_config: {
            agent: {
              prompt: { prompt: t.config.prompt },
              first_message: t.config.first_message,
              language: 'en',
            },
          },
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`);
      router.push(`/dashboard/agents/${data.agent_id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create agent');
      setCreating(null);
    }
  };

  return (
    <div className="px-6 lg:px-10 py-6 lg:py-8">
      <Link
        href="/dashboard/agents"
        className="inline-flex items-center gap-1 text-sm text-simba-gray-600 hover:text-simba-black mb-6"
      >
        <ArrowLeftIcon className="h-3.5 w-3.5" /> Back to agents
      </Link>

      <h1 className="text-3xl font-black tracking-tight text-simba-black">
        Browse templates
      </h1>

      {/* Search */}
      <div className="mt-5 relative max-w-2xl">
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-simba-gray-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search templates"
          className="w-full rounded-xl border border-simba-gray-200 bg-white pl-9 pr-3 py-2.5 text-sm placeholder:text-simba-gray-400 focus:outline-none focus:ring-2 focus:ring-simba-blue/30 focus:border-simba-blue"
        />
      </div>

      {/* Category tabs */}
      <div className="mt-4 flex flex-wrap gap-2">
        {TEMPLATE_CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setCategory(cat)}
            className={clsx(
              'px-3 py-1.5 rounded-md text-sm font-medium transition-colors',
              category === cat
                ? 'bg-simba-black text-white'
                : 'bg-simba-gray-100 text-simba-gray-700 hover:bg-simba-gray-200'
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {error && (
        <div className="mt-4 rounded-lg bg-red-50 border border-red-200 px-3 py-2 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Template grid */}
      <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => useTemplate(t)}
            disabled={!!creating}
            className={clsx(
              'text-left rounded-xl border border-simba-gray-200 bg-white p-5 hover:border-simba-gray-300 hover:shadow-sm transition-all disabled:opacity-50',
              creating === t.id && 'ring-2 ring-simba-blue'
            )}
          >
            <div className="flex items-center gap-2">
              <span className="text-lg">{t.emoji}</span>
              <span className="text-sm font-semibold text-simba-black truncate">
                {creating === t.id ? 'Creating…' : t.name}
              </span>
            </div>
            <p className="mt-2 text-xs text-simba-gray-600 leading-relaxed line-clamp-2">
              {t.description}
            </p>
            {t.tools && (
              <div className="mt-3 inline-flex items-center gap-1 text-[10px] text-simba-gray-500">
                <WrenchScrewdriverIcon className="h-3 w-3" />
                {t.tools} tool{t.tools > 1 ? 's' : ''}
              </div>
            )}
          </button>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="mt-12 text-center text-sm text-simba-gray-500">
          No templates match your search.
        </div>
      )}
    </div>
  );
}
