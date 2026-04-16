import { PageShell } from '@/components/dashboard/PageShell';
import { SettingsClient } from '@/components/dashboard/SettingsClient';

export default function SettingsPage() {
  return (
    <PageShell title="Settings">
      <SettingsClient />
    </PageShell>
  );
}
