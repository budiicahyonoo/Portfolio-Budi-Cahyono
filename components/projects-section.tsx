"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ExternalLink, Github, Lock, X, Layers, BarChart3, Tag } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Reveal } from "@/components/reveal"

interface Project {
  id: string
  title: string
  description: string
  category: string
  thumbnail_url?: string | null
  image_url?: string | null
  demo_url?: string | null
  project_url?: string | null
  view_url?: string | null
  github_url?: string | null
  technologies: string[] | string
  role?: string
  metric?: string
}

interface ProjectsSectionProps {
  projects: Project[]
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const categories = ["AI", "WEB", "APPS"]

  // Helper untuk normalisasi array teknologi (string / array)
  const getTechArray = (tech: string[] | string): string[] => {
    if (Array.isArray(tech)) return tech
    if (typeof tech === "string" && tech) {
      return tech.split(",").map((t) => t.trim()).filter(Boolean)
    }
    return []
  }

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
                    {categoryProjects.map((project, i) => {
                      const imageSrc = project.thumbnail_url || project.image_url || "/budiicahyonoo.png"
                      const demoLink = project.demo_url || project.project_url
                      const codeLink = project.view_url || project.github_url
                      const techList = getTechArray(project.technologies)

                      return (
                        <div
                          key={project.id}
                          className="stagger-item"
                          style={{ animationDelay: `${i * 90}ms`, height: "100%" }}
                        >
                          <article
                            onClick={() => setSelectedProject(project)}
                            className="lift-hover group h-full flex flex-col rounded-2xl overflow-hidden bg-white text-slate-900 border border-slate-200/80 shadow-sm hover:border-blue-400 hover:shadow-lg transition-all cursor-pointer"
                          >
                            {/* Image Container */}
                            <div className="relative h-48 overflow-hidden bg-slate-100">
                              <Image
                                src={imageSrc}
                                alt={project.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent"></div>

                              {project.role && (
                                <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-semibold px-2.5 py-1 rounded-full border border-white/20">
                                  {project.role}
                                </div>
                              )}
                            </div>

                            {/* Card Body */}
                            <div className="p-5 flex flex-col flex-1 gap-3">
                              <div>
                                <h3 className="font-display font-bold text-lg text-slate-900 group-hover:text-blue-600 transition-colors">
                                  {project.title}
                                </h3>
                                {/* Deskripsi dibatasi 2 baris */}
                                <p className="text-sm text-slate-600 line-clamp-2 mt-1 leading-relaxed">
                                  {project.description}
                                </p>
                              </div>

                              {/* Metric Badge */}
                              {project.metric && (
                                <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-100 px-3 py-1.5 rounded-lg truncate">
                                  <BarChart3 className="w-3.5 h-3.5 shrink-0 text-blue-600" />
                                  <span className="truncate">{project.metric}</span>
                                </div>
                              )}

                              {/* Tech Stack Pills */}
                              <div className="flex flex-wrap gap-1.5 mt-auto pt-1">
                                {techList.slice(0, 4).map((tech) => (
                                  <span
                                    key={tech}
                                    className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200"
                                  >
                                    {tech}
                                  </span>
                                ))}
                                {techList.length > 4 && (
                                  <span className="text-[11px] font-medium px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-400">
                                    +{techList.length - 4}
                                  </span>
                                )}
                              </div>

                              {/* Action Buttons */}
                              <div className="flex gap-2 pt-2 border-t border-slate-100" onClick={(e) => e.stopPropagation()}>
                                {demoLink ? (
                                  <Link
                                    href={demoLink}
                                    target="_blank"
                                    className="flex-1 inline-flex items-center justify-center gap-1.5 text-xs font-semibold rounded-xl px-3 py-2 bg-blue-600 text-white hover:bg-blue-700 transition-all shadow-sm"
                                  >
                                    <ExternalLink className="h-3.5 w-3.5" />
                                    Demo
                                  </Link>
                                ) : null}

                                {codeLink ? (
                                  <Link
                                    href={codeLink}
                                    target="_blank"
                                    className="flex-1 inline-flex items-center justify-center gap-1.5 text-xs font-semibold rounded-xl px-3 py-2 bg-slate-100 text-slate-700 hover:bg-slate-200 transition-all border border-slate-200"
                                  >
                                    <Github className="h-3.5 w-3.5" />
                                    Code
                                  </Link>
                                ) : (
                                  <div
                                    title="Private repository (Client / NDA Project)"
                                    className="flex-1 inline-flex items-center justify-center gap-1.5 text-xs font-semibold rounded-xl px-3 py-2 bg-slate-50 text-slate-400 border border-slate-200 cursor-not-allowed"
                                  >
                                    <Lock className="h-3.5 w-3.5 text-slate-400" />
                                    Private Repo
                                  </div>
                                )}
                              </div>
                            </div>
                          </article>
                        </div>
                      )
                    })}
                  </div>
                )}
              </TabsContent>
            )
          })}
        </Tabs>

        {/* ========================================= */}
        {/* MODAL / POPUP DETAIL (GLASSMORPHISM)      */}
        {/* ========================================= */}
        {selectedProject && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-md animate-in fade-in duration-200"
            onClick={() => setSelectedProject(null)}
          >
            <div
              className="relative w-full max-w-2xl max-h-[85vh] bg-white/90 backdrop-blur-xl border border-white/60 shadow-2xl rounded-3xl p-6 sm:p-8 overflow-y-auto animate-in zoom-in-95 duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-100/80 hover:bg-slate-200 text-slate-600 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Header Image */}
              <div className="relative h-56 sm:h-64 w-full rounded-2xl overflow-hidden mb-6 bg-slate-100 shadow-inner">
                <Image
                  src={selectedProject.thumbnail_url || selectedProject.image_url || "/budiicahyonoo.png"}
                  alt={selectedProject.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"></div>
                
                <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2 items-center">
                  <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    {selectedProject.category}
                  </span>
                  {selectedProject.role && (
                    <span className="bg-slate-900/80 backdrop-blur-md text-white text-xs font-medium px-3 py-1 rounded-full border border-white/20">
                      {selectedProject.role}
                    </span>
                  )}
                </div>
              </div>

              {/* Content Body */}
              <div className="space-y-5">
                <div>
                  <h3 className="font-display font-bold text-2xl sm:text-3xl text-slate-900">
                    {selectedProject.title}
                  </h3>
                  
                  {selectedProject.metric && (
                    <div className="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200 px-3.5 py-1.5 rounded-xl">
                      <BarChart3 className="w-4 h-4 text-blue-600" />
                      <span>{selectedProject.metric}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Overview</h4>
                  <p className="text-sm sm:text-base text-slate-700 leading-relaxed whitespace-pre-line">
                    {selectedProject.description}
                  </p>
                </div>

                {/* Technologies */}
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-slate-400" />
                    Tech Stack & Tools
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {getTechArray(selectedProject.technologies).map((tech) => (
                      <span
                        key={tech}
                        className="text-xs font-semibold px-3 py-1 rounded-lg bg-slate-100 text-slate-700 border border-slate-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-100">
                  {(selectedProject.demo_url || selectedProject.project_url) && (
                    <Link
                      href={selectedProject.demo_url || selectedProject.project_url || "#"}
                      target="_blank"
                      className="flex-1 inline-flex items-center justify-center gap-2 text-sm font-bold rounded-xl px-5 py-3 bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-500/25 transition-all"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Visit Live Demo
                    </Link>
                  )}

                  {(selectedProject.view_url || selectedProject.github_url) ? (
                    <Link
                      href={selectedProject.view_url || selectedProject.github_url || "#"}
                      target="_blank"
                      className="flex-1 inline-flex items-center justify-center gap-2 text-sm font-bold rounded-xl px-5 py-3 bg-slate-100 text-slate-800 hover:bg-slate-200 border border-slate-200 transition-all"
                    >
                      <Github className="h-4 w-4" />
                      View Source Code
                    </Link>
                  ) : (
                    <div className="flex-1 inline-flex items-center justify-center gap-2 text-sm font-bold rounded-xl px-5 py-3 bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed">
                      <Lock className="h-4 w-4" />
                      Private Repository
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}