import { NextResponse } from 'next/server';
import { createSession } from '@/lib/auth';

export async function POST(req: Request) {
  let body: { email?: string; password?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const email = body.email?.trim().toLowerCase() ?? '';
  const password = body.password ?? '';

  if (!email || !password) {
    return NextResponse.json(
      { error: 'Please enter your email and password.' },
      { status: 400 }
    );
  }

  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return NextResponse.json(
      { error: "That doesn't look like a valid email." },
      { status: 400 }
    );
  }

  if (password.length < 4) {
    return NextResponse.json(
      { error: 'Password must be at least 4 characters.' },
      { status: 400 }
    );
  }

  // Demo: any well-formed email + any ≥4-char password signs the user in.
  await createSession(email);
  return NextResponse.json({ success: true });
}
