import { PageShell } from '@/components/dashboard/PageShell';
import { DevelopersClient } from '@/components/dashboard/DevelopersClient';

export default function DevelopersPage() {
  return (
    <PageShell title="Developers">
      <DevelopersClient />
    </PageShell>
  );
}
