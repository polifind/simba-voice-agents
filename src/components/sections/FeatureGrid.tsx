import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { Card } from '@/components/ui/Card';
import type { FeatureGridData } from '@/templates/types';

interface FeatureGridProps {
  data: FeatureGridData;
}

export function FeatureGrid({ data }: FeatureGridProps) {
  return (
    <SectionWrapper className="bg-simba-gray-50">
      {data.headline && (
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-simba-black">{data.headline}</h2>
          {data.description && (
            <p className="mt-4 text-lg text-simba-gray-600 max-w-2xl mx-auto">{data.description}</p>
          )}
        </div>
      )}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.features.map((feature, index) => (
          <Card key={index}>
            <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
            <p className="text-simba-gray-600 leading-relaxed">{feature.description}</p>
          </Card>
        ))}
      </div>
    </SectionWrapper>
  );
}
