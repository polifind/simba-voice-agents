import { NextResponse } from 'next/server';
import { createAgent } from '@/lib/elevenlabs';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = await createAgent(body);
    return NextResponse.json(result);
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Failed to create agent';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
