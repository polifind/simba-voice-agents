import { cookies } from 'next/headers';

// Demo-grade auth. The session cookie is an httpOnly cookie containing the
// user's email. It's not cryptographically signed — this is a prototype, not
// a production identity system. Swap for NextAuth / Clerk / Auth.js before
// opening this to real users.
export const SESSION_COOKIE = 'simba_session';
const MAX_AGE = 60 * 60 * 24 * 30; // 30 days

export async function createSession(email: string): Promise<void> {
  const jar = await cookies();
  jar.set(SESSION_COOKIE, email, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: MAX_AGE,
    path: '/',
  });
}

export async function destroySession(): Promise<void> {
  const jar = await cookies();
  jar.delete(SESSION_COOKIE);
}

export type Session = { email: string };

export async function getSession(): Promise<Session | null> {
  const jar = await cookies();
  const val = jar.get(SESSION_COOKIE)?.value;
  if (!val) return null;
  return { email: val };
}

export function displayNameFromEmail(email: string): string {
  // "rohan.pavuluri@speechify.com" -> "Rohan"
  const local = email.split('@')[0] ?? '';
  const first = local.split(/[.\-_+]/)[0] ?? local;
  if (!first) return 'there';
  return first.charAt(0).toUpperCase() + first.slice(1);
}

export function greetingForNow(): 'Good morning' | 'Good afternoon' | 'Good evening' {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 18) return 'Good afternoon';
  return 'Good evening';
}
