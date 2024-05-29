import mysql from 'mysql2/promise'

const pool = mysql.createPool({
	host: 'localhost',
	user: 'your-username',
	password: 'your-password',
	database: 'your-database',
	waitForConnections: true,
	connectionLimit: 10,
	queueLimit: 0,
})

export default pool
