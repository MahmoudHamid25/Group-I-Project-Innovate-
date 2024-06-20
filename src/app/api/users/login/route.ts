import pool from '@/utils/db';
import { comparePasswords } from '@/app/api/hashing/comparePasswords';
import { NextResponse } from 'next/server';
import { User } from '@/types/types';
import { RowDataPacket } from 'mysql2';
import { generateToken } from '@/utils/session';
import {userSession} from "@/app/contexts/AuthContext";


export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();
        console.log("API Request Body:", { email, password }); // Debugging statement

        // Check if the user exists
        const [rows]: [RowDataPacket[], any] = await pool.query('SELECT * FROM `Users` WHERE `email` = ?', [email]);
        console.log("Database Query Result:", rows); // Debugging statement

        if (rows.length === 0) {
            return NextResponse.json({ error: 'No user found with this email' }, { status: 404 });
        }

        const userData = rows[0] as User;
        console.log("User Data from Database:", userData); // Debugging statement

        // Compare the provided password with the hashed password in the database
        const isPasswordMatch = await comparePasswords(password, userData.password);
        if (!isPasswordMatch) {
            return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
        }

        // Generate a session token
        const sessionToken = generateToken();

        // Set the session token in an HTTP-only cookie
        const response = NextResponse.json({ status: 200, message: 'User logged in successfully', nickName: userData.nickname });
        response.headers.set('Set-Cookie', `session-token=${sessionToken}; Path=/; HttpOnly; SameSite=Strict`);
        console.log("API Response NickName:", userData.nickname); // Debugging statement

        return response ;
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
