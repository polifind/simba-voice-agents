import { StandardPageTemplate } from '@/templates/StandardPageTemplate';
import { agentsTechnologyData } from '@/data/agents-technology';
import type { Metadata } from 'next';

export const metadata: Metadata = agentsTechnologyData.meta;

export default function TechnologyPage() {
  return <StandardPageTemplate data={agentsTechnologyData} />;
}
