import { StandardPageTemplate } from '@/templates/StandardPageTemplate';
import { outboundAgentsData } from '@/data/outbound-agents';
import type { Metadata } from 'next';

export const metadata: Metadata = outboundAgentsData.meta;

export default function OutboundAgentsPage() {
  return <StandardPageTemplate data={outboundAgentsData} />;
}
