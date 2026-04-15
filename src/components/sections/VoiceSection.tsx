import { SectionWrapper } from '@/components/ui/SectionWrapper';
import type { VoiceSectionData } from '@/templates/types';

interface VoiceSectionProps {
  data: VoiceSectionData;
}

export function VoiceSection({ data }: VoiceSectionProps) {
  return (
    <SectionWrapper>
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-simba-black">{data.headline}</h2>
        {data.description && (
          <p className="mt-4 text-lg text-simba-gray-600 max-w-2xl mx-auto">{data.description}</p>
        )}
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {data.features.map((feature, index) => (
          <div key={index} className="text-center">
            <div className="mx-auto h-14 w-14 rounded-2xl bg-simba-blue/10 flex items-center justify-center mb-4">
              {index === 0 && (
                <svg className="h-7 w-7 text-simba-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
              )}
              {index === 1 && (
                <svg className="h-7 w-7 text-simba-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              )}
              {index === 2 && (
                <svg className="h-7 w-7 text-simba-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                </svg>
              )}
            </div>
            <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
            <p className="text-simba-gray-600 leading-relaxed">{feature.description}</p>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
