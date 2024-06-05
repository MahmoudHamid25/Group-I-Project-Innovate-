import pool from './db';
import { NextApiRequest } from 'next';
import { User } from '@/types/types';
import { RowDataPacket } from 'mysql2';

function parseCookies(req: NextApiRequest) {
    const list: { [key: string]: string } = {};
    const cookieHeader = req.headers.cookie;
    if (!cookieHeader) return list;

    cookieHeader.split(';').forEach(cookie => {
        const parts = cookie.split('=');
        list[parts.shift()?.trim() as string] = decodeURI(parts.join('='));
    });

    return list;
}

export async function getServerSession(req: NextApiRequest): Promise<{ nickname: string } | null> {
    try {
        const cookies = parseCookies(req);
        const sessionId = cookies['session-token'];

        if (!sessionId) {
            return null;
        }

        const [rows] = await pool.query<(User & RowDataPacket)[]>('SELECT * FROM `Users` WHERE `session_id` = ?', [sessionId]);

        if (rows.length === 0) {
            return null;
        }

        const userData = rows[0];
        return { nickname: userData.nickName };
    } catch (error) {
        console.error('Error fetching session:', error instanceof Error ? error.message : 'Unknown error');
        return null;
    }
}
