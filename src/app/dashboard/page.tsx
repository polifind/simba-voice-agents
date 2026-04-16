import { PageShell } from '@/components/dashboard/PageShell';
import { DashboardHomeClient } from '@/components/dashboard/DashboardHomeClient';
import { getSession, displayNameFromEmail, greetingForNow } from '@/lib/auth';
import { listConversations, listAgents } from '@/lib/elevenlabs';

export const dynamic = 'force-dynamic';

function formatSeconds(sec?: number): string {
  if (!sec || !Number.isFinite(sec)) return '---';
  if (sec < 60) return `${sec.toFixed(0)}s`;
  const m = Math.floor(sec / 60);
  const s = Math.round(sec % 60);
  return `${m}m ${s}s`;
}

function formatNumber(n?: number): string {
  if (!n || !Number.isFinite(n)) return '---';
  return n.toLocaleString('en-US');
}

export default async function DashboardHome() {
  const session = await getSession();
  const name = session ? displayNameFromEmail(session.email) : 'there';

  let callCount = 0;
  let avgDuration: number | undefined;
  let agentCount = 0;
  let agents: { agent_id: string; name: string }[] = [];
  try {
    const [convos, agentsData] = await Promise.all([
      listConversations().catch(() => ({ conversations: [] })),
      listAgents().catch(() => ({ agents: [] })),
    ]);
    callCount = convos.conversations?.length ?? 0;
    agents = (agentsData.agents ?? []).map((a) => ({ agent_id: a.agent_id, name: a.name }));
    agentCount = agents.length;
    const durations = (convos.conversations ?? [])
      .map((c) => c.call_duration_secs)
      .filter((d): d is number => typeof d === 'number');
    if (durations.length) {
      avgDuration = durations.reduce((a, b) => a + b, 0) / durations.length;
    }
  } catch {
    // soft fail
  }

  const stats = [
    { label: 'Number of calls', value: formatNumber(callCount) },
    { label: 'Average duration', value: formatSeconds(avgDuration) },
    { label: 'Total cost', value: '---' },
    { label: 'Average cost', value: '---' },
    { label: 'Total LLM cost', value: '---' },
    { label: 'Average LLM cost', value: '---' },
  ];

  return (
    <PageShell title="Home">
      <DashboardHomeClient
        name={name}
        greeting={greetingForNow()}
        stats={stats}
        agentCount={agentCount}
        agents={agents}
      />
    </PageShell>
  );
}
