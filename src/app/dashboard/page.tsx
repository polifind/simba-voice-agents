import clsx from 'clsx';
import { PageShell } from '@/components/dashboard/PageShell';
import { getSession, displayNameFromEmail, greetingForNow } from '@/lib/auth';
import { listConversations, listAgents } from '@/lib/elevenlabs';
import { ChartBarIcon, PlusIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

export const dynamic = 'force-dynamic';

const TABS = [
  'General',
  'Evaluation',
  'Data Collection',
  'Audio',
  'Tools',
  'LLMs',
  'Knowledge Base',
  'Advanced',
] as const;

type Stat = { label: string; value: string };

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

  // Fetch recent conversations so we can compute rough call stats.
  let callCount = 0;
  let avgDuration: number | undefined;
  let agentCount = 0;
  try {
    const [convos, agents] = await Promise.all([
      listConversations().catch(() => ({ conversations: [] })),
      listAgents().catch(() => ({ agents: [] })),
    ]);
    callCount = convos.conversations?.length ?? 0;
    agentCount = agents.agents?.length ?? 0;
    const durations = (convos.conversations ?? [])
      .map((c) => c.call_duration_secs)
      .filter((d): d is number => typeof d === 'number');
    if (durations.length) {
      avgDuration = durations.reduce((a, b) => a + b, 0) / durations.length;
    }
  } catch {
    // soft fail — dashboard still renders with "---"
  }

  const stats: Stat[] = [
    { label: 'Number of calls', value: formatNumber(callCount) },
    { label: 'Average duration', value: formatSeconds(avgDuration) },
    { label: 'Total cost', value: '---' },
    { label: 'Average cost', value: '---' },
    { label: 'Total LLM cost', value: '---' },
    { label: 'Average LLM cost', value: '---' },
  ];

  return (
    <PageShell title="Home">
      {/* Status row */}
      <div className="flex items-center justify-between">
        <div className="inline-flex items-center gap-2 rounded-full border border-simba-gray-200 bg-white px-3 py-1 text-xs text-simba-gray-700">
          <span className="h-2 w-2 rounded-full bg-simba-gray-500" />
          Active calls: <span className="font-semibold text-simba-black">0</span>
        </div>
        <button
          type="button"
          className="text-xs font-medium text-simba-gray-700 border border-simba-gray-200 rounded-md px-3 py-1.5 hover:bg-simba-gray-50"
        >
          View old dashboard
        </button>
      </div>

      {/* Greeting */}
      <div className="mt-8">
        <div className="text-xs uppercase tracking-wider text-simba-gray-500">
          My Workspace
        </div>
        <h1 className="mt-1 text-3xl sm:text-4xl font-black tracking-tight text-simba-black">
          {greetingForNow()}, {name}
        </h1>
      </div>

      {/* Tabs */}
      <div className="mt-8 border-b border-simba-gray-200 overflow-x-auto">
        <div className="flex items-center gap-6 min-w-max">
          {TABS.map((tab, i) => (
            <button
              key={tab}
              type="button"
              className={clsx(
                'pb-3 text-sm transition-colors border-b-2 -mb-px whitespace-nowrap',
                i === 0
                  ? 'border-simba-black text-simba-black font-semibold'
                  : 'border-transparent text-simba-gray-500 hover:text-simba-gray-700'
              )}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Filter row */}
      <div className="mt-5 flex flex-wrap items-center gap-2">
        <button
          type="button"
          className="inline-flex items-center gap-1 rounded-full border border-simba-gray-200 bg-white px-3 py-1 text-xs font-medium text-simba-gray-700 hover:bg-simba-gray-50"
        >
          <PlusIcon className="h-3 w-3" />
          Create view
        </button>
        <div className="inline-flex items-center gap-2 rounded-full border border-simba-gray-200 bg-white px-3 py-1 text-xs text-simba-gray-700">
          <span className="text-simba-gray-500">Date Range</span>
          <span className="font-medium text-simba-black">Last week</span>
          <ChevronDownIcon className="h-3 w-3" />
        </div>
        <div className="inline-flex items-center gap-2 rounded-full border border-simba-gray-200 bg-white px-3 py-1 text-xs text-simba-gray-700">
          <span className="text-simba-gray-500">Granularity</span>
          <span className="font-medium text-simba-black">Day</span>
          <ChevronDownIcon className="h-3 w-3" />
        </div>
        <div className="inline-flex items-center gap-2 rounded-full border border-simba-gray-200 bg-white px-3 py-1 text-xs text-simba-gray-700">
          <span className="font-medium text-simba-black">Agent</span>
        </div>
      </div>

      {/* Stat strip */}
      <div className="mt-5 rounded-2xl border border-simba-gray-200 bg-white overflow-hidden">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 divide-y md:divide-y-0 md:divide-x divide-simba-gray-200">
          {stats.map((s, i) => (
            <div key={s.label} className={clsx('px-5 py-4', i === 0 && 'border-b-2 border-b-simba-black md:border-b-0 md:border-r-0 relative')}>
              <div className="text-xs text-simba-gray-500">{s.label}</div>
              <div className="mt-2 text-lg font-black text-simba-black">{s.value}</div>
              {i === 0 && (
                <span className="absolute left-0 bottom-0 h-0.5 w-full bg-simba-black" />
              )}
            </div>
          ))}
        </div>

        {/* Chart area */}
        <div className="h-60 flex flex-col items-center justify-center text-simba-gray-500">
          <ChartBarIcon className="h-10 w-10 text-simba-gray-300" />
          <div className="mt-3 text-sm">No data has been collected</div>
        </div>
      </div>

      {/* Sub-stat cards */}
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

      {/* Filter row */}
      <div className="mt-5 flex items-center gap-4">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-simba-gray-500">Filter</span>
          <select className="rounded-md border border-simba-gray-200 bg-white px-2 py-1 text-sm text-simba-black font-medium focus:outline-none focus:ring-2 focus:ring-simba-blue/30">
            <option>All</option>
          </select>
        </div>
        <a
          href="/dashboard/conversations"
          className="text-sm font-medium text-simba-black inline-flex items-center gap-1 hover:underline"
        >
          Filtered call history <span className="text-xs">↗</span>
        </a>
      </div>

      {/* Response time + Duration cards */}
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

      {/* Quick ref */}
      <div className="mt-5 text-xs text-simba-gray-500">
        {agentCount} agent{agentCount === 1 ? '' : 's'} configured · Connected to your
        ElevenLabs workspace
      </div>
    </PageShell>
  );
}
