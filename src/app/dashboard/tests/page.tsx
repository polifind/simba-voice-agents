import { PageShell } from '@/components/dashboard/PageShell';
import { EmptyState } from '@/components/dashboard/EmptyState';
import { BeakerIcon } from '@heroicons/react/24/outline';

export default async function TestsPage() {
  return (
    <PageShell title="Tests">
      <h1 className="text-3xl font-black tracking-tight text-simba-black">
        Tests
      </h1>

      <div className="mt-6">
        <EmptyState
          icon={<BeakerIcon />}
          title="No tests found"
          description="Create test scenarios to validate agent behavior."
        />
      </div>
    </PageShell>
  );
}
