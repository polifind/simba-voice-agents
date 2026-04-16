import { PageShell } from '@/components/dashboard/PageShell';
import { AgentsListClient } from '@/components/dashboard/AgentsListClient';
import { listAgents, type Agent } from '@/lib/elevenlabs';

export const dynamic = 'force-dynamic';

export default async function AgentsPage() {
  let agents: Agent[] = [];
  let loadError: string | null = null;
  try {
    const data = await listAgents();
    agents = data.agents ?? [];
    agents.sort((a, b) => (b.created_at_unix_secs ?? 0) - (a.created_at_unix_secs ?? 0));
  } catch (err) {
    loadError = err instanceof Error ? err.message : 'Failed to load agents';
  }

  return (
    <PageShell title="Agents">
      <AgentsListClient agents={agents} loadError={loadError} />
    </PageShell>
  );
}
