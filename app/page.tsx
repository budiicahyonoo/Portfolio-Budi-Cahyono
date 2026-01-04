import { createClient } from "@/lib/supabase/server"
import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { SkillsSection } from "@/components/skills-section"
import { ProjectsSection } from "@/components/projects-section"
import { ExperienceSection } from "@/components/experience-section"
import { BlogSection } from "@/components/blog-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"

export const dynamic = "force-dynamic"
export const revalidate = 0

export default async function Home() {
  const supabase = await createClient()

  // Fetch all data in parallel
  const [
    { data: homeData },
    { data: skills },
    { data: projects },
    { data: experience },
    { data: blog },
    { data: contact },
  ] = await Promise.all([
    supabase.from("home").select("*").limit(1),
    supabase.from("skills").select("*").order("sort_order"),
    supabase.from("projects").select("*").order("sort_order"),
    supabase.from("experience").select("*").order("sort_order"),
    supabase.from("blog").select("*").order("sort_order"),
    supabase.from("contact").select("*").order("sort_order"),
  ])

  const home = homeData?.[0]

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        {home && <HeroSection data={home} />}
        {skills && <SkillsSection skills={skills} />}
        {projects && <ProjectsSection projects={projects} />}
        {experience && <ExperienceSection experiences={experience} />}
        {blog && <BlogSection posts={blog} />}
        {contact && <ContactSection contacts={contact} />}
      </main>
      <Footer />
    </div>
  )
}
