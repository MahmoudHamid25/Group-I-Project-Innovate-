import type { Metadata } from "next";
import "./globals.css";
import { NavBar } from "@/app/components/navbar";
import { Footer } from "@/app/components/footer";
import { AuthProvider } from "@/app/contexts/AuthContext";

export const metadata: Metadata = {
    title: "StudyHub",
    description: "",
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
        <body>
        <AuthProvider>
            <NavBar />
            <main>
                <div className={"layoutContainer"}>{children}</div>
            </main>
            <Footer />
        </AuthProvider>
        </body>
        </html>
    );
}
