import mysql from 'mysql2/promise'

const pool = mysql.createPool({
	host: 'localhost',
	user: 'Stefan',
	password: '1234',
	database: 'StudyHub',
	waitForConnections: true,
	connectionLimit: 10,
	queueLimit: 0,
})

export default pool
