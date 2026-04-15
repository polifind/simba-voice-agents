import { StandardPageTemplate } from '@/templates/StandardPageTemplate';
import { leadQualificationData } from '@/data/lead-qualification';
import type { Metadata } from 'next';

export const metadata: Metadata = leadQualificationData.meta;

export default function LeadQualificationPage() {
  return <StandardPageTemplate data={leadQualificationData} />;
}
