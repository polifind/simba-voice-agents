import clsx from 'clsx';
import { BellIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { SparklesIcon } from '@heroicons/react/24/solid';

type Props = {
  title: string;
  rightSlot?: React.ReactNode;
};

export function TopBar({ title, rightSlot }: Props) {
  return (
    <header className="sticky top-0 z-20 bg-white/80 backdrop-blur border-b border-simba-gray-100">
      <div className="flex items-center justify-between px-6 h-14">
        <div className="flex items-center gap-2 text-sm">
          <span className="h-6 w-6 rounded border border-simba-gray-200 flex items-center justify-center text-simba-gray-500">
            <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="2" width="12" height="12" rx="2" />
            </svg>
          </span>
          <span className="font-medium text-simba-black">{title}</span>
        </div>
        <div className="flex items-center gap-2">
          {rightSlot}
          <button
            className={clsx(
              'hidden sm:flex items-center gap-1.5 px-3 h-8 rounded-md border border-simba-gray-200 text-xs font-medium text-simba-gray-700 hover:bg-simba-gray-50'
            )}
          >
            <SparklesIcon className="h-3.5 w-3.5 text-simba-blue" />
            What&apos;s new
          </button>
          <button className="hidden sm:inline-flex items-center h-8 px-3 rounded-md border border-simba-gray-200 text-xs font-medium text-simba-gray-700 hover:bg-simba-gray-50">
            Feedback
          </button>
          <button className="hidden sm:inline-flex items-center h-8 px-3 rounded-md border border-simba-gray-200 text-xs font-medium text-simba-gray-700 hover:bg-simba-gray-50">
            Docs
          </button>
          <button className="hidden sm:inline-flex items-center gap-1 h-8 px-3 rounded-md border border-simba-gray-200 text-xs font-medium text-simba-gray-700 hover:bg-simba-gray-50">
            Ask
          </button>
          <button className="h-8 w-8 rounded-md border border-simba-gray-200 flex items-center justify-center text-simba-gray-600 hover:bg-simba-gray-50">
            <BellIcon className="h-4 w-4" />
          </button>
          <button className="h-8 w-8 rounded-full border border-simba-gray-200 flex items-center justify-center text-simba-gray-600 hover:bg-simba-gray-50">
            <UserCircleIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
