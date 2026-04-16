import { PageShell } from '@/components/dashboard/PageShell';
import { UsersClient } from '@/components/dashboard/UsersClient';

export default function UsersPage() {
  return (
    <PageShell title="Users">
      <UsersClient />
    </PageShell>
  );
}
