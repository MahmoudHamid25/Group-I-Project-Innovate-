'use client'

export default function Profile() {
	async function submitHandler(event: any) {
		event.preventDefault()

		const email = event.target.email.value
		const password = event.target.password.value
		const confirm_password = event.target.confirm_password.value

		if (password !== confirm_password) {
			console.log('Passwords do not match')
			return
		}

		if (password.length < 8) {
			console.log('Password must be at least 8 characters long')
			return
		}

		if (!email.includes('@') || !email.includes('.')) {
			console.log('Invalid email address')
			return
		}

		const res = await fetch('/api/users/update', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email,
				password,
			}),
		})

		if (res.status !== 200) {
			console.log('Error updating password')
		}
	}

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
					<label htmlFor={'password'}>New Password</label>
					<input type={'password'} name={'password'} />
				</p>
				<p className='input_wrapper'>
					<label htmlFor={'confirm_password'}>Confirm New Password</label>
					<input type={'password'} name={'confirm_password'} />
				</p>
				<button className={'button'}>Confirm Changes</button>
			</form>

			{/* <table>{data && data.map(row => <div>{row.id}</div>)}</table> */}
		</div>
	)
}
