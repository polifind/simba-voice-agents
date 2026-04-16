import { PageShell } from '@/components/dashboard/PageShell';
import { PhoneNumbersClient } from '@/components/dashboard/PhoneNumbersClient';
import { listPhoneNumbers } from '@/lib/elevenlabs';

export const dynamic = 'force-dynamic';

type PhoneRow = { phone_number?: string; id?: string; agent_id?: string; label?: string };

export default async function PhoneNumbersPage() {
  let phones: PhoneRow[] = [];
  try {
    const data = (await listPhoneNumbers()) as { phone_numbers?: PhoneRow[] } | PhoneRow[];
    if (Array.isArray(data)) phones = data;
    else phones = data.phone_numbers ?? [];
  } catch {
    // soft fail
  }

  return (
    <PageShell title="Phone Numbers">
      <PhoneNumbersClient phones={phones} />
    </PageShell>
  );
}
