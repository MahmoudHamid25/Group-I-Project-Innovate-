'use client';

import React, { useState } from 'react';
import { useAuth } from '@/app/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface Errors {
    email?: string;
    password?: string;
    form?: string;
}

function LoginForm() {
    const { login } = useAuth();
    const router = useRouter();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errors, setErrors] = useState<Errors>({});
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/users/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            console.log("Login API Response Data:", data); // Debugging statement

            if (!response.ok) {
                throw new Error(data.error || `Server responded with status ${response.status}`);
            }

            if (data.status === 200) {
                setSuccessMessage('Successfully signed in!');
                setErrorMessage('');
                console.log("Login Page NickName:", data.nickName); // Debugging statement
                login(data.nickName); // Update the context with the user's nickName
                router.push('/');
            } else {
                setErrorMessage(data.error || 'An error occurred');
                setSuccessMessage('');
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                setErrorMessage(error.message);
                setSuccessMessage('');
            } else {
                setErrorMessage('An unknown error occurred');
                setSuccessMessage('');
            }
        }
    };

    return (
        <div className="loginForm">
            <div className="containerForm">
                <div className="centeringElementsLoginForm">
                    <Image src="/icon.svg" alt="StudyHub Logo" width={80} height={80} />
                </div>
                <h1>Sign in to StudyHub</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="email">E-mail Address</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}

                    <div className="forgotPasswordWrapper">
                        <label htmlFor="password">Password</label>
                        <a className="forgotpasswordText" href="/forgot-password">Forgot your password?</a>
                    </div>

                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}

                    <div className="centeringElementsLoginForm">
                        <input className="indexButtonLogin" type="submit" value="Sign in" />
                    </div>
                    {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                    {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
                </form>
            </div>
        </div>
    );
}

export default function Page() {
    return <LoginForm />;
}
