import { PageShell } from '@/components/dashboard/PageShell';
import { ActionCard } from '@/components/dashboard/ActionCard';
import { EmptyState } from '@/components/dashboard/EmptyState';
import { FilterChips } from '@/components/dashboard/FilterChips';
import { listTools } from '@/lib/elevenlabs';
import {
  BoltIcon,
  WrenchScrewdriverIcon,
  Squares2X2Icon,
  MagnifyingGlassIcon,
  BookOpenIcon,
} from '@heroicons/react/24/outline';

export const dynamic = 'force-dynamic';

type ToolRow = { id?: string; tool_id?: string; name?: string; type?: string };

export default async function ToolsPage() {
  let tools: ToolRow[] = [];
  try {
    const data = (await listTools()) as { tools?: ToolRow[] } | ToolRow[];
    if (Array.isArray(data)) tools = data;
    else tools = data.tools ?? [];
  } catch {
    // soft fail
  }

  return (
    <PageShell title="Tools">
      <div className="flex items-center gap-2">
        <h1 className="text-3xl font-black tracking-tight text-simba-black">Tools</h1>
        <BookOpenIcon className="h-5 w-5 text-simba-gray-400" />
      </div>

      {/* Action cards */}
      <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
        <ActionCard icon={<BoltIcon />} label="Add webhook tool" />
        <ActionCard icon={<WrenchScrewdriverIcon />} label="Add client tool" />
        <ActionCard icon={<Squares2X2Icon />} label="Add Integration tool" />
      </div>

      {/* Search */}
      <div className="mt-6 relative">
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-simba-gray-400" />
        <input
          type="text"
          placeholder="Search tools..."
          className="w-full rounded-xl border border-simba-gray-200 bg-white pl-9 pr-3 py-2.5 text-sm placeholder:text-simba-gray-400 focus:outline-none focus:ring-2 focus:ring-simba-blue/30 focus:border-simba-blue"
        />
      </div>

      <div className="mt-3">
        <FilterChips labels={['Type', 'Creator']} />
      </div>

      <div className="mt-6">
        {tools.length === 0 ? (
          <EmptyState
            icon={<WrenchScrewdriverIcon />}
            title="No tools found"
            description="You don't have any tools yet."
          />
        ) : (
          <div className="rounded-2xl border border-simba-gray-200 bg-white overflow-hidden divide-y divide-simba-gray-100">
            {tools.map((t, i) => (
              <div
                key={t.id ?? t.tool_id ?? i}
                className="px-5 py-3 flex items-center justify-between"
              >
                <span className="text-sm font-medium text-simba-black">
                  {t.name ?? 'Untitled tool'}
                </span>
                <span className="text-xs text-simba-gray-500">{t.type ?? ''}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </PageShell>
  );
}
