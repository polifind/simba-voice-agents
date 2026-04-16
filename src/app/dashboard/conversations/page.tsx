import Link from 'next/link';
import { PageShell } from '@/components/dashboard/PageShell';
import { FilterChips } from '@/components/dashboard/FilterChips';
import { EmptyState } from '@/components/dashboard/EmptyState';
import { listConversations, type Conversation } from '@/lib/elevenlabs';
import {
  MagnifyingGlassIcon,
  ChatBubbleLeftRightIcon,
} from '@heroicons/react/24/outline';
import clsx from 'clsx';

export const dynamic = 'force-dynamic';

function formatDate(unixSecs?: number): string {
  if (!unixSecs) return '—';
  return new Date(unixSecs * 1000).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

function formatDuration(secs?: number): string {
  if (!secs) return '—';
  const m = Math.floor(secs / 60);
  const s = Math.round(secs % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

function StatusBadge({ status }: { status?: string }) {
  const label = status || 'unknown';
  const isSuccess =
    label === 'done' || label === 'successful' || label === 'success';
  return (
    <span
      className={clsx(
        'inline-block rounded-full px-2.5 py-0.5 text-xs font-medium capitalize',
        isSuccess
          ? 'bg-green-50 text-green-700 border border-green-200'
          : 'bg-simba-gray-100 text-simba-gray-600'
      )}
    >
      {isSuccess ? 'Successful' : label}
    </span>
  );
}

const FILTER_LABELS = [
  'Date After',
  'Date Before',
  'Call status',
  'Criteria',
  'Data',
  'Duration',
  'Rating',
  'Comments',
  'Agent',
  'Tools',
  'Language',
  'User',
  'Channel',
];

export default async function ConversationsPage() {
  let conversations: Conversation[] = [];
  try {
    const data = await listConversations();
    conversations = data.conversations ?? [];
    conversations.sort(
      (a, b) =>
        (b.start_time_unix_secs ?? 0) - (a.start_time_unix_secs ?? 0)
    );
  } catch {
    // soft fail
  }

  return (
    <PageShell title="Conversation history">
      <h1 className="text-3xl font-black tracking-tight text-simba-black">
        Conversation history
      </h1>

      {/* Search */}
      <div className="mt-5 relative">
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-simba-gray-400" />
        <input
          type="text"
          placeholder="Search conversations..."
          className="w-full rounded-xl border border-simba-gray-200 bg-white pl-9 pr-3 py-2.5 text-sm placeholder:text-simba-gray-400 focus:outline-none focus:ring-2 focus:ring-simba-blue/30 focus:border-simba-blue"
        />
      </div>

      {/* Filter chips */}
      <div className="mt-3">
        <FilterChips labels={FILTER_LABELS} />
      </div>

      {/* Table */}
      <div className="mt-6">
        {conversations.length === 0 ? (
          <EmptyState
            icon={<ChatBubbleLeftRightIcon />}
            title="No conversations yet"
            description="Conversations will appear here once users start interacting with your agents."
          />
        ) : (
          <div className="rounded-2xl border border-simba-gray-200 bg-white overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-simba-gray-100 bg-white">
                  <th className="text-left font-medium text-simba-gray-500 px-5 py-3">
                    Date
                  </th>
                  <th className="text-left font-medium text-simba-gray-500 px-5 py-3">
                    Agent
                  </th>
                  <th className="text-left font-medium text-simba-gray-500 px-5 py-3">
                    Duration
                  </th>
                  <th className="text-left font-medium text-simba-gray-500 px-5 py-3">
                    Messages
                  </th>
                  <th className="text-left font-medium text-simba-gray-500 px-5 py-3">
                    Call status
                  </th>
                </tr>
              </thead>
              <tbody>
                {conversations.map((c) => (
                  <tr
                    key={c.conversation_id}
                    className="border-b border-simba-gray-100 last:border-b-0 hover:bg-simba-gray-50 cursor-pointer"
                  >
                    <td className="px-5 py-3 text-simba-gray-800">
                      <Link href={`/dashboard/conversations/${c.conversation_id}`} className="hover:underline">
                        {formatDate(c.start_time_unix_secs)}
                      </Link>
                    </td>
                    <td className="px-5 py-3 text-simba-gray-800">
                      {c.agent_name || c.agent_id || '—'}
                    </td>
                    <td className="px-5 py-3 text-simba-gray-800">
                      {formatDuration(c.call_duration_secs)}
                    </td>
                    <td className="px-5 py-3 text-simba-gray-800">
                      {c.message_count ?? '—'}
                    </td>
                    <td className="px-5 py-3">
                      <StatusBadge status={c.call_successful ?? c.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </PageShell>
  );
}
