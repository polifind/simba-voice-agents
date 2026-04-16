import { PageShell } from '@/components/dashboard/PageShell';
import { KnowledgeBaseClient } from '@/components/dashboard/KnowledgeBaseClient';
import { listKnowledgeBase } from '@/lib/elevenlabs';

export const dynamic = 'force-dynamic';

export default async function KnowledgeBasePage() {
  let docs: { id: string; name: string; type?: string }[] = [];
  try {
    const data = await listKnowledgeBase();
    docs = (data.documents ?? []).map((d) => ({ id: d.id, name: d.name, type: d.type }));
  } catch {
    // soft fail
  }

  return (
    <PageShell title="Knowledge Base">
      <KnowledgeBaseClient docs={docs} />
    </PageShell>
  );
}
