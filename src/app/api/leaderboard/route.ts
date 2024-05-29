import pool from '@/utils/db'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
	try {
		const [rows, fields] = await pool.query(`
			SELECT u.nickname, l.score 
			FROM Leaderboard l
			INNER JOIN Users u ON l.user_id = u.id
			ORDER BY l.score DESC
		`)
		return Response.json(rows, { status: 200 })
	} catch (error: any) {
		return Response.json({ error: error.message }, { status: 500 })
	}
}
