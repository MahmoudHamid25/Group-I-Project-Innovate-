'use client'

import { useState } from 'react';

export default function Main() {
    const [errorMessage, setErrorMessage] = useState('');
    const [succesMessage, setSuccesMessage] = useState('');

    async function submitHandler(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const form = event.currentTarget;
        const nickName = form.nickName.value;
        const email = form.email.value;
        const password = form.password.value;
        const confirmPassword = form.confirmPassword.value;

        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match');
            return;
        }

        if (nickName.length < 3) {
            setErrorMessage('Username must be at least 3 characters long');
            return;
        }

        if (password.length < 8) {
            setErrorMessage('Password must be at least 8 characters long');
            return;
        }

        if (!email.includes('@') || !email.includes('.')) {
            setErrorMessage('Invalid email address');
            return;
        }

        try {
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
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Error registering');
            }

            setSuccesMessage('Successfully registered!');
        } catch (error: unknown) {
            if (error instanceof Error) {
                setErrorMessage(error.message);
            } else {
                setErrorMessage('An unknown error occurred');
            }
        }
    }

    return (
        <div className="registrationForm">
            <div className="containerFormRegister">
                <h1>Register</h1>
                <div className="coloredLine"></div>
                <form onSubmit={submitHandler}>
                    <label htmlFor="nickName">Nickname</label>
                    <input type="text" name="nickName" required />

                    <label htmlFor="email">E-mail address</label>
                    <input type="email" name="email" required />

                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" required />

                    <label htmlFor="confirmPassword">Confirm password</label>
                    <input type="password" name="confirmPassword" required />
                    {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                    {succesMessage && <p style={{ color: 'green' }}>{succesMessage}</p>}
                    <div className="centeringElementsLoginForm">
                        <input type="submit" className="indexButtonLogin" value="Register" />
                    </div>
                </form>
            </div>
        </div>
    );
}
