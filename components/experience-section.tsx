import Image from "next/image"
import Link from "next/link"
import { ExternalLink, Github, Calendar } from "lucide-react"
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
    <section id="experience" className="py-24 px-4 sm:px-6 lg:px-8 relative bg-white">
      <div className="max-w-7xl mx-auto">
        <Reveal className="text-center mb-16">
          <div>
           
            <h2 className="font-display text-4xl sm:text-5xl font-bold mt-4 mb-4">
              Professional <span className="text-blue-600">Experience</span>
            </h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
              Building impactful solutions across different domains
            </p>
          </div>
        </Reveal>

        <Tabs defaultValue="Work" className="w-full">
          {/* Pill tab glassmorphism */}
          <div className="flex justify-center mb-12">
            <TabsList className="glass-pill inline-flex h-auto items-center rounded-full p-1.5">
              {categories.map((category) => (
                <TabsTrigger 
                  key={category} 
                  value={category}
                  className="px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 data-[state=active]:!bg-blue-600 data-[state=active]:!text-white data-[state=active]:!shadow-md data-[state=active]:!border-white/25 text-slate-600 hover:text-blue-700"
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
                  {categoryExperiences.map((exp, i) => (
                    <div
                      key={exp.id}
                      className="stagger-item"
                      style={{ animationDelay: `${i * 90}ms`, height: '100%' }}
                    >
                      <article className="glass glass-glow lift-hover group h-full flex flex-col rounded-2xl overflow-hidden">
                        <div className="relative h-48 overflow-hidden">
                          <Image
                            src={exp.thumbnail_url || "/portfoliostackplus.png"}
                            alt={exp.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/25 to-transparent"></div>
                        </div>
                        <div className="p-6 flex flex-col flex-1 gap-4">
                          <div className="space-y-1">
                            <div className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-700 bg-blue-50/80 border border-blue-100 px-2.5 py-1 rounded-full">
                              <Calendar className="h-3 w-3" />
                              <span>
                                {formatDate(exp.date_start)} - {formatDate(exp.date_end)}
                              </span>
                            </div>
                            <h3 className="font-display font-semibold text-lg text-slate-900">{exp.title}</h3>
                            <p className="text-sm text-slate-500 line-clamp-2">{exp.description}</p>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {exp.technologies.slice(0, 3).map((tech) => (
                              <span key={tech} className="tech-chip text-xs px-2.5 py-1 rounded-full font-medium">
                                {tech}
                              </span>
                            ))}
                          </div>
                          <div className="flex gap-2 mt-auto">
                            {exp.demo_url && (
                              <Link
                                href={exp.demo_url}
                                target="_blank"
                                className="glow-btn flex-1 inline-flex items-center justify-center gap-1.5 text-sm font-semibold rounded-xl px-3 py-2 bg-blue-600 text-white shadow-md shadow-blue-500/25"
                              >
                                <ExternalLink className="h-3.5 w-3.5" />
                                Demo
                              </Link>
                            )}
                            {exp.view_url && (
                              <Link
                                href={exp.view_url}
                                target="_blank"
                                className="glass-icon glow-btn flex-1 inline-flex items-center justify-center gap-1.5 text-sm font-semibold rounded-xl px-3 py-2 text-blue-700"
                              >
                                <Github className="h-3.5 w-3.5" />
                                Code
                              </Link>
                            )}
                          </div>
                        </div>
                      </article>
                    </div>
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
