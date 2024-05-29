import Image from 'next/image';

function LoginForm() {
    return (
        <div className={"loginForm"}>
            <div className={"containerForm"}>
                <div className={"centeringElementsLoginForm"}>
                <Image src="/icon.svg" alt="StudyHub Logo" width={80} height={80}/>
                </div>
                <h1>Sign in to StudyHub</h1>
                <form>
                    <p/><label htmlFor={"email"}>E-mail Address</label>
                    <p/><input type={"email"} name={"email"}/>
                    <p/><label htmlFor={"password"}>Password</label>
                    <p/><input type={"password"} name={"password"}/>
                    <p/><a className={"forgotpasswordText"} href={"/forgot-password"}>Forgot your password?</a>
                </form>
                <div className={"centeringElementsLoginForm"}>
                <button className={"indexButtonLogin"}><a href={""}>Sign in</a></button>
                </div>
            </div>
        </div>
    );
}

export default function Page() {
    return (
        <LoginForm />
    );
}

