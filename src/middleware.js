import { NextResponse } from 'next/server';

export function middleware(request) {
    // Check if the requested path starts with /admin
    if (request.nextUrl.pathname.startsWith('/admin')) {
        // Allow access to the login page
        if (request.nextUrl.pathname === '/admin/login') {
            return NextResponse.next();
        }

        // Check for the admin session cookie
        const adminSession = request.cookies.get('admin_session');

        // If no cookie, redirect to login
        if (!adminSession) {
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: '/admin/:path*',
};
