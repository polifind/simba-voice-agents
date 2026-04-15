import { StandardPageTemplate } from '@/templates/StandardPageTemplate';
import { agentsFinancialData } from '@/data/agents-financial';
import type { Metadata } from 'next';

export const metadata: Metadata = agentsFinancialData.meta;

export default function FinancialServicesPage() {
  return <StandardPageTemplate data={agentsFinancialData} />;
}
