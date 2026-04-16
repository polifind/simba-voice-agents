import { PlusIcon } from '@heroicons/react/24/outline';

type Props = {
  labels: string[];
};

// Non-functional filter chips matching the dashboard reference UI.
// Clicking doesn't actually filter yet — visual scaffolding only.
export function FilterChips({ labels }: Props) {
  return (
    <div className="flex items-center gap-2">
      {labels.map((label) => (
        <button
          key={label}
          type="button"
          className="inline-flex items-center gap-1 rounded-full border border-simba-gray-200 bg-white px-3 py-1 text-xs font-medium text-simba-gray-700 hover:bg-simba-gray-50"
        >
          <PlusIcon className="h-3 w-3" />
          {label}
        </button>
      ))}
    </div>
  );
}
