"use client"

import Link from "next/link"
import { Menu, X } from "lucide-react"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("HOME")
  const [scrolled, setScrolled] = useState(false)

  const navItems = [
    { name: "HOME", href: "#home" },
    { name: "PROJECTS", href: "#projects" },
    { name: "EXPERIENCE", href: "#experience" },
    { name: "BLOG", href: "#blog" },
  ]

  // Efek untuk memantau scroll (agar menu aktif otomatis saat di-scroll)
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24)

      const sections = navItems.map(item => item.name.toLowerCase())
      const scrollPosition = window.scrollY + 120

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element && 
            element.offsetTop <= scrollPosition && 
            element.offsetTop + element.offsetHeight > scrollPosition) {
          setActiveSection(section.toUpperCase())
        }
      }
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={cn(
        "fixed top-0 w-full z-50 border-b transition-all duration-500",
        scrolled
          ? "nav-nav border-white/60 py-0"
          : "border-transparent bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-18">

          {/* TENGAH - Pill Menu Glassmorphism (Desktop) */}
          <div className="hidden md:flex flex-1 justify-center">
            <div className="glass-pill flex items-center rounded-full p-1.5">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setActiveSection(item.name)}
                  className={cn(
                    "px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300",
                    activeSection === item.name
                      ? "text-white shadow-md bg-blue-600"
                      : "text-slate-600 hover:text-blue-700 hover:bg-white/60"
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Tombol toggle mobile (kanan) */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            className="md:hidden ml-auto glass-pill w-11 h-11 rounded-full grid place-items-center text-blue-700 active:scale-95 transition-transform"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

        </div>

        {/* Mobile Navigation Dropdown */}
        {isOpen && (
          <div className="md:hidden pb-6 pt-2 animate-blob-in">
            <div className="glass flex flex-col gap-2 rounded-2xl p-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "text-sm font-bold px-4 py-3 rounded-xl transition-all",
                    activeSection === item.name
                      ? "bg-blue-600 text-white shadow-md"
                      : "text-slate-600 hover:bg-white/60 hover:text-blue-700"
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
                href="https://calendly.com/budicahyono-dev/new-meeting"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-3 rounded-xl text-sm font-bold mt-2 shadow-md"
                onClick={() => setIsOpen(false)}
              >

              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
