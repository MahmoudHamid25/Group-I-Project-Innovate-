import type { Metadata } from "next";
import "./globals.css";
import {NavBar} from "@/app/components/navbar";
import {Footer} from "@/app/components/footer";

export const metadata: Metadata = {
  title: "StudyHub",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
          <main>
            <NavBar/>
            <div>{children}</div>
            <Footer/>
          </main>
      </body>
    </html>
  );
}
