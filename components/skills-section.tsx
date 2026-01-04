import Image from "next/image"
import { Card } from "@/components/ui/card"

interface Skill {
  id: string
  name: string
  category: string
  logo_url: string
}

interface SkillsSectionProps {
  skills: Skill[]
}

export function SkillsSection({ skills }: SkillsSectionProps) {
  const categories = ["AI/Data", "Backend", "Frontend", "Tools"]

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="text-primary">Technical</span> Skills
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Expertise across the AI and software development stack
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category) => {
            const categorySkills = skills.filter((s) => s.category === category)
            return (
              <Card key={category} className="p-6 bg-card border-border hover:border-primary transition-colors">
                <h3 className="text-xl font-semibold text-primary mb-6">{category}</h3>
                <div className="grid grid-cols-2 gap-4">
                  {categorySkills.map((skill) => (
                    <div
                      key={skill.id}
                      className="flex flex-col items-center gap-2 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                    >
                      <div className="relative w-12 h-12">
                        <Image
                          src={skill.logo_url || "/placeholder.svg"}
                          alt={skill.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <span className="text-xs text-center text-muted-foreground">{skill.name}</span>
                    </div>
                  ))}
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
