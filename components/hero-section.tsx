import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Mail } from "lucide-react"
import Link from "next/link"

interface HeroData {
  name: string
  role: string
  value_proposition: string
  photo_url: string
  email: string
}

interface HeroSectionProps {
  data: HeroData
}

export function HeroSection({ data }: HeroSectionProps) {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="text-foreground">Hello, I&apos;m</span>
                <br />
                <span className="gold-shimmer">{data.name}</span>
              </h1>
              <div className="flex items-center gap-2">
                <div className="h-1 w-12 bg-primary"></div>
                <p className="text-xl sm:text-2xl text-primary font-semibold">{data.role}</p>
              </div>
            </div>

            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl leading-relaxed">
              {data.value_proposition}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="group">
                <Link href="#projects">
                  View Projects
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href={`mailto:${data.email}`}>
                  <Mail className="mr-2 h-4 w-4" />
                  Contact Me
                </Link>
              </Button>
            </div>
          </div>

          {/* Right Content - Image */}
          <div className="relative">
            <div className="relative w-full aspect-square max-w-md mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-3xl"></div>
              <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-primary shadow-2xl">
                <Image
                  src={data.photo_url || "/placeholder.svg"}
                  alt={data.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
