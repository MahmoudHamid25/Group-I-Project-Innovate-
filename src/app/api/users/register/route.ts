import pool from '@/utils/db'
import hashPassword from "@/app/api/hashing/hashing";

export async function POST(request: Request) {
    try {
        const {nickName, email, password} = await request.json()
        const hashedPass = hashPassword(password)
        await pool.execute('INSERT INTO Users VALUES 1, email = ?, nickname = ?, password = ?, NULL', [
            email,
            nickName,
            hashedPass,
        ])
        return Response.json({status: 200})
    } catch (error: any) {
        return Response.json({error: error.message}, {status: 500})
    }
}
