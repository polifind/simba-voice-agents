import { Sidebar } from '@/components/dashboard/Sidebar';

export const metadata = {
  title: 'Dashboard — SIMBA',
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      <div className="flex-1 min-w-0">{children}</div>
    </div>
  );
}
