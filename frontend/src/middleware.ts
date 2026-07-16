import { NextRequest, NextResponse } from 'next/server';

const accessCookie = 'memetools_access_token';
const protectedPaths = ['/dashboard', '/markets', '/watchlist', '/leaderboard'];

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const authenticated = Boolean(request.cookies.get(accessCookie)?.value);
  const isProtected = protectedPaths.some((path) => pathname === path || pathname.startsWith(`${path}/`));
  if (isProtected && !authenticated) {
    const loginUrl = new URL('/auth/login', request.url);
    loginUrl.searchParams.set('next', `${pathname}${search}`);
    return NextResponse.redirect(loginUrl);
  }
  if (pathname.startsWith('/auth/') && authenticated && pathname !== '/auth/reset-password') {
    return NextResponse.redirect(new URL('/', request.url));
  }
  return NextResponse.next();
}

export const config = { matcher: ['/auth/:path*', '/dashboard/:path*', '/markets/:path*', '/watchlist/:path*', '/leaderboard/:path*'] };
