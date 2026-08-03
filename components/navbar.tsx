"use client"

import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("HOME")

  const navItems = [
    { name: "HOME", href: "#home" },
    { name: "PROJECTS", href: "#projects" },
    { name: "EXPERIENCE", href: "#experience" },
    { name: "BLOG", href: "#blog" },
  ]

  // Efek untuk memantau scroll (opsional, agar menu aktif otomatis saat di-scroll)
  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => item.name.toLowerCase())
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element && 
            element.offsetTop <= scrollPosition && 
            element.offsetTop + element.offsetHeight > scrollPosition) {
          setActiveSection(section.toUpperCase())
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* KIRI - Logo */}
          <div className="flex-1 flex justify-start">
            <Link href="/" className="flex items-center">
              <Image 
                src="/logo.png" 
                alt="Logo StackPlus" 
                width={120} 
                height={35} 
                className="h-7 w-auto object-contain" 
              />
            </Link>
          </div>

          {/* TENGAH - Pill Menu (Desktop) */}
          <div className="hidden md:flex flex-1 justify-center">
            <div className="flex items-center bg-muted/40 border border-border/50 rounded-full p-1.5 shadow-sm backdrop-blur-md">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setActiveSection(item.name)}
                  className={cn(
                    "px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300",
                    activeSection === item.name
                      ? "bg-blue-600 text-white shadow-md" 
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* KANAN - Book Session Button & Mobile Toggle */}
          <div className="flex-1 flex justify-end items-center gap-4">
            <Link 
              href="#contact" 
              className="hidden md:flex items-center gap-2 bg-[#2b2b2b] hover:bg-[#3f3f3f] text-white px-6 py-2.5 rounded-full text-sm font-bold transition-all shadow-sm border border-white/10"
            >
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
              BOOK A SESSION
            </Link>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 text-foreground" 
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {isOpen && (
          <div className="md:hidden pb-6 pt-2 animate-in slide-in-from-top-2">
            <div className="flex flex-col gap-2 bg-muted/50 rounded-2xl p-4 border border-border/50">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "text-sm font-bold px-4 py-3 rounded-xl transition-colors",
                    activeSection === item.name
                      ? "bg-blue-600 text-white"
                      : "text-muted-foreground hover:bg-background/50 hover:text-foreground"
                  )}
                  onClick={() => {
                    setActiveSection(item.name)
                    setIsOpen(false)
                  }}
                >
                  {item.name}
                </Link>
              ))}
              <Link 
                href="#contact" 
                className="flex items-center justify-center gap-2 bg-[#2b2b2b] text-white px-4 py-3 rounded-xl text-sm font-bold mt-2"
                onClick={() => setIsOpen(false)}
              >
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                BOOK A SESSION
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}