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
import { Loader2, Plus, Pencil, Trash2, Clock } from "lucide-react"

interface BlogPost {
  id: string
  title: string
  description: string
  category: string
  thumbnail_url: string
  content: string | null
  view_url: string | null
  read_time: number | null
}

const CATEGORIES = ["What You Learned", "How You Built Something", "Lessons From Failure"]

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "What You Learned",
    thumbnail_url: "",
    content: "",
    view_url: "",
    read_time: "",
  })

  useEffect(() => {
    loadPosts()
  }, [])

  const loadPosts = async () => {
    const supabase = createClient()
    console.log("[v0] Loading blog posts for admin...")
    const { data, error } = await supabase.from("blog").select("*").order("sort_order")

    if (error) {
      console.log("[v0] Error loading blog posts:", error)
      toast.error("Failed to load blog posts")
    } else {
      console.log("[v0] Blog posts loaded successfully:", data?.length, "items")
      setPosts(data || [])
    }
    setIsLoading(false)
  }

  const handleOpenDialog = (post?: BlogPost) => {
    if (post) {
      setEditingPost(post)
      setFormData({
        title: post.title,
        description: post.description,
        category: post.category,
        thumbnail_url: post.thumbnail_url,
        content: post.content || "",
        view_url: post.view_url || "",
        read_time: post.read_time?.toString() || "",
      })
    } else {
      setEditingPost(null)
      setFormData({
        title: "",
        description: "",
        category: "What You Learned",
        thumbnail_url: "",
        content: "",
        view_url: "",
        read_time: "",
      })
    }
    setIsDialogOpen(true)
  }

  const handleSave = async () => {
    const supabase = createClient()

    const postData = {
      title: formData.title,
      description: formData.description,
      category: formData.category,
      thumbnail_url: formData.thumbnail_url,
      content: formData.content || null,
      view_url: formData.view_url || null,
      read_time: formData.read_time ? Number.parseInt(formData.read_time) : null,
      updated_at: new Date().toISOString(),
    }

    if (editingPost) {
      const { error } = await supabase.from("blog").update(postData).eq("id", editingPost.id)

      if (error) {
        toast.error("Failed to update blog post")
      } else {
        toast.success("Blog post updated successfully!")
        loadPosts()
        setIsDialogOpen(false)
      }
    } else {
      const { error } = await supabase.from("blog").insert({
        ...postData,
        sort_order: posts.length,
      })

      if (error) {
        toast.error("Failed to add blog post")
      } else {
        toast.success("Blog post added successfully!")
        loadPosts()
        setIsDialogOpen(false)
      }
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return

    const supabase = createClient()
    const { error } = await supabase.from("blog").delete().eq("id", id)

    if (error) {
      toast.error("Failed to delete blog post")
    } else {
      toast.success("Blog post deleted successfully!")
      loadPosts()
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
          <h1 className="text-3xl font-bold mb-2">Manage Blog</h1>
          <p className="text-muted-foreground">Share your insights and learnings</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => handleOpenDialog()}>
              <Plus className="mr-2 h-4 w-4" />
              Add Blog Post
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingPost ? "Edit Blog Post" : "Add New Blog Post"}</DialogTitle>
              <DialogDescription>Enter the blog post details below</DialogDescription>
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
              <div className="space-y-2">
                <Label htmlFor="thumbnail_url">Thumbnail URL</Label>
                <Input
                  id="thumbnail_url"
                  value={formData.thumbnail_url}
                  onChange={(e) => setFormData({ ...formData, thumbnail_url: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="view_url">Article URL</Label>
                <Input
                  id="view_url"
                  value={formData.view_url}
                  onChange={(e) => setFormData({ ...formData, view_url: e.target.value })}
                  placeholder="/blog/article-slug"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="read_time">Read Time (minutes)</Label>
                <Input
                  id="read_time"
                  type="number"
                  value={formData.read_time}
                  onChange={(e) => setFormData({ ...formData, read_time: e.target.value })}
                  placeholder="5"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="content">Content (optional)</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  rows={5}
                  placeholder="Full blog post content..."
                />
              </div>
              <Button onClick={handleSave} className="w-full">
                {editingPost ? "Update Blog Post" : "Add Blog Post"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Card key={post.id}>
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary line-clamp-1">
                  {post.category}
                </span>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="ghost" onClick={() => handleOpenDialog(post)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => handleDelete(post.id)}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </div>
              {post.read_time && (
                <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
                  <Clock className="h-3 w-3" />
                  <span>{post.read_time} min read</span>
                </div>
              )}
              <CardTitle className="text-lg line-clamp-2">{post.title}</CardTitle>
              <CardDescription className="line-clamp-2">{post.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  )
}
