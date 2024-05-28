'use client'

import { useEffect, useState } from 'react'

export default function Profile() {
	function submitHandler(event: any) {
		event.preventDefault()

		const email = event.target.email.value
		const password = event.target.password.value
		const confirm_password = event.target.confirm_password.value

		if (password !== confirm_password) {
			alert('Passwords do not match')
		}
	}

	const [data, setData] = useState<string[]>([])

	useEffect(() => {
		async function fetchData() {
			const res = await fetch('/api/users')
			const result = await res.json()
			setData(result)
		}
		fetchData()
	}, [])

	// data.sort((a, b) => a.score - b.score)

	return (
		<div className='wrapper'>
			<h1>Profile</h1>
			<hr />
			<form onSubmit={submitHandler}>
				<p className='input_wrapper'>
					<label htmlFor={'email'}>E-mail Address</label>
					<input type={'email'} name={'email'} />
				</p>
				<p className='input_wrapper'>
					<label htmlFor={'password'}>Password</label>
					<input type={'password'} name={'password'} />
				</p>
				<p className='input_wrapper'>
					<label htmlFor={'confirm_password'}>Confirm Password</label>
					<input type={'password'} name={'confirm_password'} />
				</p>
				<button className={'button'}>Confirm Changes</button>
			</form>

			{/* <table>{data && data.map(row => <div>{row.id}</div>)}</table> */}
		</div>
	)
}
