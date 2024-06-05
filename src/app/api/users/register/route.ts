import pool from '@/utils/db';
import hashPassword from "@/app/api/hashing/hashing";
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const { nickName, email, password } = await request.json();

        // Check for existing user
        const [existingUser] = await pool.query('SELECT * FROM `Users` WHERE `email` = ? OR `nickName` = ?', [email, nickName]);

        if ((existingUser as any).length > 0) {
            return NextResponse.json({ error: 'User with this nickname or email already exists' }, { status: 400 });
        }

        // Hash the password
        const hashedPass = await hashPassword(password);

        // Insert new user
        const sql: string = 'INSERT INTO `Users` (`email`, `nickName`, `password`) VALUES (?, ?, ?)';
        const values = [email, nickName, hashedPass];
        await pool.execute(sql, values);

        return NextResponse.json({ status: 200, message: 'User registered successfully' });
    } catch (error: any) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
