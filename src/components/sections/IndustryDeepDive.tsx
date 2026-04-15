import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { Card } from '@/components/ui/Card';
import type { IndustryDeepDiveData } from '@/templates/types';

interface IndustryDeepDiveProps {
  data: IndustryDeepDiveData;
}

export function IndustryDeepDive({ data }: IndustryDeepDiveProps) {
  return (
    <SectionWrapper className="bg-simba-gray-50">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-simba-black">{data.headline}</h2>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.industries.map((industry, index) => (
          <Card key={index}>
            <h3 className="text-lg font-bold mb-2">{industry.name}</h3>
            <p className="text-simba-gray-600 leading-relaxed">{industry.description}</p>
          </Card>
        ))}
      </div>
    </SectionWrapper>
  );
}
