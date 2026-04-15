import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { TabGroup } from '@/components/ui/TabGroup';
import type { PlatformFeaturesData } from '@/templates/types';

interface PlatformFeaturesProps {
  data: PlatformFeaturesData;
}

export function PlatformFeatures({ data }: PlatformFeaturesProps) {
  return (
    <SectionWrapper>
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-simba-black">
          {data.headline}
        </h2>
        {data.description && (
          <p className="mt-4 text-lg text-simba-gray-600 max-w-2xl mx-auto">{data.description}</p>
        )}
      </div>
      <TabGroup tabs={data.tabs} />
    </SectionWrapper>
  );
}
