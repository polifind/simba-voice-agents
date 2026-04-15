import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { Button } from '@/components/ui/Button';
import type { GettingStartedData } from '@/templates/types';

interface GettingStartedCTAProps {
  data: GettingStartedData;
}

export function GettingStartedCTA({ data }: GettingStartedCTAProps) {
  return (
    <SectionWrapper>
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-simba-black">{data.headline}</h2>
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        {/* Web platform option */}
        <div className="rounded-2xl border border-simba-gray-200 p-8 bg-white">
          <div className="h-12 w-12 rounded-xl bg-simba-blue/10 flex items-center justify-center mb-4">
            <svg className="h-6 w-6 text-simba-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-3">{data.webOption.title}</h3>
          <p className="text-simba-gray-600 mb-6 leading-relaxed">{data.webOption.description}</p>
          <div className="flex flex-wrap gap-3">
            {data.webOption.ctas.map((cta, i) => (
              <Button key={i} href={cta.href} variant={cta.variant || 'primary'} size="sm">
                {cta.label}
              </Button>
            ))}
          </div>
        </div>

        {/* API option */}
        <div className="rounded-2xl border border-simba-gray-200 p-8 bg-white">
          <div className="h-12 w-12 rounded-xl bg-simba-blue/10 flex items-center justify-center mb-4">
            <svg className="h-6 w-6 text-simba-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-3">{data.apiOption.title}</h3>
          <p className="text-simba-gray-600 mb-6 leading-relaxed">{data.apiOption.description}</p>
          <div className="flex flex-wrap gap-3">
            {data.apiOption.ctas.map((cta, i) => (
              <Button key={i} href={cta.href} variant={cta.variant || 'secondary'} size="sm">
                {cta.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
