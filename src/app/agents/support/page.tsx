import { StandardPageTemplate } from '@/templates/StandardPageTemplate';
import { agentsSupportData } from '@/data/agents-support';
import type { Metadata } from 'next';

export const metadata: Metadata = agentsSupportData.meta;

export default function AgentsSupportPage() {
  return <StandardPageTemplate data={agentsSupportData} />;
}
