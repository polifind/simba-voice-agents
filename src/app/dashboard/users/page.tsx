import { PageShell } from '@/components/dashboard/PageShell';
import { FilterChips } from '@/components/dashboard/FilterChips';
import { EmptyState } from '@/components/dashboard/EmptyState';
import { MagnifyingGlassIcon, UsersIcon } from '@heroicons/react/24/outline';

export default function UsersPage() {
  return (
    <PageShell title="Users">
      <h1 className="text-3xl font-black tracking-tight text-simba-black">
        Users
      </h1>

      <div className="mt-5 relative">
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-simba-gray-400" />
        <input
          type="text"
          placeholder="Search users by ID..."
          className="w-full rounded-xl border border-simba-gray-200 bg-white pl-9 pr-3 py-2.5 text-sm placeholder:text-simba-gray-400 focus:outline-none focus:ring-2 focus:ring-simba-blue/30 focus:border-simba-blue"
        />
      </div>

      <div className="mt-3">
        <FilterChips labels={['Date After', 'Date Before', 'Agent', 'Branch']} />
      </div>

      <div className="mt-6">
        <EmptyState
          icon={<UsersIcon />}
          title="No users found"
          description="No users have interacted with your agents yet."
        />
      </div>
    </PageShell>
  );
}
