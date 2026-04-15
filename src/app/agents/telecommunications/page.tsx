import { StandardPageTemplate } from '@/templates/StandardPageTemplate';
import { agentsTelecomData } from '@/data/agents-telecom';
import type { Metadata } from 'next';

export const metadata: Metadata = agentsTelecomData.meta;

export default function TelecomPage() {
  return <StandardPageTemplate data={agentsTelecomData} />;
}
