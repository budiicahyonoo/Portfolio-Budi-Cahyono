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
  thumbnail_url: string | null
  demo_url: string | null
  view_url: string | null
  technologies: string[]
  date_start: Date | string | null
  date_end: Date | string | null
}

interface ExperienceSectionProps {
  experiences: Experience[]
}

export function ExperienceSection({ experiences }: ExperienceSectionProps) {
  const categories = ["Work", "Intern", "Freelance"]

  const formatDate = (date: Date | string | null) => {
    if (!date) return "Present"
    return new Date(date).toLocaleDateString("en-US", { month: "short", year: "numeric" })
  }

  const sortedExperiences = [...experiences].sort((a, b) => {
    if (!a.date_start) return -1; 
    if (!b.date_start) return 1;
    return new Date(b.date_start).getTime() - new Date(a.date_start).getTime();
  });

  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Professional <span className="text-blue-600">Experience</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Building impactful solutions across different domains
          </p>
        </div>

        <Tabs defaultValue="Work" className="w-full">
          {/* PERUBAHAN DESAIN PILL DI SINI */}
          <div className="flex justify-center mb-12">
            <TabsList className="inline-flex h-auto items-center bg-muted/40 border border-border/50 rounded-full p-1.5 shadow-sm backdrop-blur-md">
              {categories.map((category) => (
                <TabsTrigger 
                  key={category} 
                  value={category}
                  className="px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 data-[state=active]:!bg-blue-600 data-[state=active]:!text-white data-[state=active]:!shadow-md text-muted-foreground hover:text-foreground"
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {categories.map((category) => {
            const categoryExperiences = sortedExperiences.filter((e) => 
              e.category.toUpperCase() === category.toUpperCase()
            )
            return (
              <TabsContent key={category} value={category}>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categoryExperiences.map((exp) => (
                    <Card key={exp.id} className="group overflow-hidden hover:border-blue-600 transition-colors border-slate-200">
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={exp.thumbnail_url || "/portfoliostackplus.png"}
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
                            <span key={tech} className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-600 font-medium">
                              {tech}
                            </span>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          {exp.demo_url && (
                            <Button asChild size="sm" variant="outline" className="flex-1 bg-transparent hover:bg-blue-50 border-slate-200">
                              <Link href={exp.demo_url} target="_blank">
                                <ExternalLink className="mr-1 h-3 w-3" />
                                Demo
                              </Link>
                            </Button>
                          )}
                          {exp.view_url && (
                            <Button asChild size="sm" variant="outline" className="flex-1 bg-transparent hover:bg-blue-50 border-slate-200">
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