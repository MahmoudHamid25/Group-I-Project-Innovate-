import pool from '@/utils/db'
import hashPassword from "@/app/api/hashing/hashing";

export async function POST(request: Request) {
    try {
        const {nickName, email, password} = await request.json()
        const hashedPass = await hashPassword(password)
        const sql:string = 'INSERT INTO `Users` VALUES (?, ?, ?, ?, ?)';
        const values = [1, email, nickName, hashedPass, null,]
        await pool.execute(sql, values);
        return Response.json({status: 200})
    } catch (error: any) {
        console.log(error);
        return Response.json({error: error.message}, {status: 500})
    }
}
