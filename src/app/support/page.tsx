import { StandardPageTemplate } from '@/templates/StandardPageTemplate';
import { supportData } from '@/data/support';
import type { Metadata } from 'next';

export const metadata: Metadata = supportData.meta;

export default function SupportPage() {
  return <StandardPageTemplate data={supportData} />;
}
