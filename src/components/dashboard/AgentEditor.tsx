'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';

type Props = {
  agentId: string;
  initialName: string;
  initialPrompt: string;
  initialFirstMessage: string;
  initialLanguage: string;
  initialVoiceId: string;
};

const TABS = ['General', 'Prompt', 'Voice', 'Advanced'] as const;
type Tab = (typeof TABS)[number];

export function AgentEditor({
  agentId,
  initialName,
  initialPrompt,
  initialFirstMessage,
  initialLanguage,
  initialVoiceId,
}: Props) {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>('General');
  const [name, setName] = useState(initialName);
  const [prompt, setPrompt] = useState(initialPrompt);
  const [firstMessage, setFirstMessage] = useState(initialFirstMessage);
  const [language, setLanguage] = useState(initialLanguage);
  const [voiceId, setVoiceId] = useState(initialVoiceId);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const dirty =
    name !== initialName ||
    prompt !== initialPrompt ||
    firstMessage !== initialFirstMessage ||
    language !== initialLanguage ||
    voiceId !== initialVoiceId;

  const save = useCallback(async () => {
    if (saving) return;
    setSaving(true);
    setError(null);
    setSaved(false);
    try {
      const res = await fetch(`/api/elevenlabs/agents/${agentId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          conversation_config: {
            agent: {
              prompt: { prompt },
              first_message: firstMessage,
              language,
            },
            ...(voiceId
              ? { tts: { voice_id: voiceId } }
              : {}),
          },
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error((data as { error?: string }).error || `HTTP ${res.status}`);
      }
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Save failed');
    } finally {
      setSaving(false);
    }
  }, [agentId, name, prompt, firstMessage, language, voiceId, saving, router]);

  const handleDelete = useCallback(async () => {
    if (!confirm('Delete this agent? This cannot be undone.')) return;
    setDeleting(true);
    try {
      await fetch(`/api/elevenlabs/agents/${agentId}`, { method: 'DELETE' });
      router.replace('/dashboard/agents');
      router.refresh();
    } catch {
      setDeleting(false);
    }
  }, [agentId, router]);

  return (
    <div>
      {/* Name */}
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="text-3xl font-black tracking-tight text-simba-black bg-transparent border-none focus:outline-none focus:ring-0 w-full placeholder:text-simba-gray-300"
        placeholder="Agent name"
      />

      {/* Tabs */}
      <div className="mt-6 border-b border-simba-gray-200">
        <div className="flex gap-6">
          {TABS.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={clsx(
                'pb-3 text-sm transition-colors border-b-2 -mb-px',
                tab === t
                  ? 'border-simba-black text-simba-black font-semibold'
                  : 'border-transparent text-simba-gray-500 hover:text-simba-gray-700'
              )}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <div className="mt-6 space-y-6">
        {tab === 'General' && (
          <>
            <Field label="First message" description="What the agent says when the conversation starts.">
              <textarea
                rows={3}
                value={firstMessage}
                onChange={(e) => setFirstMessage(e.target.value)}
                className="w-full rounded-xl border border-simba-gray-200 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-simba-blue/30 focus:border-simba-blue resize-y"
                placeholder="Hi! How can I help you today?"
              />
            </Field>
            <Field label="Language" description="Primary language for the agent.">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full rounded-xl border border-simba-gray-200 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-simba-blue/30 focus:border-simba-blue"
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
                <option value="pt">Portuguese</option>
                <option value="ja">Japanese</option>
                <option value="zh">Chinese</option>
                <option value="ko">Korean</option>
                <option value="hi">Hindi</option>
                <option value="ar">Arabic</option>
              </select>
            </Field>
          </>
        )}

        {tab === 'Prompt' && (
          <Field label="System prompt" description="Instructions that define the agent's personality and behavior.">
            <textarea
              rows={16}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full rounded-xl border border-simba-gray-200 bg-white px-4 py-3 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-simba-blue/30 focus:border-simba-blue resize-y"
              placeholder="You are a helpful assistant..."
            />
          </Field>
        )}

        {tab === 'Voice' && (
          <Field label="Voice ID" description="The ElevenLabs voice used for text-to-speech.">
            <input
              value={voiceId}
              onChange={(e) => setVoiceId(e.target.value)}
              className="w-full rounded-xl border border-simba-gray-200 bg-white px-4 py-3 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-simba-blue/30 focus:border-simba-blue"
              placeholder="voice_id"
            />
            <p className="mt-2 text-xs text-simba-gray-500">
              Browse the Voices page to find a voice, then paste its ID here.
            </p>
          </Field>
        )}

        {tab === 'Advanced' && (
          <div className="text-sm text-simba-gray-500">
            <p>Agent ID: <code className="font-mono text-simba-gray-700">{agentId}</code></p>
            <div className="mt-8">
              <button
                type="button"
                onClick={handleDelete}
                disabled={deleting}
                className="text-red-600 text-sm font-medium hover:text-red-700 disabled:opacity-50"
              >
                {deleting ? 'Deleting…' : 'Delete this agent'}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Save bar */}
      {(dirty || error || saved) && (
        <div className="sticky bottom-0 mt-8 -mx-6 lg:-mx-10 px-6 lg:px-10 py-4 bg-white border-t border-simba-gray-200 flex items-center justify-between">
          <div className="text-sm">
            {error && <span className="text-red-600">{error}</span>}
            {saved && <span className="text-green-600">Saved</span>}
          </div>
          <button
            type="button"
            onClick={save}
            disabled={saving || !dirty}
            className="inline-flex items-center h-9 px-4 rounded-md bg-simba-black text-white text-sm font-semibold hover:bg-simba-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? 'Saving…' : 'Save changes'}
          </button>
        </div>
      )}
    </div>
  );
}

function Field({
  label,
  description,
  children,
}: {
  label: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-simba-black">{label}</label>
      {description && (
        <p className="mt-0.5 text-xs text-simba-gray-500">{description}</p>
      )}
      <div className="mt-2">{children}</div>
    </div>
  );
}
