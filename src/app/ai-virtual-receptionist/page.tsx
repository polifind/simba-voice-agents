import { StandardPageTemplate } from '@/templates/StandardPageTemplate';
import { aiVirtualReceptionistData } from '@/data/ai-virtual-receptionist';
import type { Metadata } from 'next';

export const metadata: Metadata = aiVirtualReceptionistData.meta;

export default function AIVirtualReceptionistPage() {
  return <StandardPageTemplate data={aiVirtualReceptionistData} />;
}
