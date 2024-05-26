import Image from "next/image";

export function Login() {
    return (
        <div>
            <a href={""}>Log in</a>
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

export function HamburgerMenu() {
    return (
        <a href={""}>
            <Image
                src="/img/menulines.svg"
                alt="Hamburger Menu"
                height={18}
                width={32}
            />
        </a>
    );
}

export function NavBar() {
    return (
        <nav className={"navBar"}>
            <div className={"textLogo"}>
                <a href={"./"}><strong>Study</strong>Hub</a>
            </div>
            <nav className={"navMenu"}>
                <Login/>
                <SignUp/>
                <HamburgerMenu/>
            </nav>
        </nav>
    );
}