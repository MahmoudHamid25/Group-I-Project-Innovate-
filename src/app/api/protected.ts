import { NextResponse } from 'next/server';
import { verifyToken } from '@/utils/session';

export async function GET(request: Request) {
    try {
        const cookieHeader = request.headers.get('cookie');
        if (!cookieHeader) {
            return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
        }

        const cookies = Object.fromEntries(cookieHeader.split('; ').map(c => c.split('=')));
        const token = cookies['session-token'];

        if (!token || !verifyToken(token)) {
            return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
        }

        return NextResponse.json({ message: 'Protected data' });
    } catch (error: any) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        console.error('Error during token verification:', errorMessage, error);
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}
