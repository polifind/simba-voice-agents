import { PageShell } from '@/components/dashboard/PageShell';
import { WhatsAppClient } from '@/components/dashboard/WhatsAppClient';

export default function WhatsAppPage() {
  return (
    <PageShell title="WhatsApp accounts">
      <WhatsAppClient />
    </PageShell>
  );
}
