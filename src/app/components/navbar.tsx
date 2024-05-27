import Image from "next/image";
import DropdownMenu from "@/app/components/dropdownmenu";

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


export function NavBar() {
    return (
        <nav className={"navBar"}>
            <div className={"textLogo"}>
                <a href={"./"}><strong>Study</strong>Hub</a>
            </div>
            <nav className={"navMenu"}>
                <Login/>
                <SignUp/>
                <DropdownMenu/>
            </nav>
        </nav>
    );
}