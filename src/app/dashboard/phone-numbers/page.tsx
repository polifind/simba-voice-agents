import { PageShell } from '@/components/dashboard/PageShell';
import { EmptyState } from '@/components/dashboard/EmptyState';
import { listPhoneNumbers } from '@/lib/elevenlabs';
import { PhoneIcon, PlusIcon } from '@heroicons/react/24/outline';

export const dynamic = 'force-dynamic';

type PhoneRow = { phone_number?: string; id?: string; agent_id?: string; label?: string };

export default async function PhoneNumbersPage() {
  let phones: PhoneRow[] = [];
  try {
    const data = (await listPhoneNumbers()) as
      | { phone_numbers?: PhoneRow[] }
      | PhoneRow[];
    if (Array.isArray(data)) phones = data;
    else phones = data.phone_numbers ?? [];
  } catch {
    // soft fail
  }

  return (
    <PageShell title="Phone Numbers">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <h1 className="text-3xl font-black tracking-tight text-simba-black">
          Phone Numbers
        </h1>
        <button
          type="button"
          className="inline-flex items-center gap-1 h-9 px-3 rounded-md bg-simba-black text-white text-sm font-semibold hover:bg-simba-gray-800"
        >
          <PlusIcon className="h-4 w-4" />
          Import number
        </button>
      </div>

      <div className="mt-6">
        {phones.length === 0 ? (
          <div className="rounded-2xl border border-simba-gray-200 bg-white py-20 px-6 flex flex-col items-center text-center">
            <div className="h-10 w-10 text-simba-gray-400 mb-4">
              <PhoneIcon />
            </div>
            <div className="text-sm font-semibold text-simba-black">
              No phone numbers
            </div>
            <div className="mt-1 text-sm text-simba-gray-500">
              You don&apos;t have any phone numbers yet.
            </div>
            <button
              type="button"
              className="mt-4 inline-flex items-center gap-1 rounded-md border border-simba-gray-200 px-3 py-2 text-sm font-medium text-simba-gray-800 hover:bg-simba-gray-50"
            >
              <PlusIcon className="h-4 w-4" />
              Import number
            </button>
          </div>
        ) : (
          <div className="rounded-2xl border border-simba-gray-200 bg-white divide-y divide-simba-gray-100">
            {phones.map((p, i) => (
              <div key={p.id ?? i} className="px-5 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <PhoneIcon className="h-4 w-4 text-simba-gray-500" />
                  <span className="text-sm font-medium text-simba-black">
                    {p.phone_number ?? p.label ?? 'Unknown'}
                  </span>
                </div>
                <span className="text-xs text-simba-gray-500">
                  {p.agent_id ? `Agent: ${p.agent_id.slice(0, 8)}…` : ''}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </PageShell>
  );
}
