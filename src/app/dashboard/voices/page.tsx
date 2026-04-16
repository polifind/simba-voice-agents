import { PageShell } from '@/components/dashboard/PageShell';
import { VoicesClient } from '@/components/dashboard/VoicesClient';
import { listVoices, type Voice } from '@/lib/elevenlabs';

export const dynamic = 'force-dynamic';

export default async function VoicesPage() {
  let voices: Voice[] = [];
  try {
    const data = await listVoices();
    voices = data.voices ?? [];
  } catch {
    // soft fail
  }

  return (
    <PageShell title="Voices">
      <VoicesClient voices={voices} />
    </PageShell>
  );
}
