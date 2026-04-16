import { PageShell } from '@/components/dashboard/PageShell';
import { TestsPageClient } from '@/components/dashboard/TestsPageClient';
import { listAgents } from '@/lib/elevenlabs';

export const dynamic = 'force-dynamic';

export default async function TestsPage() {
  let agents: { agent_id: string; name: string }[] = [];
  try {
    const data = await listAgents();
    agents = (data.agents ?? []).map((a) => ({ agent_id: a.agent_id, name: a.name }));
  } catch {
    // soft fail
  }

  return (
    <PageShell title="Tests">
      <TestsPageClient agents={agents} />
    </PageShell>
  );
}
