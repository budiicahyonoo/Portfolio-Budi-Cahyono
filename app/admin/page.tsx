import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Home, Zap, FolderGit2, Briefcase, BookOpen, Mail, BarChart3, ArrowRight } from "lucide-react"

export default function AdminDashboard() {
  const sections = [
    {
      title: "Home",
      description: "Manage hero section content",
      icon: Home,
      href: "/admin/home",
      color: "text-primary",
    },
    {
      title: "Skills",
      description: "Add and organize technical skills",
      icon: Zap,
      href: "/admin/skills",
      color: "text-primary",
    },
    {
      title: "Projects",
      description: "Showcase your best work",
      icon: FolderGit2,
      href: "/admin/projects",
      color: "text-primary",
    },
    {
      title: "Experience",
      description: "Document your professional journey",
      icon: Briefcase,
      href: "/admin/experience",
      color: "text-primary",
    },
    {
      title: "Blog",
      description: "Share your insights and learnings",
      icon: BookOpen,
      href: "/admin/blog",
      color: "text-primary",
    },
    {
      title: "Contact",
      description: "Update contact information",
      icon: Mail,
      href: "/admin/contact",
      color: "text-primary",
    },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">
          Welcome to Your <span className="text-primary">Admin Dashboard</span>
        </h1>
        <p className="text-lg text-muted-foreground">Manage all aspects of your portfolio from here</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {sections.map((section) => {
          const Icon = section.icon
          return (
            <Card key={section.href} className="group hover:border-primary transition-all duration-300">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <div className={`p-3 rounded-lg bg-primary/10 ${section.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
                <CardTitle>{section.title}</CardTitle>
                <CardDescription>{section.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="outline" className="w-full bg-transparent">
                  <Link href={section.href}>Manage {section.title}</Link>
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
        <CardHeader>
          <div className="flex items-center gap-2 mb-2">
            <BarChart3 className="h-6 w-6 text-primary" />
            <CardTitle>Quick Stats</CardTitle>
          </div>
          <CardDescription>Your portfolio at a glance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="text-center p-4 rounded-lg bg-card">
              <div className="text-3xl font-bold text-primary mb-1">12+</div>
              <div className="text-sm text-muted-foreground">Skills</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-card">
              <div className="text-3xl font-bold text-primary mb-1">9</div>
              <div className="text-sm text-muted-foreground">Projects</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-card">
              <div className="text-3xl font-bold text-primary mb-1">9</div>
              <div className="text-sm text-muted-foreground">Blog Posts</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
