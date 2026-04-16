import { PageShell } from '@/components/dashboard/PageShell';
import { EmptyState } from '@/components/dashboard/EmptyState';
import { LinkIcon } from '@heroicons/react/24/outline';

export default async function IntegrationsPage() {
  return (
    <PageShell title="Integrations">
      <h1 className="text-3xl font-black tracking-tight text-simba-black">
        Integrations
      </h1>

      <div className="mt-6">
        <EmptyState
          icon={<LinkIcon />}
          title="No integrations configured"
          description="Connect third-party tools and services."
        />
      </div>
    </PageShell>
  );
}
