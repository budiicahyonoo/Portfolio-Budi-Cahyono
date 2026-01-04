"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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

interface Skill {
  id: string
  name: string
  category: string
  logo_url: string
  sort_order: number
}

const CATEGORIES = ["AI/Data", "Backend", "Frontend", "Tools"]

export default function AdminSkillsPage() {
  const [skills, setSkills] = useState<Skill[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null)
  const [formData, setFormData] = useState({ name: "", category: "AI/Data", logo_url: "" })

  useEffect(() => {
    loadSkills()
  }, [])

  const loadSkills = async () => {
    const supabase = createClient()
    console.log("[v0] Loading skills for admin...")
    const { data, error } = await supabase.from("skills").select("*").order("sort_order")

    if (error) {
      console.log("[v0] Error loading skills:", error)
      toast.error("Failed to load skills")
    } else {
      console.log("[v0] Skills loaded successfully:", data?.length, "items")
      setSkills(data || [])
    }
    setIsLoading(false)
  }

  const handleOpenDialog = (skill?: Skill) => {
    if (skill) {
      setEditingSkill(skill)
      setFormData({ name: skill.name, category: skill.category, logo_url: skill.logo_url })
    } else {
      setEditingSkill(null)
      setFormData({ name: "", category: "AI/Data", logo_url: "" })
    }
    setIsDialogOpen(true)
  }

  const handleSave = async () => {
    const supabase = createClient()

    if (editingSkill) {
      const { error } = await supabase
        .from("skills")
        .update({ ...formData, updated_at: new Date().toISOString() })
        .eq("id", editingSkill.id)

      if (error) {
        toast.error("Failed to update skill")
      } else {
        toast.success("Skill updated successfully!")
        loadSkills()
        setIsDialogOpen(false)
      }
    } else {
      const { error } = await supabase.from("skills").insert({
        ...formData,
        sort_order: skills.length,
      })

      if (error) {
        toast.error("Failed to add skill")
      } else {
        toast.success("Skill added successfully!")
        loadSkills()
        setIsDialogOpen(false)
      }
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this skill?")) return

    const supabase = createClient()
    const { error } = await supabase.from("skills").delete().eq("id", id)

    if (error) {
      toast.error("Failed to delete skill")
    } else {
      toast.success("Skill deleted successfully!")
      loadSkills()
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
          <h1 className="text-3xl font-bold mb-2">Manage Skills</h1>
          <p className="text-muted-foreground">Add and organize your technical skills</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => handleOpenDialog()}>
              <Plus className="mr-2 h-4 w-4" />
              Add Skill
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingSkill ? "Edit Skill" : "Add New Skill"}</DialogTitle>
              <DialogDescription>Enter the skill details below</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Skill Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Python"
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
                <Label htmlFor="logo_url">Logo URL</Label>
                <Input
                  id="logo_url"
                  value={formData.logo_url}
                  onChange={(e) => setFormData({ ...formData, logo_url: e.target.value })}
                  placeholder="/path/to/logo.svg"
                />
              </div>
              <Button onClick={handleSave} className="w-full">
                {editingSkill ? "Update Skill" : "Add Skill"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {CATEGORIES.map((category) => {
        const categorySkills = skills.filter((s) => s.category === category)
        if (categorySkills.length === 0) return null

        return (
          <Card key={category} className="mb-6">
            <CardHeader>
              <CardTitle>{category}</CardTitle>
              <CardDescription>{categorySkills.length} skills</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categorySkills.map((skill) => (
                  <div key={skill.id} className="flex items-center justify-between p-4 rounded-lg border border-border">
                    <div className="flex items-center gap-3">
                      <div className="text-sm font-medium">{skill.name}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="ghost" onClick={() => handleOpenDialog(skill)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => handleDelete(skill.id)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
