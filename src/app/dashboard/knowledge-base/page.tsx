import { PageShell } from '@/components/dashboard/PageShell';
import { ActionCard } from '@/components/dashboard/ActionCard';
import { EmptyState } from '@/components/dashboard/EmptyState';
import { FilterChips } from '@/components/dashboard/FilterChips';
import { listKnowledgeBase, type KnowledgeBaseDoc } from '@/lib/elevenlabs';
import {
  GlobeAltIcon,
  DocumentArrowUpIcon,
  DocumentTextIcon,
  FolderPlusIcon,
  MagnifyingGlassIcon,
  BookOpenIcon,
} from '@heroicons/react/24/outline';

export const dynamic = 'force-dynamic';

export default async function KnowledgeBasePage() {
  let docs: KnowledgeBaseDoc[] = [];
  try {
    const data = await listKnowledgeBase();
    docs = data.documents ?? [];
  } catch {
    // soft fail — still render empty state
  }

  return (
    <PageShell title="Knowledge Base">
      {/* Heading */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-black tracking-tight text-simba-black">
            Knowledge Base
          </h1>
          <BookOpenIcon className="h-5 w-5 text-simba-gray-400" />
        </div>
        <div className="inline-flex items-center gap-2 rounded-full border border-simba-gray-200 bg-white px-3 py-1.5 text-xs">
          <span className="h-2 w-2 rounded-full bg-green-500" />
          <span className="text-simba-gray-700">
            RAG Storage: <span className="font-semibold text-simba-black">0 B</span>{' '}
            / 104.9 MB
          </span>
        </div>
      </div>

      {/* Action cards */}
      <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3">
        <ActionCard icon={<GlobeAltIcon />} label="Add URL" />
        <ActionCard icon={<DocumentArrowUpIcon />} label="Add Files" />
        <ActionCard icon={<DocumentTextIcon />} label="Create Text" />
        <ActionCard icon={<FolderPlusIcon />} label="Create Folder" />
      </div>

      {/* Search */}
      <div className="mt-6 relative">
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-simba-gray-400" />
        <input
          type="text"
          placeholder="Search Knowledge Base..."
          className="w-full rounded-xl border border-simba-gray-200 bg-white pl-9 pr-3 py-2.5 text-sm placeholder:text-simba-gray-400 focus:outline-none focus:ring-2 focus:ring-simba-blue/30 focus:border-simba-blue"
        />
      </div>

      <div className="mt-3">
        <FilterChips labels={['Type', 'Creator']} />
      </div>

      {/* List / empty */}
      <div className="mt-6">
        {docs.length === 0 ? (
          <EmptyState
            icon={<BookOpenIcon />}
            title="No documents found"
            description="You don't have any documents yet."
          />
        ) : (
          <div className="rounded-2xl border border-simba-gray-200 bg-white overflow-hidden divide-y divide-simba-gray-100">
            {docs.map((doc) => (
              <div key={doc.id} className="px-5 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3 min-w-0">
                  <DocumentTextIcon className="h-4 w-4 text-simba-gray-500 flex-shrink-0" />
                  <span className="text-sm font-medium text-simba-black truncate">
                    {doc.name || 'Untitled'}
                  </span>
                </div>
                <span className="text-xs text-simba-gray-500 flex-shrink-0">
                  {doc.type ?? ''}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </PageShell>
  );
}
