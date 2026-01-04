"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
import { Loader2, Plus, Pencil, Trash2, Mail, Linkedin, Github, Calendar } from "lucide-react"

interface Contact {
  id: string
  platform: string
  url: string
  sort_order: number
}

const PLATFORMS = ["Email", "LinkedIn", "GitHub", "Calendly"]

export default function AdminContactPage() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingContact, setEditingContact] = useState<Contact | null>(null)
  const [formData, setFormData] = useState({ platform: "Email", url: "" })

  useEffect(() => {
    loadContacts()
  }, [])

  const loadContacts = async () => {
    const supabase = createClient()
    console.log("[v0] Loading contacts for admin...")
    const { data, error } = await supabase.from("contact").select("*").order("sort_order")

    if (error) {
      console.log("[v0] Error loading contacts:", error)
      toast.error("Failed to load contacts")
    } else {
      console.log("[v0] Contacts loaded successfully:", data?.length, "items")
      setContacts(data || [])
    }
    setIsLoading(false)
  }

  const handleOpenDialog = (contact?: Contact) => {
    if (contact) {
      setEditingContact(contact)
      setFormData({ platform: contact.platform, url: contact.url })
    } else {
      setEditingContact(null)
      setFormData({ platform: "Email", url: "" })
    }
    setIsDialogOpen(true)
  }

  const handleSave = async () => {
    const supabase = createClient()

    if (editingContact) {
      const { error } = await supabase
        .from("contact")
        .update({ ...formData, updated_at: new Date().toISOString() })
        .eq("id", editingContact.id)

      if (error) {
        toast.error("Failed to update contact")
      } else {
        toast.success("Contact updated successfully!")
        loadContacts()
        setIsDialogOpen(false)
      }
    } else {
      const { error } = await supabase.from("contact").insert({
        ...formData,
        sort_order: contacts.length,
      })

      if (error) {
        toast.error("Failed to add contact")
      } else {
        toast.success("Contact added successfully!")
        loadContacts()
        setIsDialogOpen(false)
      }
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this contact?")) return

    const supabase = createClient()
    const { error } = await supabase.from("contact").delete().eq("id", id)

    if (error) {
      toast.error("Failed to delete contact")
    } else {
      toast.success("Contact deleted successfully!")
      loadContacts()
    }
  }

  const getIcon = (platform: string) => {
    switch (platform) {
      case "Email":
        return <Mail className="h-5 w-5" />
      case "LinkedIn":
        return <Linkedin className="h-5 w-5" />
      case "GitHub":
        return <Github className="h-5 w-5" />
      case "Calendly":
        return <Calendar className="h-5 w-5" />
      default:
        return null
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
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Manage Contact</h1>
          <p className="text-muted-foreground">Update your contact information</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => handleOpenDialog()}>
              <Plus className="mr-2 h-4 w-4" />
              Add Contact
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingContact ? "Edit Contact" : "Add New Contact"}</DialogTitle>
              <DialogDescription>Enter the contact details below</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="platform">Platform</Label>
                <Select
                  value={formData.platform}
                  onValueChange={(value) => setFormData({ ...formData, platform: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {PLATFORMS.map((platform) => (
                      <SelectItem key={platform} value={platform}>
                        {platform}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="url">URL</Label>
                <Input
                  id="url"
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  placeholder="https://... or mailto:..."
                />
              </div>
              <Button onClick={handleSave} className="w-full">
                {editingContact ? "Update Contact" : "Add Contact"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {contacts.map((contact) => (
          <Card key={contact.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">{getIcon(contact.platform)}</div>
                  <div>
                    <CardTitle className="text-lg">{contact.platform}</CardTitle>
                    <CardDescription className="text-xs truncate max-w-[200px]">{contact.url}</CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="ghost" onClick={() => handleOpenDialog(contact)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => handleDelete(contact.id)}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  )
}
