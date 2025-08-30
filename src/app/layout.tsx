import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Google Scraper",
    description: "Get Google search results as JSON",
};

/**
 * The root layout of the app, which sets up the HTML structure and font styles.
 *
 * This component is used as the `root` layout in the `app/page.tsx` file.
 *
 * @param children - The children of the layout, which will be rendered inside
 *   the HTML structure.
 */
export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                {children}
            </body>
        </html>
    );
}
