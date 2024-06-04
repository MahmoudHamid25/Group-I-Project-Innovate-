'use client'

export default function Main() {
    async function submitHandler(event: any) {
        event.preventDefault()
        const nickName = event.target.nickName.value
        const email = event.target.email.value
        const password = event.target.password.value
        const confirmPassword = event.target.confirmPassword.value

        if (password !== confirmPassword) {
            console.log('Passwords do not match')
            return
        }

        if (nickName.length < 3) {
            console.log('Username must be at least 3 characters long')
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

        const res = await fetch('/api/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nickName,
                email,
                password,
            }),
        })

        if (res.status !== 200) {
            console.log('Error registering')
        }
    }

    return (
        <div className={"registrationForm"}>
            <div className={"containerFormRegister"}>
                <h1>Register</h1>
                <div className="coloredLine"></div>
                <form onSubmit={submitHandler}>
                    <p/><label htmlFor={"nickName"}>Nickname</label>
                    <p/><input type={"text"} name={"nickName"}/>
                    <p/><label htmlFor={"email"}>E-mail address</label>
                    <p/><input type={"email"} name={"email"}/>
                    <p/><label htmlFor={"password"}>Password</label>
                    <p/><input type={"password"} name={"password"}/>
                    <p/><label htmlFor={"confirmPassword"}>Confirm password</label>
                    <p/><input type={"password"} name={"confirmPassword"}/>
                    <div className={"centeringElementsLoginForm"}>
                        <button className={"indexButtonLogin"}>Register</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

