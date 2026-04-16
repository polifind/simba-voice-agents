import { PageShell } from '@/components/dashboard/PageShell';
import { EmptyState } from '@/components/dashboard/EmptyState';
import { CodeBracketIcon } from '@heroicons/react/24/outline';

export default async function DevelopersPage() {
  return (
    <PageShell title="Developers">
      <h1 className="text-3xl font-black tracking-tight text-simba-black">
        Developers
      </h1>

      <div className="mt-6">
        <EmptyState
          icon={<CodeBracketIcon />}
          title="No API keys"
          description="Generate API keys and manage developer access."
        />
      </div>
    </PageShell>
  );
}
