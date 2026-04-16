import { PageShell } from '@/components/dashboard/PageShell';
import { PlusIcon, MagnifyingGlassIcon, PhoneIcon } from '@heroicons/react/24/outline';

export default function OutboundPage() {
  return (
    <PageShell title="Batch Calling">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <h1 className="text-3xl font-black tracking-tight text-simba-black">
          Batch Calling
        </h1>
        <button
          type="button"
          className="inline-flex items-center gap-1 h-9 px-3 rounded-md bg-simba-black text-white text-sm font-semibold hover:bg-simba-gray-800"
        >
          <PlusIcon className="h-4 w-4" />
          Create a batch call
        </button>
      </div>

      <div className="mt-5 relative">
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-simba-gray-400" />
        <input
          type="text"
          placeholder="Search Batch Calls..."
          className="w-full rounded-xl border border-simba-gray-200 bg-white pl-9 pr-3 py-2.5 text-sm placeholder:text-simba-gray-400 focus:outline-none focus:ring-2 focus:ring-simba-blue/30 focus:border-simba-blue"
        />
      </div>

      <div className="mt-6 rounded-2xl border border-simba-gray-200 bg-white py-20 px-6 flex flex-col items-center text-center">
        <div className="h-10 w-10 text-simba-gray-400 mb-4">
          <PhoneIcon />
        </div>
        <div className="text-sm font-semibold text-simba-black">
          No batch calls found
        </div>
        <div className="mt-1 text-sm text-simba-gray-500">
          You have not created any batch calls yet.
        </div>
      </div>
    </PageShell>
  );
}
