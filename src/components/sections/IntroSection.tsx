import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { Card } from '@/components/ui/Card';
import type { IntroData } from '@/templates/types';

interface IntroSectionProps {
  data: IntroData;
}

export function IntroSection({ data }: IntroSectionProps) {
  return (
    <SectionWrapper>
      <div className="text-center mb-12">
        <p className="text-sm font-semibold text-simba-blue uppercase tracking-wider mb-3">
          {data.sectionLabel}
        </p>
        <h2 className="text-3xl sm:text-4xl font-bold text-simba-black">
          {data.headline}
        </h2>
        {data.description && (
          <p className="mt-4 text-lg text-simba-gray-600 max-w-2xl mx-auto">
            {data.description}
          </p>
        )}
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.cards.map((card, index) => (
          <Card key={index}>
            <div className="h-10 w-10 rounded-xl bg-simba-blue/10 flex items-center justify-center mb-4">
              <span className="text-simba-blue font-bold text-lg">{index + 1}</span>
            </div>
            <h3 className="text-lg font-bold mb-2">{card.title}</h3>
            <p className="text-simba-gray-600 leading-relaxed">{card.description}</p>
          </Card>
        ))}
      </div>
    </SectionWrapper>
  );
}
