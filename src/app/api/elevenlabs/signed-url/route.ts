import { NextResponse } from 'next/server';
import { getSignedUrl } from '@/lib/elevenlabs';

// Returns a short-lived signed URL the browser uses to open a direct WebSocket
// connection to the ElevenLabs agent. Keeps the API key server-side.
export const dynamic = 'force-dynamic';

export async function GET() {
  const agentId = process.env.ELEVENLABS_AGENT_ID;
  if (!agentId) {
    return NextResponse.json(
      { error: 'ELEVENLABS_AGENT_ID is not configured' },
      { status: 500 }
    );
  }
  try {
    const { signed_url } = await getSignedUrl(agentId);
    return NextResponse.json({ signed_url });
  } catch (err) {
    console.error('[signed-url] failed', err);
    return NextResponse.json(
      { error: 'Failed to create signed URL' },
      { status: 502 }
    );
  }
}
