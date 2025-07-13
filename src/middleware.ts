import { NextRequest, NextResponse } from 'next/server';

import { HEADERS_REQUEST_DOMAIN_KEY, HEADERS_REQUEST_LANGUAGE_KEY, HEADERS_REQUEST_PATHNAME_KEY, HEADERS_REQUEST_SEARCH_KEY, HEADERS_REQUEST_URL_KEY } from '@/configs/headers';
import { getLangugageFromPathnameWithFallback, isValidRoute } from '@/packages/libs/I18n/utils';

/**
 * Middleware to handle internationalization routing and request headers
 * - Validates language parameters in URLs
 * - Handles language detection and routing
 * - Sets custom request headers for domain, URL, pathname, and search params
 */
export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Skip middleware for static files, API Routes and Next.js internals
  if (
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/favicon.ico') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Check if the route is valid, if not redirect to not-found
  if (!isValidRoute(pathname)) {
    return NextResponse.rewrite(new URL('/not-found', request.url));
  }

  // Set up request headers
  const requestHeaders = new Headers(request.headers);
  const domain = requestHeaders.get('host') || '';
  const [, pathnameWithSearchParams = ''] = request.url.match(new RegExp(`https?://${domain}(.*)`)) || [];
  const [pathnamePart, searchParams] = pathnameWithSearchParams.split('?');

  const lang = getLangugageFromPathnameWithFallback(pathname);

  requestHeaders.set(HEADERS_REQUEST_DOMAIN_KEY, domain);
  requestHeaders.set(HEADERS_REQUEST_URL_KEY, request.url);
  requestHeaders.set(HEADERS_REQUEST_LANGUAGE_KEY, lang);

  if (pathnamePart) {
    requestHeaders.set(HEADERS_REQUEST_PATHNAME_KEY, pathnamePart);
  }
  if (searchParams) {
    requestHeaders.set(HEADERS_REQUEST_SEARCH_KEY, searchParams);
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders
    }
  });
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)'
  ]
};
