"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { Loader2, Save } from "lucide-react"

interface HomeData {
  id: string
  name: string
  role: string
  value_proposition: string
  photo_url: string
  email: string
}

export default function AdminHomePage() {
  const [data, setData] = useState<HomeData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    const supabase = createClient()
    console.log("[v0] Loading home data for admin...")
    const { data: homeData, error } = await supabase.from("home").select("*").limit(1)

    if (error) {
      console.log("[v0] Error loading home data:", error)
      toast.error("Failed to load home data")
      setIsLoading(false)
      return
    }

    if (homeData && homeData.length > 0) {
      console.log("[v0] Home data loaded successfully")
      setData(homeData[0])
    } else {
      toast.error("No home data found")
    }
    setIsLoading(false)
  }

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!data) return

    setIsSaving(true)
    const supabase = createClient()

    const { data: updateResult, error } = await supabase
      .from("home")
      .update({
        name: data.name,
        role: data.role,
        value_proposition: data.value_proposition,
        photo_url: data.photo_url,
        email: data.email,
        updated_at: new Date().toISOString(),
      })
      .eq("id", data.id)
      .select()

    if (error) {
      toast.error(`Failed to save changes: ${error.message}`)
      setIsSaving(false)
      return
    }

    try {
      await fetch("/api/revalidate", {
        method: "POST",
      })
    } catch (revalidateError) {
      console.error("Failed to revalidate:", revalidateError)
    }

    toast.success("Changes saved successfully!")
    await loadData()
    setIsSaving(false)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!data) return null

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Manage Home Section</h1>
        <p className="text-muted-foreground">Update your hero section content</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Hero Section</CardTitle>
          <CardDescription>This content appears on your portfolio homepage</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSave} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={data.name}
                onChange={(e) => setData({ ...data, name: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Input
                id="role"
                value={data.role}
                onChange={(e) => setData({ ...data, role: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="value_proposition">Value Proposition</Label>
              <Textarea
                id="value_proposition"
                value={data.value_proposition}
                onChange={(e) => setData({ ...data, value_proposition: e.target.value })}
                required
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="photo_url">Photo URL</Label>
              <Input
                id="photo_url"
                value={data.photo_url}
                onChange={(e) => setData({ ...data, photo_url: e.target.value })}
                placeholder="/path/to/photo.jpg"
              />
              <p className="text-xs text-muted-foreground">Enter the URL or path to your profile photo</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
                required
              />
            </div>

            <Button type="submit" disabled={isSaving} className="w-full">
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
