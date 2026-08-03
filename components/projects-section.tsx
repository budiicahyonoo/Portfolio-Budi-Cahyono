import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Project {
  id: string
  title: string
  description: string
  category: string
  thumbnail_url: string | null
  demo_url: string | null
  view_url: string | null
  technologies: string[]
}

interface ProjectsSectionProps {
  projects: Project[]
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  const categories = ["AI", "WEB", "APPS"]

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Featured <span className="text-blue-600">Projects</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Showcasing innovative AI and software engineering solutions
          </p>
        </div>

        <Tabs defaultValue="AI" className="w-full">
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
            const categoryProjects = projects.filter((p) => p.category.toUpperCase() === category.toUpperCase())
            
            return (
              <TabsContent key={category} value={category}>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categoryProjects.map((project) => (
                    <Card key={project.id} className="group overflow-hidden hover:border-blue-600 transition-colors">
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={project.thumbnail_url || "/portfoliostackplus.png"}
                          alt={project.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent"></div>
                      </div>
                      <CardHeader>
                        <CardTitle className="text-xl">{project.title}</CardTitle>
                        <CardDescription className="line-clamp-2">{project.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.slice(0, 3).map((tech) => (
                            <span key={tech} className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-600 font-medium">
                              {tech}
                            </span>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          {project.demo_url && (
                            <Button asChild size="sm" variant="outline" className="flex-1 bg-transparent hover:bg-blue-50 border-slate-200">
                              <Link href={project.demo_url} target="_blank">
                                <ExternalLink className="mr-1 h-3 w-3" />
                                Demo
                              </Link>
                            </Button>
                          )}
                          {project.view_url && (
                            <Button asChild size="sm" variant="outline" className="flex-1 bg-transparent hover:bg-blue-50 border-slate-200">
                              <Link href={project.view_url} target="_blank">
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