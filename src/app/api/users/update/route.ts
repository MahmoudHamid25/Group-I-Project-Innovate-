import pool from '@/utils/db'

export async function POST(request: Request) {
	try {
		await pool.execute('UPDATE Users SET password = ? WHERE email = ?', [
			request.body!.password,
			request.body!.email,
		])
		Response.json({ status: 200 })
	} catch (error: any) {
		Response.json({ error: error.message }, { status: 500 })
	}
}
