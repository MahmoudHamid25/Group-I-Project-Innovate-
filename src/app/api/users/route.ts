import pool from '@/utils/db'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
	try {
		const [rows, fields] = await pool.query(
			'SELECT id, email, nickname FROM Users'
		)
		return Response.json(rows, { status: 200 })
	} catch (error: any) {
		return Response.json({ error: error.message }, { status: 500 })
	}
}
