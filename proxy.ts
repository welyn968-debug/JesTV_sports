import { type NextRequest, NextResponse } from 'next/server';

export function proxy(request: NextRequest) {
  const { hostname, pathname } = new URL(request.url);
  const isLocalhost =
    hostname.includes('localhost') || hostname.includes('127.0.0.1');

  // Production subdomain routing
  if (!isLocalhost) {
    const parts = hostname.split('.');
    if (parts.length > 2 && parts[0] !== 'www') {
      const subdomain = parts[0];

      if (subdomain === 'admin') {
        const url = request.nextUrl.clone();
        url.pathname = pathname === '/' ? '/admin' : `/admin${pathname}`;
        return NextResponse.rewrite(url);
      }

      if (subdomain === 'author') {
        const url = request.nextUrl.clone();
        url.pathname = pathname === '/' ? '/writer' : `/writer${pathname}`;
        return NextResponse.rewrite(url);
      }
    }
  }

  // CRITICAL: Always return NextResponse.next() — never return a bare Response
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|icon.*|apple-icon.*|.*\\.png$|.*\\.svg$|.*\\.jpg$).*)',
  ],
};
