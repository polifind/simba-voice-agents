import Link from 'next/link';
import { PageShell } from '@/components/dashboard/PageShell';
import { getConversation } from '@/lib/elevenlabs';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
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
  return `${m}m ${s}s`;
}

function formatCallTime(secs?: number): string {
  if (secs == null) return '';
  const m = Math.floor(secs / 60);
  const s = Math.round(secs % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export default async function ConversationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let convo: Awaited<ReturnType<typeof getConversation>> | null = null;
  let loadError: string | null = null;
  try {
    convo = await getConversation(id);
  } catch (err) {
    loadError = err instanceof Error ? err.message : 'Failed to load conversation';
  }

  const isSuccess =
    convo?.call_successful === 'success' ||
    convo?.call_successful === 'true' ||
    convo?.analysis?.call_successful === 'success';

  return (
    <PageShell title="Conversation">
      <Link
        href="/dashboard/conversations"
        className="inline-flex items-center gap-1 text-sm text-simba-gray-600 hover:text-simba-black mb-4"
      >
        <ArrowLeftIcon className="h-3.5 w-3.5" /> Back to conversations
      </Link>

      {loadError || !convo ? (
        <div className="mt-8 text-center text-simba-gray-500">
          {loadError || 'Conversation not found.'}
        </div>
      ) : (
        <>
          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 mt-2">
            <h1 className="text-2xl font-black tracking-tight text-simba-black">
              {convo.agent_name || convo.agent_id?.slice(0, 8) || 'Unknown agent'}
            </h1>
            <span
              className={clsx(
                'inline-block rounded-full px-2.5 py-0.5 text-xs font-medium capitalize',
                isSuccess
                  ? 'bg-green-50 text-green-700 border border-green-200'
                  : 'bg-simba-gray-100 text-simba-gray-600'
              )}
            >
              {isSuccess ? 'Successful' : convo.status ?? convo.call_successful ?? '—'}
            </span>
          </div>

          <div className="mt-3 flex flex-wrap gap-6 text-sm text-simba-gray-600">
            <div>
              <span className="text-simba-gray-400">Date:</span>{' '}
              {formatDate(convo.start_time_unix_secs)}
            </div>
            <div>
              <span className="text-simba-gray-400">Duration:</span>{' '}
              {formatDuration(convo.call_duration_secs)}
            </div>
            <div>
              <span className="text-simba-gray-400">Messages:</span>{' '}
              {convo.message_count ?? convo.transcript?.length ?? '—'}
            </div>
          </div>

          {/* Summary */}
          {convo.analysis?.transcript_summary && (
            <div className="mt-6 rounded-xl border border-simba-gray-200 bg-simba-gray-50 p-4">
              <div className="text-xs font-semibold uppercase tracking-wider text-simba-gray-500 mb-1">
                Summary
              </div>
              <p className="text-sm text-simba-gray-700 leading-relaxed">
                {convo.analysis.transcript_summary}
              </p>
            </div>
          )}

          {/* Transcript */}
          <div className="mt-8">
            <h2 className="text-lg font-bold text-simba-black mb-4">Transcript</h2>

            {!convo.transcript || convo.transcript.length === 0 ? (
              <div className="text-sm text-simba-gray-500">
                No transcript available for this conversation.
              </div>
            ) : (
              <div className="space-y-3">
                {convo.transcript.map((msg, i) => (
                  <div
                    key={i}
                    className={clsx(
                      'flex',
                      msg.role === 'agent' ? 'justify-start' : 'justify-end'
                    )}
                  >
                    <div className="max-w-[80%]">
                      <div
                        className={clsx(
                          'text-[10px] mb-0.5',
                          msg.role === 'agent'
                            ? 'text-simba-gray-400'
                            : 'text-simba-gray-400 text-right'
                        )}
                      >
                        {msg.role === 'agent' ? 'Agent' : 'User'}
                        {msg.time_in_call_secs != null && (
                          <span className="ml-1">{formatCallTime(msg.time_in_call_secs)}</span>
                        )}
                      </div>
                      <div
                        className={clsx(
                          'rounded-2xl px-4 py-2.5 text-sm leading-relaxed',
                          msg.role === 'agent'
                            ? 'bg-simba-gray-100 text-simba-gray-900 rounded-bl-sm'
                            : 'bg-simba-blue text-white rounded-br-sm'
                        )}
                      >
                        {msg.message}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </PageShell>
  );
}
