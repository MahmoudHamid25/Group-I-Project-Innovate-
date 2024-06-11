import mysql from 'mysql2/promise'

const pool = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: '1111',
	database: 'StudyHub',
	port: 3306,
	waitForConnections: true,
	connectionLimit: 10,
	queueLimit: 0,
})

pool.getConnection()
	.then(connection => {
		console.log('Database connection successful');
		connection.release();
	})
	.catch(err => {
		console.error('Database connection failed:', err);
	});


export default pool
