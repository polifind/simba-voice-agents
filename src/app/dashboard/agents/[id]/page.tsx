import Link from 'next/link';
import { PageShell } from '@/components/dashboard/PageShell';
import { AgentEditor } from '@/components/dashboard/AgentEditor';
import { getAgent } from '@/lib/elevenlabs';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

export const dynamic = 'force-dynamic';

type AgentDetail = {
  agent_id: string;
  name?: string;
  conversation_config?: {
    agent?: {
      prompt?: { prompt?: string };
      first_message?: string;
      language?: string;
    };
    tts?: {
      voice_id?: string;
    };
  };
};

export default async function AgentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let agent: AgentDetail | null = null;
  let loadError: string | null = null;
  try {
    agent = (await getAgent(id)) as AgentDetail;
  } catch (err) {
    loadError = err instanceof Error ? err.message : 'Failed to load agent';
  }

  if (loadError || !agent) {
    return (
      <PageShell title="Agent">
        <Link
          href="/dashboard/agents"
          className="inline-flex items-center gap-1 text-sm text-simba-gray-600 hover:text-simba-black"
        >
          <ArrowLeftIcon className="h-3.5 w-3.5" /> Back to agents
        </Link>
        <div className="mt-8 text-center text-simba-gray-500">
          {loadError || 'Agent not found.'}
        </div>
      </PageShell>
    );
  }

  const cfg = agent.conversation_config?.agent;

  return (
    <PageShell title={agent.name || 'Agent'}>
      <Link
        href="/dashboard/agents"
        className="inline-flex items-center gap-1 text-sm text-simba-gray-600 hover:text-simba-black mb-4"
      >
        <ArrowLeftIcon className="h-3.5 w-3.5" /> Back to agents
      </Link>

      <AgentEditor
        agentId={agent.agent_id}
        initialName={agent.name ?? ''}
        initialPrompt={cfg?.prompt?.prompt ?? ''}
        initialFirstMessage={cfg?.first_message ?? ''}
        initialLanguage={cfg?.language ?? 'en'}
        initialVoiceId={agent.conversation_config?.tts?.voice_id ?? ''}
      />
    </PageShell>
  );
}
