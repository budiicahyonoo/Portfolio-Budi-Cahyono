import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, Calendar } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Experience {
  id: string
  title: string
  description: string
  category: string
  thumbnail_url: string
  demo_url: string | null
  view_url: string | null
  technologies: string[]
  date_start: string | null
  date_end: string | null
}

interface ExperienceSectionProps {
  experiences: Experience[]
}

export function ExperienceSection({ experiences }: ExperienceSectionProps) {
  const categories = ["Personal Project", "Freelance", "Collaboration"]

  const formatDate = (date: string | null) => {
    if (!date) return "Present"
    return new Date(date).toLocaleDateString("en-US", { month: "short", year: "numeric" })
  }

  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Professional <span className="text-primary">Experience</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Building impactful solutions across different domains
          </p>
        </div>

        <Tabs defaultValue="Personal Project" className="w-full">
          <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-3 mb-12">
            {categories.map((category) => (
              <TabsTrigger key={category} value={category} className="text-xs sm:text-sm">
                {category}
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((category) => {
            const categoryExperiences = experiences.filter((e) => e.category === category)
            return (
              <TabsContent key={category} value={category}>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categoryExperiences.map((exp) => (
                    <Card key={exp.id} className="group overflow-hidden hover:border-primary transition-colors">
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={exp.thumbnail_url || "/placeholder.svg"}
                          alt={exp.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent"></div>
                      </div>
                      <CardHeader>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                          <Calendar className="h-3 w-3" />
                          <span>
                            {formatDate(exp.date_start)} - {formatDate(exp.date_end)}
                          </span>
                        </div>
                        <CardTitle className="text-xl">{exp.title}</CardTitle>
                        <CardDescription className="line-clamp-2">{exp.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex flex-wrap gap-2">
                          {exp.technologies.slice(0, 3).map((tech) => (
                            <span key={tech} className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                              {tech}
                            </span>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          {exp.demo_url && (
                            <Button asChild size="sm" variant="outline" className="flex-1 bg-transparent">
                              <Link href={exp.demo_url} target="_blank">
                                <ExternalLink className="mr-1 h-3 w-3" />
                                Demo
                              </Link>
                            </Button>
                          )}
                          {exp.view_url && (
                            <Button asChild size="sm" variant="outline" className="flex-1 bg-transparent">
                              <Link href={exp.view_url} target="_blank">
                                <Github className="mr-1 h-3 w-3" />
                                Code
                              </Link>
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            )
          })}
        </Tabs>
      </div>
    </section>
  )
}
