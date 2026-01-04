"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { toast } from "sonner"
import { Loader2, Plus, Pencil, Trash2 } from "lucide-react"
import Image from "next/image"

interface Project {
  id: string
  title: string
  description: string
  category: string
  thumbnail_url: string
  demo_url: string | null
  view_url: string | null
  technologies: string[]
}

const CATEGORIES = ["AI", "Data", "Model"]

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "AI",
    thumbnail_url: "",
    demo_url: "",
    view_url: "",
    technologies: "",
  })

  useEffect(() => {
    loadProjects()
  }, [])

  const loadProjects = async () => {
    const supabase = createClient()
    console.log("[v0] Loading projects for admin...")
    const { data, error } = await supabase.from("projects").select("*").order("sort_order")

    if (error) {
      console.log("[v0] Error loading projects:", error)
      toast.error("Failed to load projects")
    } else {
      console.log("[v0] Projects loaded successfully:", data?.length, "items")
      setProjects(data || [])
    }
    setIsLoading(false)
  }

  const handleOpenDialog = (project?: Project) => {
    if (project) {
      setEditingProject(project)
      setFormData({
        title: project.title,
        description: project.description,
        category: project.category,
        thumbnail_url: project.thumbnail_url,
        demo_url: project.demo_url || "",
        view_url: project.view_url || "",
        technologies: project.technologies.join(", "),
      })
    } else {
      setEditingProject(null)
      setFormData({
        title: "",
        description: "",
        category: "AI",
        thumbnail_url: "",
        demo_url: "",
        view_url: "",
        technologies: "",
      })
    }
    setIsDialogOpen(true)
  }

  const handleSave = async () => {
    const supabase = createClient()
    const techArray = formData.technologies
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean)

    const projectData = {
      title: formData.title,
      description: formData.description,
      category: formData.category,
      thumbnail_url: formData.thumbnail_url,
      demo_url: formData.demo_url || null,
      view_url: formData.view_url || null,
      technologies: techArray,
      updated_at: new Date().toISOString(),
    }

    if (editingProject) {
      const { error } = await supabase.from("projects").update(projectData).eq("id", editingProject.id)

      if (error) {
        toast.error("Failed to update project")
      } else {
        toast.success("Project updated successfully!")
        loadProjects()
        setIsDialogOpen(false)
      }
    } else {
      const { error } = await supabase.from("projects").insert({
        ...projectData,
        sort_order: projects.length,
      })

      if (error) {
        toast.error("Failed to add project")
      } else {
        toast.success("Project added successfully!")
        loadProjects()
        setIsDialogOpen(false)
      }
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return

    const supabase = createClient()
    const { error } = await supabase.from("projects").delete().eq("id", id)

    if (error) {
      toast.error("Failed to delete project")
    } else {
      toast.success("Project deleted successfully!")
      loadProjects()
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Manage Projects</h1>
          <p className="text-muted-foreground">Showcase your best work</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => handleOpenDialog()}>
              <Plus className="mr-2 h-4 w-4" />
              Add Project
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingProject ? "Edit Project" : "Add New Project"}</DialogTitle>
              <DialogDescription>Enter the project details below</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Project Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="thumbnail_url">Thumbnail URL</Label>
                <Input
                  id="thumbnail_url"
                  value={formData.thumbnail_url}
                  onChange={(e) => setFormData({ ...formData, thumbnail_url: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="demo_url">Demo URL</Label>
                <Input
                  id="demo_url"
                  value={formData.demo_url}
                  onChange={(e) => setFormData({ ...formData, demo_url: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="view_url">Code/View URL</Label>
                <Input
                  id="view_url"
                  value={formData.view_url}
                  onChange={(e) => setFormData({ ...formData, view_url: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="technologies">Technologies (comma-separated)</Label>
                <Input
                  id="technologies"
                  value={formData.technologies}
                  onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                  placeholder="Python, PyTorch, FastAPI"
                />
              </div>
              <Button onClick={handleSave} className="w-full">
                {editingProject ? "Update Project" : "Add Project"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="group overflow-hidden">
            <div className="relative h-48">
              <Image
                src={project.thumbnail_url || "/placeholder.svg"}
                alt={project.title}
                fill
                className="object-cover"
              />
            </div>
            <CardHeader>
              <div className="flex items-center justify-between">
                <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">{project.category}</span>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="ghost" onClick={() => handleOpenDialog(project)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => handleDelete(project.id)}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </div>
              <CardTitle className="text-lg mt-2">{project.title}</CardTitle>
              <CardDescription className="line-clamp-2">{project.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  )
}
