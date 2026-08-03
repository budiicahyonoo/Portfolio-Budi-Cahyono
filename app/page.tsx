import prisma from "@/lib/prisma"
import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { ProjectsSection } from "@/components/projects-section"
import { ExperienceSection } from "@/components/experience-section"
import { BlogSection } from "@/components/blog-section"

export const dynamic = "force-dynamic"
export const revalidate = 0

export default async function Home() {
  // Fetch all data in parallel menggunakan Prisma
  const [homeData, projects, experience, blog] = await Promise.all([
    prisma.home.findFirst(),
    prisma.project.findMany({ orderBy: { sort_order: 'asc' } }),
    prisma.experience.findMany({ orderBy: { sort_order: 'asc' } }),
    prisma.blog.findMany({ orderBy: { sort_order: 'asc' } }),
  ])

  const home = homeData

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        {/* Tambahkan "as any" untuk membungkam peringatan TypeScript */}
        {home && <HeroSection data={home as any} />}
        {projects && projects.length > 0 && <ProjectsSection projects={projects as any} />}
        {experience && experience.length > 0 && <ExperienceSection experiences={experience as any} />}
        {blog && blog.length > 0 && <BlogSection posts={blog as any} />}
      </main>
    </div>
  )
}