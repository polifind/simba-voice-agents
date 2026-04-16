type Props = {
  icon: React.ReactNode;
  title: string;
  description?: string;
};

export function EmptyState({ icon, title, description }: Props) {
  return (
    <div className="rounded-2xl border border-simba-gray-200 bg-white py-20 px-6 flex flex-col items-center text-center">
      <div className="h-10 w-10 text-simba-gray-400 mb-4">{icon}</div>
      <div className="text-sm font-semibold text-simba-black">{title}</div>
      {description && (
        <div className="mt-1 text-sm text-simba-gray-500">{description}</div>
      )}
    </div>
  );
}
