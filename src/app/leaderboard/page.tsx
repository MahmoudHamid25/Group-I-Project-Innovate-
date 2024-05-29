'use client'

import { useEffect, useState } from 'react'

export default function Profile() {
	const [data, setData] = useState([])

	useEffect(() => {
		async function fetchData() {
			const res = await fetch('/api/leaderboard')
			const data = await res.json()
			setData(data)
		}

		fetchData()
	}, [])

	return (
		<div>
			<h1>Leaderboard</h1>

			<table className='leaderboard_table'>
				<tr>
					<td>Positions</td>
					<td>Name</td>
					<td>Correct</td>
					<td>Wrong</td>
					<td>Average</td>
					<td>Score</td>
				</tr>
				{data &&
					data.map((row: any, i) => (
						<tr key={i}>
							<td>{i + 1}.</td>
							<td>{row.nickname}</td>
							<td></td>
							<td></td>
							<td></td>
							<td>{row.score}</td>
						</tr>
					))}
			</table>
		</div>
	)
}
