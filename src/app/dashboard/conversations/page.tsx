import { PageShell } from '@/components/dashboard/PageShell';
import { ConversationsClient } from '@/components/dashboard/ConversationsClient';
import { listConversations, type Conversation } from '@/lib/elevenlabs';

export const dynamic = 'force-dynamic';

export default async function ConversationsPage() {
  let conversations: Conversation[] = [];
  try {
    const data = await listConversations();
    conversations = data.conversations ?? [];
    conversations.sort((a, b) => (b.start_time_unix_secs ?? 0) - (a.start_time_unix_secs ?? 0));
  } catch {
    // soft fail
  }

  return (
    <PageShell title="Conversation history">
      <ConversationsClient conversations={conversations} />
    </PageShell>
  );
}
