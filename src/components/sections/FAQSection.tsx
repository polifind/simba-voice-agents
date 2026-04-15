import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { Accordion } from '@/components/ui/Accordion';
import type { FAQItem } from '@/templates/types';

interface FAQSectionProps {
  questions: FAQItem[];
}

export function FAQSection({ questions }: FAQSectionProps) {
  return (
    <SectionWrapper>
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-simba-black text-center mb-12">
          Frequently asked questions
        </h2>
        <Accordion items={questions} />
      </div>
    </SectionWrapper>
  );
}
