import clsx from 'clsx';

type Props = {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  href?: string;
  disabled?: boolean;
  className?: string;
};

// Square-ish action card used on Knowledge Base / Tools landing views.
export function ActionCard({ icon, label, onClick, href, disabled, className }: Props) {
  const base =
    'flex flex-col items-start gap-3 rounded-xl border border-simba-gray-200 bg-white px-5 py-4 text-left transition-colors hover:border-simba-gray-300 hover:bg-simba-gray-50 disabled:opacity-50 disabled:cursor-not-allowed';
  const cls = clsx(base, className);
  const content = (
    <>
      <span className="h-5 w-5 text-simba-gray-700">{icon}</span>
      <span className="text-sm font-semibold text-simba-black">{label}</span>
    </>
  );
  if (href && !disabled) {
    return (
      <a href={href} className={cls}>
        {content}
      </a>
    );
  }
  return (
    <button type="button" onClick={onClick} disabled={disabled} className={cls}>
      {content}
    </button>
  );
}
