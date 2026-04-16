import { PageShell } from '@/components/dashboard/PageShell';
import { IntegrationsClient } from '@/components/dashboard/IntegrationsClient';

export default function IntegrationsPage() {
  return (
    <PageShell title="Integrations">
      <IntegrationsClient />
    </PageShell>
  );
}
