import Image from "next/image"
import Link from "next/link"
import { ExternalLink, Github, Calendar, Briefcase } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Reveal } from "@/components/reveal"

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
  achievements?: string[]
}

interface ExperienceSectionProps {
  experiences: Experience[]
}

export function ExperienceSection({ experiences }: ExperienceSectionProps) {
  const categories = ["Work", "Intern", "Freelance"]

  const formatDate = (date: Date | string | null) => {
    if (!date) return "Present"
    const d = new Date(date)
    if (isNaN(d.getTime())) return "Present"
    return d.toLocaleDateString("en-US", { month: "short", year: "numeric" })
  }

  const sortedExperiences = [...experiences].sort((a, b) => {
    if (!a.date_start) return -1; 
    if (!b.date_start) return 1;
    return new Date(b.date_start).getTime() - new Date(a.date_start).getTime();
  });

  return (
    <section id="experience" className="py-24 px-4 sm:px-6 lg:px-8 relative bg-blue-600 text-white">
      <div className="max-w-7xl mx-auto">
        <Reveal className="text-center mb-16">
          <div>
            <h2 className="font-display text-4xl sm:text-5xl font-bold mt-4 mb-4 text-white">
              Professional <span className="text-blue-200">Experience</span>
            </h2>
            <p className="text-lg text-white/85 max-w-2xl mx-auto">
              Building impactful software and AI solutions across various roles
            </p>
          </div>
        </Reveal>

        <Tabs defaultValue="Work" className="w-full">
          <div className="flex justify-center mb-12">
            <TabsList className="inline-flex h-auto items-center rounded-full p-1.5 bg-white/15 backdrop-blur-md border border-white/20">
              {categories.map((category) => (
                <TabsTrigger 
                  key={category} 
                  value={category}
                  className="px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 data-[state=active]:!bg-white data-[state=active]:!text-blue-700 data-[state=active]:!shadow-md text-white hover:text-white hover:bg-white/20"
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
                {categoryExperiences.length === 0 ? (
                  <div className="text-center py-12 text-white/70 text-sm">
                    No experience records found in this category.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categoryExperiences.map((exp, i) => (
                      <div
                        key={exp.id}
                        className="stagger-item"
                        style={{ animationDelay: `${i * 90}ms`, height: '100%' }}
                      >
                        <article className="lift-hover group h-full flex flex-col rounded-2xl overflow-hidden bg-white text-slate-900 border border-slate-100 shadow-xl">
                          
                          <div className="relative h-40 overflow-hidden bg-slate-50 p-4 flex items-center justify-center border-b border-slate-100">
                            {exp.thumbnail_url ? (
                              <Image
                                src={exp.thumbnail_url}
                                alt={exp.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                            ) : (
                              <div className="w-16 h-16 rounded-2xl bg-blue-50 border border-blue-100 grid place-items-center text-blue-600">
                                <Briefcase className="w-8 h-8" />
                              </div>
                            )}
                          </div>

                          <div className="p-6 flex flex-col flex-1 gap-4">
                            <div className="space-y-2">
                              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-100 px-2.5 py-1 rounded-full">
                                <Calendar className="h-3 w-3" />
                                <span>
                                  {formatDate(exp.date_start)} - {formatDate(exp.date_end)}
                                </span>
                              </div>

                              <h3 className="font-display font-bold text-lg text-slate-900">{exp.title}</h3>
                              <p className="text-sm text-slate-600 leading-relaxed">{exp.description}</p>
                            </div>

                            {exp.achievements && exp.achievements.length > 0 && (
                              <ul className="space-y-1.5 text-xs text-slate-600 list-disc list-inside">
                                {exp.achievements.map((item, idx) => (
                                  <li key={idx} className="leading-normal">{item}</li>
                                ))}
                              </ul>
                            )}

                            <div className="flex flex-wrap gap-1.5 mt-auto">
                              {exp.technologies.map((tech) => (
                                <span key={tech} className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                                  {tech}
                                </span>
                              ))}
                            </div>

                            {(exp.demo_url || exp.view_url) && (
                              <div className="flex gap-2 pt-2 border-t border-slate-100">
                                {exp.demo_url && (
                                  <Link
                                    href={exp.demo_url}
                                    target="_blank"
                                    className="flex-1 inline-flex items-center justify-center gap-1.5 text-xs font-semibold rounded-xl px-3 py-2 bg-blue-600 text-white hover:bg-blue-700 transition-all"
                                  >
                                    <ExternalLink className="h-3.5 w-3.5" />
                                    Demo
                                  </Link>
                                )}
                                {exp.view_url && (
                                  <Link
                                    href={exp.view_url}
                                    target="_blank"
                                    className="flex-1 inline-flex items-center justify-center gap-1.5 text-xs font-semibold rounded-xl px-3 py-2 bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200 transition-all"
                                  >
                                    <Github className="h-3.5 w-3.5" />
                                    Code
                                  </Link>
                                )}
                              </div>
                            )}
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