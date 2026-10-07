import type React from "react"
import type { Metadata } from "next"
import { Sora, Plus_Jakarta_Sans } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Toaster } from "sonner"
import "./globals.css"


const _plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
})

const _sora = Sora({
  subsets: ["latin"],
  variable: "--font-display-sora",
  weight: ["400", "500", "600", "700", "800"],
})

// Metadata yang super SEO-friendly dan profesional
export const metadata: Metadata = {
  title: "Budi Cahyono | Full-Stack Developer & AI Engineer",
  description:
    "Portfolio of Budi Cahyono, a Full Stack Developer and AI Engineer. Specializing in building scalable, production-grade web applications with seamless Generative AI integration, RAG pipelines, and Agentic workflows.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${_plusJakarta.variable} ${_sora.variable} font-sans antialiased flex flex-col min-h-screen`}
      >
        <main className="flex-grow">
          {children}
        </main>
        
      
        
        <Toaster position="top-center" />
        <Analytics />
      </body>
    </html>
  )
}