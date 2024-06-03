'use client';
import { useState, FormEvent } from 'react';
import Image from 'next/image';

interface Errors {
    email?: string;
    password?: string;
}

function LoginForm() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errors, setErrors] = useState<Errors>({});

    const validateEmail = (email: string): boolean => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const handleSubmit = (e: FormEvent): void => {
        e.preventDefault();
        let formErrors: Errors = {};

        if (!email) {
            formErrors.email = 'Email is required';
        } else if (!validateEmail(email)) {
            formErrors.email = 'Email is not valid';
        }

        if (!password) {
            formErrors.password = 'Password is required';
        }

        if (Object.keys(formErrors).length === 0) {
            // Form is valid, submit the form
            console.log('Form submitted');
        } else {
            // Form has errors
            setErrors(formErrors);
        }
    };

    return (
        <div className={"loginForm"}>
            <div className={"containerForm"}>
                <div className={"centeringElementsLoginForm"}>
                    <Image src="/icon.svg" alt="StudyHub Logo" width={80} height={80}/>
                </div>
                <h1>Sign in to StudyHub</h1>
                <form onSubmit={handleSubmit}>
                    <p/>
                    <label htmlFor="email">E-mail Address</label>
                    <p/>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.email && <p className="error">{errors.email}</p>}
                    <p/>
                    <label htmlFor="password">Password</label>
                    <p/>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {errors.password && <p className="error">{errors.password}</p>}
                    <p/>
                    <a className={"forgotpasswordText"} href={"/forgot-password"}>Forgot your password?</a>
                    <p/>
                    <div className={"centeringElementsLoginForm"}>
                        <button className={"indexButtonLogin"} type="submit">Sign in</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default function Page() {
    return (
        <LoginForm />
    );
}
