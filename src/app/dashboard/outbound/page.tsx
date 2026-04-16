import { PageShell } from '@/components/dashboard/PageShell';
import { OutboundClient } from '@/components/dashboard/OutboundClient';
import { listAgents } from '@/lib/elevenlabs';

export const dynamic = 'force-dynamic';

export default async function OutboundPage() {
  let agents: { agent_id: string; name: string }[] = [];
  try {
    const data = await listAgents();
    agents = (data.agents ?? []).map((a) => ({ agent_id: a.agent_id, name: a.name }));
  } catch {
    // soft fail
  }

  return (
    <PageShell title="Batch Calling">
      <OutboundClient agents={agents} />
    </PageShell>
  );
}
