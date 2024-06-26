'use client';

import React from 'react';
import { useAuth } from '@/app/contexts/AuthContext';
import AppContainer from '@/app/components/appcontainer';

function Login() {
    return <a href="/main/">Log in</a>;
}

function SignUp() {
    return <a href="/registration/">Sign Up</a>;
}

function UserMenu({ nickName }: { nickName: string }) {
    const { logout } = useAuth();
    console.log("NavBar UserMenu NickName:", nickName); // Debugging statement
    return (
        <div className="navMenu">
            <span>StefanIsCool06</span>
            <a className={"logout"} onClick={logout}>Logout</a>
            <AppContainer />
        </div>

    );
}

export function NavBar() {
    const { isLoggedIn, nickName } = useAuth();
    console.log("NavBar NickName:", nickName); // Debugging statement
    const { logout } = useAuth();
if (isLoggedIn){
        return (
            <nav className="navBar">
                <div className="textLogo">
                    <a href="./main/"><strong>Study</strong>Hub</a>
                </div>
                <div className="navMenu">
                    {isLoggedIn ? (
                        <UserMenu nickName={nickName} />
                    ) : (
                        <>
                            <Login />
                            <SignUp />
                            <AppContainer />
                        </>
                    )}
                </div>
            </nav>
        );
    }
     else {

        return (
            <nav className="navBar">
                <div className="textLogo">
                    <a href="./main/"><strong>Study</strong>Hub</a>
                </div>
                <div className="navMenu">
                    <div className="navMenu">
                        <span>StefanIsCool06</span>
                        <a className={"logout"} onClick={logout}>Logout</a>
                        <AppContainer/>
                    </div>
                </div>
            </nav>
        );
}
}
