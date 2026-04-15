import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  dark?: boolean;
}

export function Card({ children, className, dark }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl p-6 sm:p-8 transition-all duration-200',
        dark
          ? 'bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10'
          : 'bg-white border border-simba-gray-200 hover:border-simba-gray-300 hover:shadow-lg',
        className
      )}
    >
      {children}
    </div>
  );
}
