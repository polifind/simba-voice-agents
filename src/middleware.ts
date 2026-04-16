import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { SESSION_COOKIE } from '@/lib/auth';

export function middleware(req: NextRequest) {
  const hasSession = !!req.cookies.get(SESSION_COOKIE);
  const { pathname } = req.nextUrl;

  // Gate the dashboard.
  if (pathname.startsWith('/dashboard') && !hasSession) {
    const url = req.nextUrl.clone();
    url.pathname = '/login';
    if (pathname !== '/dashboard') url.searchParams.set('from', pathname);
    return NextResponse.redirect(url);
  }

  // Signed-in users skip past /login and /signup straight to the dashboard.
  if ((pathname === '/login' || pathname === '/signup') && hasSession) {
    const url = req.nextUrl.clone();
    url.pathname = '/dashboard';
    url.search = '';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/login', '/signup'],
};
