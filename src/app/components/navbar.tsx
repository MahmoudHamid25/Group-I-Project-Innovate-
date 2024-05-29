import AppContainer from '@/app/components/appcontainer';

export function Login() {
    return (
        <div>
            <a href={"/login/"}>Log in</a>
        </div>
    );
}

export function SignUp() {
    return (
        <div>
            <a href={"/registration/"}>Sign Up</a>
        </div>
    );
}


export function NavBar() {
    return (
        <nav className={"navBar"}>
            <div className={"textLogo"}>
                <a href={"./"}><strong>Study</strong>Hub</a>
            </div>
            <div className={"navMenu"}>
                <Login/>
                <SignUp/>
                <AppContainer/>
            </div>
        </nav>

    );
}