import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Github, Linkedin, Mail, Twitter, AtSign } from "lucide-react";

interface HeroData {
  name: string
  role: string
  value_proposition: string
  photo_url: string | null
  email: string | null
}

interface HeroSectionProps {
  data: HeroData
}

export function HeroSection({ data }: HeroSectionProps) {
  return (
    // Tambahan overflow-hidden agar gambar besar tidak melebar ke luar layar
    <section id="home" className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content - Teks & CTA (Tetap sama seperti aslinya) */}
          <div className="space-y-8 order-2 lg:order-1 relative z-10 pb-12 lg:pb-0">
            <div className="space-y-4">
              <h2 className="text-xl sm:text-2xl text-muted-foreground font-medium">
                Hi, There!
              </h2>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="text-foreground">I&apos;m </span>
                <span className="text-blue-600">{data.name}</span>
              </h1>
              <div className="text-2xl sm:text-3xl md:text-4xl font-semibold text-muted-foreground flex flex-wrap items-center gap-x-2">
                <span>{data.role}</span>
                <span className="text-blue-600 animate-pulse">|</span>
              </div>
            </div>

            {/* 1. DESKRIPSI Opsional */}
            {data.value_proposition && (
              <p className="text-lg text-muted-foreground mb-8 max-w-lg">
                {data.value_proposition}
              </p>
            )}

            {/* 2. SOSIAL MEDIA */}
            <div className="flex flex-wrap gap-3 mb-8">
              <Link href="https://github.com/budiicahyonoo" target="_blank" className="bg-blue-600 p-2.5 rounded-xl text-white hover:bg-blue-700 transition-all shadow-sm hover:-translate-y-1">
                <Github size={20} />
              </Link>
              <Link href="https://linkedin.com/in/budicahyono" target="_blank" className="bg-blue-600 p-2.5 rounded-xl text-white hover:bg-blue-700 transition-all shadow-sm hover:-translate-y-1">
                <Linkedin size={20} />
              </Link>
              <Link href="mailto:budicahyono.dev@gmail.com" className="bg-blue-600 p-2.5 rounded-xl text-white hover:bg-blue-700 transition-all shadow-sm hover:-translate-y-1">
                <Mail size={20} />
              </Link>
              <Link href="https://x.com/budigubernur15" target="_blank" className="bg-blue-600 p-2.5 rounded-xl text-white hover:bg-blue-700 transition-all shadow-sm hover:-translate-y-1">
                <Twitter size={20} />
              </Link>
              <Link href="https://www.threads.com/@budii.cahyonoo" target="_blank" className="bg-blue-600 p-2.5 rounded-xl text-white hover:bg-blue-700 transition-all shadow-sm hover:-translate-y-1">
                <AtSign size={20} />
              </Link>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button asChild size="lg" className="bg-blue-600 text-white hover:bg-blue-700 font-medium px-8 rounded-md">
                <Link href="#experience">
                  Hire me
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 font-medium px-8 rounded-md">
                <Link href="/cv.pdf" target="_blank">
                  Download CV
                </Link>
              </Button>
            </div>
          </div>

          {/* Right Content - Image (Super Besar & Menempel ke Bawah) */}
          <div className="relative order-1 lg:order-2 flex justify-center lg:justify-end items-end h-[450px] sm:h-[550px] lg:h-[750px] w-full">
            {/* Menggunakan scale dan origin-bottom agar foto membesar secara proporsional ke atas */}
            <div className="relative w-full h-full lg:scale-[1.15] xl:scale-[1.40] transform origin-bottom">
              <Image
                src={data.photo_url || "/portfoliostackplus.png"} // Sekalian memperbaiki error 404 placeholder sebelumnya
                alt={data.name}
                fill
                className="object-contain object-bottom drop-shadow-2xl"
                priority
                unoptimized
              />
            </div>
          </div>
          
        </div>
      </div>
    </section>
  )
}