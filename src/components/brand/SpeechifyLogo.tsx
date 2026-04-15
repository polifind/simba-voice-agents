import clsx from 'clsx';

type Props = {
  className?: string;
  markColor?: string;
  textColor?: string;
};

// Stylized Speechify-style logo: blue soundwave mark + bold "Speechify" wordmark.
export function SpeechifyLogo({
  className,
  markColor = '#2F43FA',
  textColor = '#1E2A47',
}: Props) {
  return (
    <span className={clsx('inline-flex items-center gap-3', className)}>
      <svg
        viewBox="0 0 80 40"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="h-10 w-auto"
      >
        <path
          d="M2 20 C 8 20, 10 5, 14 5 S 20 35, 24 35 S 30 2, 34 2 S 40 38, 44 38 S 50 6, 54 6 S 60 32, 64 32 S 70 20, 78 20"
          stroke={markColor}
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
      <span
        className="text-3xl sm:text-4xl font-black tracking-tight"
        style={{ color: textColor }}
      >
        Speechify
      </span>
    </span>
  );
}
