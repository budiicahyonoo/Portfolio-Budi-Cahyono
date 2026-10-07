import Image from "next/image"
import Link from "next/link"
import { ExternalLink, Github, Lock } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Reveal } from "@/components/reveal"

interface Project {
  id: string
  title: string
  description: string
  category: string
  thumbnail_url: string | null
  demo_url: string | null
  view_url: string | null
  technologies: string[]
  role?: string
  metric?: string
}

interface ProjectsSectionProps {
  projects: Project[]
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  const categories = ["AI", "WEB", "APPS"]

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 relative bg-white text-slate-900">
      <div className="max-w-7xl mx-auto">
        <Reveal className="text-center mb-16">
          <div>
            <h2 className="font-display text-4xl sm:text-5xl font-bold mb-4 text-slate-900">
              Featured <span className="text-blue-600">Projects</span>
            </h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
              Showcasing innovative AI, software engineering, and web development solutions
            </p>
          </div>
        </Reveal>

        <Tabs defaultValue="AI" className="w-full">
          <div className="flex justify-center mb-12">
            <TabsList className="inline-flex h-auto items-center rounded-full p-1.5 bg-slate-100 border border-slate-200">
              {categories.map((category) => (
                <TabsTrigger 
                  key={category} 
                  value={category}
                  className="px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 data-[state=active]:!bg-blue-600 data-[state=active]:!text-white data-[state=active]:!shadow-md text-slate-600 hover:text-blue-600"
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {categories.map((category) => {
            const categoryProjects = projects.filter(
              (p) => p.category.toUpperCase() === category.toUpperCase()
            )
            
            return (
              <TabsContent key={category} value={category}>
                {categoryProjects.length === 0 ? (
                  <div className="text-center py-12 text-slate-400 text-sm">
                    No projects found in this category.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categoryProjects.map((project, i) => (
                      <div
                        key={project.id}
                        className="stagger-item"
                        style={{ animationDelay: `${i * 90}ms`, height: '100%' }}
                      >
                        <article className="lift-hover group h-full flex flex-col rounded-2xl overflow-hidden bg-white text-slate-900 border border-slate-200/80 shadow-sm hover:border-blue-300">
                          <div className="relative h-48 overflow-hidden bg-slate-100">
                            <Image
                              src={project.thumbnail_url || "/budiicahyonoo.png"}
                              alt={project.title}
                              fill
                              className="object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent"></div>
                            
                            {project.role && (
                              <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-semibold px-2.5 py-1 rounded-full border border-white/20">
                                {project.role}
                              </div>
                            )}

                            {project.metric && (
                              <div className="absolute bottom-3 left-3 right-3 bg-blue-600/90 backdrop-blur-md text-white text-xs font-medium px-3 py-1 rounded-lg border border-blue-400/30 truncate">
                                📊 {project.metric}
                              </div>
                            )}
                          </div>

                          <div className="p-6 flex flex-col flex-1 gap-4">
                            <div>
                              <h3 className="font-display font-bold text-lg text-slate-900">
                                {project.title}
                              </h3>
                              <p className="text-sm text-slate-600 line-clamp-2 mt-1 leading-relaxed">
                                {project.description}
                              </p>
                            </div>

                            <div className="flex flex-wrap gap-1.5">
                              {project.technologies.slice(0, 4).map((tech) => (
                                <span 
                                  key={tech} 
                                  className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>

                            <div className="flex gap-2 mt-auto pt-2">
                              {project.demo_url ? (
                                <Link
                                  href={project.demo_url}
                                  target="_blank"
                                  className="flex-1 inline-flex items-center justify-center gap-1.5 text-xs font-semibold rounded-xl px-3 py-2.5 bg-blue-600 text-white hover:bg-blue-700 shadow-md transition-all"
                                >
                                  <ExternalLink className="h-3.5 w-3.5" />
                                  Demo
                                </Link>
                              ) : null}

                              {project.view_url ? (
                                <Link
                                  href={project.view_url}
                                  target="_blank"
                                  className="flex-1 inline-flex items-center justify-center gap-1.5 text-xs font-semibold rounded-xl px-3 py-2.5 bg-slate-100 text-slate-700 hover:bg-slate-200 transition-all border border-slate-200"
                                >
                                  <Github className="h-3.5 w-3.5" />
                                  Code
                                </Link>
                              ) : (
                                <div 
                                  title="Private repository (Client / NDA Project)"
                                  className="flex-1 inline-flex items-center justify-center gap-1.5 text-xs font-semibold rounded-xl px-3 py-2.5 bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed"
                                >
                                  <Lock className="h-3.5 w-3.5 text-slate-400" />
                                  Private Repo
                                </div>
                              )}
                            </div>
                          </div>
                        </article>
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>
            )
          })}
        </Tabs>
      </div>
    </section>
  )
}