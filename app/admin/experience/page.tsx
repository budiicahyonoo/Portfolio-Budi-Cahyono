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
import { Loader2, Plus, Pencil, Trash2, Calendar } from "lucide-react"

interface Experience {
  id: string
  title: string
  description: string
  category: string
  thumbnail_url: string
  demo_url: string | null
  view_url: string | null
  technologies: string[]
  date_start: string | null
  date_end: string | null
}

const CATEGORIES = ["Personal Project", "Freelance", "Collaboration"]

export default function AdminExperiencePage() {
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingExperience, setEditingExperience] = useState<Experience | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Personal Project",
    thumbnail_url: "",
    demo_url: "",
    view_url: "",
    technologies: "",
    date_start: "",
    date_end: "",
  })

  useEffect(() => {
    loadExperiences()
  }, [])

  const loadExperiences = async () => {
    const supabase = createClient()
    console.log("[v0] Loading experiences for admin...")
    const { data, error } = await supabase.from("experience").select("*").order("sort_order")

    if (error) {
      console.log("[v0] Error loading experiences:", error)
      toast.error("Failed to load experiences")
    } else {
      console.log("[v0] Experiences loaded successfully:", data?.length, "items")
      setExperiences(data || [])
    }
    setIsLoading(false)
  }

  const handleOpenDialog = (experience?: Experience) => {
    if (experience) {
      setEditingExperience(experience)
      setFormData({
        title: experience.title,
        description: experience.description,
        category: experience.category,
        thumbnail_url: experience.thumbnail_url,
        demo_url: experience.demo_url || "",
        view_url: experience.view_url || "",
        technologies: experience.technologies.join(", "),
        date_start: experience.date_start || "",
        date_end: experience.date_end || "",
      })
    } else {
      setEditingExperience(null)
      setFormData({
        title: "",
        description: "",
        category: "Personal Project",
        thumbnail_url: "",
        demo_url: "",
        view_url: "",
        technologies: "",
        date_start: "",
        date_end: "",
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

    const experienceData = {
      title: formData.title,
      description: formData.description,
      category: formData.category,
      thumbnail_url: formData.thumbnail_url,
      demo_url: formData.demo_url || null,
      view_url: formData.view_url || null,
      technologies: techArray,
      date_start: formData.date_start || null,
      date_end: formData.date_end || null,
      updated_at: new Date().toISOString(),
    }

    if (editingExperience) {
      const { error } = await supabase.from("experience").update(experienceData).eq("id", editingExperience.id)

      if (error) {
        toast.error("Failed to update experience")
      } else {
        toast.success("Experience updated successfully!")
        loadExperiences()
        setIsDialogOpen(false)
      }
    } else {
      const { error } = await supabase.from("experience").insert({
        ...experienceData,
        sort_order: experiences.length,
      })

      if (error) {
        toast.error("Failed to add experience")
      } else {
        toast.success("Experience added successfully!")
        loadExperiences()
        setIsDialogOpen(false)
      }
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this experience?")) return

    const supabase = createClient()
    const { error } = await supabase.from("experience").delete().eq("id", id)

    if (error) {
      toast.error("Failed to delete experience")
    } else {
      toast.success("Experience deleted successfully!")
      loadExperiences()
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
          <h1 className="text-3xl font-bold mb-2">Manage Experience</h1>
          <p className="text-muted-foreground">Document your professional journey</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => handleOpenDialog()}>
              <Plus className="mr-2 h-4 w-4" />
              Add Experience
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingExperience ? "Edit Experience" : "Add New Experience"}</DialogTitle>
              <DialogDescription>Enter the experience details below</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
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
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date_start">Start Date</Label>
                  <Input
                    id="date_start"
                    type="date"
                    value={formData.date_start}
                    onChange={(e) => setFormData({ ...formData, date_start: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date_end">End Date (optional)</Label>
                  <Input
                    id="date_end"
                    type="date"
                    value={formData.date_end}
                    onChange={(e) => setFormData({ ...formData, date_end: e.target.value })}
                  />
                </div>
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
                  placeholder="Next.js, Supabase, TypeScript"
                />
              </div>
              <Button onClick={handleSave} className="w-full">
                {editingExperience ? "Update Experience" : "Add Experience"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {experiences.map((exp) => (
          <Card key={exp.id}>
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">{exp.category}</span>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="ghost" onClick={() => handleOpenDialog(exp)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => handleDelete(exp.id)}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </div>
              {exp.date_start && (
                <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
                  <Calendar className="h-3 w-3" />
                  <span>
                    {new Date(exp.date_start).toLocaleDateString("en-US", { month: "short", year: "numeric" })} -{" "}
                    {exp.date_end
                      ? new Date(exp.date_end).toLocaleDateString("en-US", { month: "short", year: "numeric" })
                      : "Present"}
                  </span>
                </div>
              )}
              <CardTitle className="text-lg">{exp.title}</CardTitle>
              <CardDescription className="line-clamp-2">{exp.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  )
}
