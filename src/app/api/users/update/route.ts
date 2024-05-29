import pool from '@/utils/db'

export async function POST(request: Request) {
	try {
		const { email, password } = await request.json()
		await pool.execute('UPDATE Users SET password = ? WHERE email = ?', [
			password,
			email,
		])
		return Response.json({ status: 200 })
	} catch (error: any) {
		return Response.json({ error: error.message }, { status: 500 })
	}
}
