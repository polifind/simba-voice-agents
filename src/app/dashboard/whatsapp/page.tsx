import { PageShell } from '@/components/dashboard/PageShell';
import { PlusIcon, ChatBubbleOvalLeftEllipsisIcon, BookOpenIcon } from '@heroicons/react/24/outline';

export default function WhatsAppPage() {
  return (
    <PageShell title="WhatsApp accounts">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-black tracking-tight text-simba-black">
            WhatsApp accounts
          </h1>
          <BookOpenIcon className="h-5 w-5 text-simba-gray-400" />
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-1 h-9 px-3 rounded-md bg-simba-black text-white text-sm font-semibold hover:bg-simba-gray-800"
        >
          <PlusIcon className="h-4 w-4" />
          Import account
        </button>
      </div>

      <div className="mt-6 rounded-2xl border border-simba-gray-200 bg-white py-20 px-6 flex flex-col items-center text-center">
        <div className="h-10 w-10 text-simba-gray-400 mb-4">
          <ChatBubbleOvalLeftEllipsisIcon />
        </div>
        <div className="text-sm font-semibold text-simba-black">
          No WhatsApp accounts
        </div>
        <div className="mt-1 text-sm text-simba-gray-500">
          You don&apos;t have any WhatsApp accounts yet.
        </div>
        <button
          type="button"
          className="mt-4 inline-flex items-center gap-1 rounded-md border border-simba-gray-200 px-3 py-2 text-sm font-medium text-simba-gray-800 hover:bg-simba-gray-50"
        >
          <PlusIcon className="h-4 w-4" />
          Import account
        </button>
      </div>
    </PageShell>
  );
}
