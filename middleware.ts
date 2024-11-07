// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const username = request.cookies.get('username');
    const isLoginPage = request.nextUrl.pathname === '/login';

    // If trying to access login page while already logged in, redirect to home
    if (isLoginPage && username) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    // If not logged in and trying to access any other page, redirect to login
    if (!username && !isLoginPage) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for:
         * 1. /api routes
         * 2. /_next (Next.js internals)
         * 3. /fonts (inside /public)
         * 4. /examples (inside /public)
         * 5. all root files inside /public (e.g. /favicon.ico)
         */
        '/((?!api|_next|fonts|examples|[\\w-]+\\.\\w+).*)',
    ],
};