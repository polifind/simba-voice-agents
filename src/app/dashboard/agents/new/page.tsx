'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeftIcon, UserIcon, BriefcaseIcon } from '@heroicons/react/24/outline';

type Template = {
  id: string;
  label: string;
  badge?: string;
  icon: React.ReactNode;
  preview?: { user: string; agent: string[] };
  config: {
    name: string;
    first_message: string;
    prompt: string;
  };
};

const TEMPLATES: Template[] = [
  {
    id: 'blank',
    label: 'Blank Agent',
    icon: (
      <span className="h-5 w-5 rounded-full border-2 border-dashed border-simba-gray-400" />
    ),
    config: {
      name: 'My Agent',
      first_message: '',
      prompt: '',
    },
  },
  {
    id: 'personal-assistant',
    label: 'Personal Assistant',
    icon: <UserIcon className="h-5 w-5 text-simba-gray-600" />,
    preview: {
      user: 'Could you see whether I have any urgent outstanding emails?',
      agent: [
        'Sure, let me check.',
        "You've got one urgent email from your manager about tomorrow's meeting. Want a quick summary?",
      ],
    },
    config: {
      name: 'Personal Assistant',
      first_message:
        "Hi! I'm your personal assistant. I can help you manage emails, schedule meetings, set reminders, and stay on top of your day. What can I do for you?",
      prompt:
        "You are a friendly, efficient personal assistant. Help the user manage their schedule, emails, tasks, and daily workflow. Be proactive — suggest next steps, flag urgent items, and keep responses concise. If you don't know something, say so honestly rather than guessing.",
    },
  },
  {
    id: 'business-agent',
    label: 'Business Agent',
    badge: 'Improved',
    icon: <BriefcaseIcon className="h-5 w-5 text-simba-gray-600" />,
    preview: {
      user: 'Can you tell me more about pricing?',
      agent: [
        "Absolutely! We offer three plans: Starter, Pro, and Enterprise. Want a quick breakdown, or should I help you pick the best fit?",
      ],
    },
    config: {
      name: 'Business Agent',
      first_message:
        "Hello! I'm here to help with any questions about our products, pricing, or services. How can I assist you today?",
      prompt:
        "You are a professional business agent representing the company. Answer questions about products, pricing, and services clearly and helpfully. Qualify leads by understanding their needs. If they're ready to buy, guide them through next steps. If you're unsure about specific details, offer to connect them with a human team member. Keep responses conversational but professional.",
    },
  },
];

export default function NewAgentPage() {
  const router = useRouter();
  const [creating, setCreating] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const create = async (template: Template) => {
    if (creating) return;
    setCreating(template.id);
    setError(null);
    try {
      const res = await fetch('/api/elevenlabs/agents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: template.config.name,
          conversation_config: {
            agent: {
              prompt: { prompt: template.config.prompt || undefined },
              first_message: template.config.first_message || undefined,
              language: 'en',
            },
          },
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`);
      router.replace(`/dashboard/agents/${data.agent_id}`);
      router.refresh();
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

      <div className="max-w-3xl mx-auto mt-16">
        <h1 className="text-3xl font-black tracking-tight text-simba-black">
          New agent
        </h1>
        <p className="mt-1 text-simba-gray-600">
          What type of agent would you like to create?
        </p>

        {error && (
          <div className="mt-4 rounded-lg bg-red-50 border border-red-200 px-3 py-2 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="mt-8 space-y-4">
          {/* Blank agent — simple row */}
          <button
            type="button"
            onClick={() => create(TEMPLATES[0])}
            disabled={!!creating}
            className="w-full flex items-center justify-center gap-2 rounded-xl border border-simba-gray-200 bg-white py-4 px-6 text-sm font-semibold text-simba-black hover:border-simba-gray-300 hover:bg-simba-gray-50 transition-colors disabled:opacity-50"
          >
            {TEMPLATES[0].icon}
            {creating === 'blank' ? 'Creating…' : 'Blank Agent'}
          </button>

          {/* Template cards */}
          <div className="grid sm:grid-cols-2 gap-4">
            {TEMPLATES.slice(1).map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => create(t)}
                disabled={!!creating}
                className="text-left rounded-xl border border-simba-gray-200 bg-green-50/40 p-5 hover:border-simba-gray-300 transition-colors disabled:opacity-50 relative overflow-hidden"
              >
                {/* Chat preview */}
                {t.preview && (
                  <div className="space-y-2 mb-6">
                    <div className="flex justify-end">
                      <div className="rounded-2xl rounded-br-sm bg-simba-black text-white px-3 py-2 text-xs max-w-[85%]">
                        {t.preview.user}
                      </div>
                    </div>
                    {t.preview.agent.map((msg, i) => (
                      <div key={i} className="flex justify-start">
                        <div className="rounded-2xl rounded-bl-sm bg-white px-3 py-2 text-xs text-simba-gray-800 max-w-[85%] shadow-sm">
                          {msg}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex items-center gap-2">
                  {t.icon}
                  <span className="text-sm font-semibold text-simba-black">
                    {creating === t.id ? 'Creating…' : t.label}
                  </span>
                  {t.badge && (
                    <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-green-100 text-green-700">
                      {t.badge}
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
