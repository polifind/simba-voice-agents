import clsx from 'clsx';

type Props = {
  className?: string;
};

// Official Speechify logo (soundwave mark + wordmark) from public/speechify-logo.png.
export function SpeechifyLogo({ className }: Props) {
  return (
    <img
      src="/speechify-logo.png"
      alt="Speechify"
      className={clsx('h-10 w-auto', className)}
    />
  );
}
