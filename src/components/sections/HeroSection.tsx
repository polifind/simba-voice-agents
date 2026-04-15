import { Button } from '@/components/ui/Button';
import type { HeroData } from '@/templates/types';

interface HeroSectionProps {
  data: HeroData;
}

export function HeroSection({ data }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-white pt-16 pb-20 sm:pt-24 sm:pb-28">
      {/* Background gradient decoration */}
      <div className="absolute top-0 right-0 -z-10 h-[500px] w-[500px] rounded-full bg-simba-blue/5 blur-[120px]" />
      <div className="absolute bottom-0 left-0 -z-10 h-[400px] w-[400px] rounded-full bg-simba-blue/5 blur-[100px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text content */}
          <div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-simba-black leading-[1.1]">
              {data.headline}
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-simba-gray-600 leading-relaxed max-w-xl">
              {data.subheadline}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button href={data.primaryCTA.href} size="lg">
                {data.primaryCTA.label}
              </Button>
              <Button href={data.secondaryCTA.href} variant="secondary" size="lg">
                {data.secondaryCTA.label}
              </Button>
            </div>
          </div>

          {/* Right: Demo widget placeholder */}
          <div className="relative">
            <div className="rounded-3xl bg-gradient-to-br from-simba-gray-50 to-simba-gray-100 border border-simba-gray-200 p-8 sm:p-10">
              {/* Agent demo mockup */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex gap-2">
                  <button className="px-4 py-2 rounded-full bg-simba-blue text-white text-sm font-semibold">Voice</button>
                  <button className="px-4 py-2 rounded-full bg-simba-gray-200 text-simba-gray-600 text-sm font-semibold">Chat</button>
                </div>
              </div>
              {/* Animated orb */}
              <div className="flex items-center justify-center py-12">
                <div className="relative">
                  <div className="h-32 w-32 rounded-full bg-gradient-to-br from-simba-blue to-simba-blue-light opacity-80 animate-pulse" />
                  <div className="absolute inset-0 h-32 w-32 rounded-full bg-gradient-to-tr from-simba-blue/50 to-transparent blur-xl" />
                </div>
              </div>
              <div className="flex items-center justify-center gap-4 text-sm text-simba-gray-500">
                <span className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                  Agent ready
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
