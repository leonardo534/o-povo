import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/organisms/Header";
import { ToastContainer, toast } from 'react-toastify';

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Blog",
    description: "Teste técnico",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased @container`}
            >
                <div className="px-4 @7xl:mx-20 @3xl:mx-10 mx-2">
                    {children}
                </div>
                <ToastContainer />

            </body>
        </html>
    );
}
