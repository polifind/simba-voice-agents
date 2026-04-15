import { StandardPageTemplate } from '@/templates/StandardPageTemplate';
import { agentsRetailData } from '@/data/agents-retail';
import type { Metadata } from 'next';

export const metadata: Metadata = agentsRetailData.meta;

export default function RetailEcommercePage() {
  return <StandardPageTemplate data={agentsRetailData} />;
}
