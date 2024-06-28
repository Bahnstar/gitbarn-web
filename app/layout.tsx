import { GeistSans } from "geist/font/sans"
import { Toaster } from "sonner"

import "./globals.css"
import Footer from "@/components/Footer"

const defaultUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000"

export const metadata = {
    metadataBase: new URL(defaultUrl),
    title: "GitBarn",
    description: "Providing for all your GitBarn needs!",
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en" className={GeistSans.className}>
            <body>
                <main className="min-w-screen flex min-h-screen flex-col bg-gray-100">
                    <Toaster />
                    {children}
                    <Footer />
                </main>
            </body>
        </html>
    )
}
