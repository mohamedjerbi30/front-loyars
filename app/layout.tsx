import type React from "react"
import type { Metadata } from "next"
import { Inter, Outfit } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "../components/auth/auth-provider"
import { Toaster } from "../components/ui/toaster"
import { SidebarProvider } from '@/context/SidebarContext'
import { ThemeProvider } from '@/context/ThemeContext'

// You can choose either Inter or Outfit - I'll use Inter since it was your original choice
const inter = Inter({ subsets: ["latin"] })

// If you prefer Outfit instead, uncomment this and comment out inter above:
// const outfit = Outfit({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Auth App",
  description: "Full-stack authentication with Next.js and Express",
  generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} dark:bg-gray-900`}>
        <ThemeProvider>
          <SidebarProvider>
            <AuthProvider>
              {children}
              <Toaster />
            </AuthProvider>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}