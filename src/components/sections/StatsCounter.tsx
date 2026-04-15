import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import type { StatsData } from '@/templates/types';

interface StatsCounterProps {
  data: StatsData;
}

export function StatsCounter({ data }: StatsCounterProps) {
  return (
    <section className="py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedCounter value={data.value} label={data.label} />
      </div>
    </section>
  );
}
