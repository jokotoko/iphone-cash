import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request) {
    const { password } = await request.json();

    if (password === process.env.ADMIN_PASSWORD) {
        // Set a cookie (httpOnly for security)
        (await cookies()).set('admin_session', 'true', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 * 24, // 1 day
            path: '/',
        });

        return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
}
