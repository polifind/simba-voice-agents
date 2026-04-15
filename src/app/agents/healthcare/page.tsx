import { StandardPageTemplate } from '@/templates/StandardPageTemplate';
import { agentsHealthcareData } from '@/data/agents-healthcare';
import type { Metadata } from 'next';

export const metadata: Metadata = agentsHealthcareData.meta;

export default function HealthcarePage() {
  return <StandardPageTemplate data={agentsHealthcareData} />;
}
