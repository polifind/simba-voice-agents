import { PageShell } from '@/components/dashboard/PageShell';
import { ToolsClient } from '@/components/dashboard/ToolsClient';
import { listTools } from '@/lib/elevenlabs';

export const dynamic = 'force-dynamic';

type ToolRow = { id?: string; tool_id?: string; name?: string; type?: string };

export default async function ToolsPage() {
  let tools: ToolRow[] = [];
  try {
    const data = (await listTools()) as { tools?: ToolRow[] } | ToolRow[];
    if (Array.isArray(data)) tools = data;
    else tools = data.tools ?? [];
  } catch {
    // soft fail
  }

  return (
    <PageShell title="Tools">
      <ToolsClient tools={tools} />
    </PageShell>
  );
}
