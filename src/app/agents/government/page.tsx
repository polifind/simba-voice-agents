import { StandardPageTemplate } from '@/templates/StandardPageTemplate';
import { agentsGovernmentData } from '@/data/agents-government';
import type { Metadata } from 'next';

export const metadata: Metadata = agentsGovernmentData.meta;

export default function GovernmentPage() {
  return <StandardPageTemplate data={agentsGovernmentData} />;
}
