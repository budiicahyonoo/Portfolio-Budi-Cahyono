import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Toaster } from "sonner"
import "./globals.css"

import { Footer } from "@/components/footer" 

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

// Metadata yang super SEO-friendly dan profesional
// HAPUS bagian 'icons' karena Next.js akan otomatis membaca file 'icon.png' di folder 'app'
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
    <html lang="en" className="dark">
      <body className={`font-sans antialiased flex flex-col min-h-screen`}>
        <main className="flex-grow">
          {children}
        </main>
        
        <Footer />
        
        <Toaster position="top-center" />
        <Analytics />
      </body>
    </html>
  )
}