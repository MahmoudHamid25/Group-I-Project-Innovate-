'use client';

import React, { createContext, useState, useContext, useEffect } from 'react';

interface AuthContextType {
    isLoggedIn: boolean;
    nickName: string;
    login: (nickName: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [nickName, setNickName] = useState<string>('');

    useEffect(() => {
        const cookie = document.cookie.split('; ').find(row => row.startsWith('session-token='));
        if (cookie) {
            const token = cookie.split('=')[1];
            // Normally, you would verify the token and fetch user data here
            // For simplicity, we'll just assume the token is valid and set a dummy user
            setNickName('JohnDoe'); // Replace this with actual user fetching
            setIsLoggedIn(true);
        }
    }, []);

    const login = (nickName: string) => {
        console.log("Context Login NickName:", nickName); // Debugging statement
        setNickName(nickName);
        setIsLoggedIn(true);
    };

    const logout = () => {
        setNickName('');
        setIsLoggedIn(false);
        document.cookie = 'session-token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, nickName, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
