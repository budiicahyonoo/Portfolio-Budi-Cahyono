"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2, Edit3, ImageIcon, Loader2 } from "lucide-react";

interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  thumbnail_url: string | null;
  demo_url: string | null;
  view_url: string | null;
  technologies: string[];
  role: string | null;
  metric: string | null;
  sort_order: number;
}

export function ProjectsTab() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form State
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("AI");
  const [technologiesInput, setTechnologiesInput] = useState("");
  const [demoUrl, setDemoUrl] = useState("");
  const [viewUrl, setViewUrl] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [role, setRole] = useState("");
  const [metric, setMetric] = useState("");
  const [sortOrder, setSortOrder] = useState("0");

  const [isUploadingImage, setIsUploadingImage] = useState(false);

  useEffect(() => { fetchProjects(); }, []);

  const fetchProjects = async () => {
    setIsLoading(true);
    const res = await fetch("/api/projects");
    if (res.ok) setProjects(await res.json());
    setIsLoading(false);
  };

  const resetForm = () => {
    setEditingId(null); setTitle(""); setDesc(""); setCategory("AI");
    setTechnologiesInput(""); setDemoUrl(""); setViewUrl(""); setThumbnailUrl("");
    setRole(""); setMetric(""); setSortOrder("0");
  };

  const handleEdit = (p: Project) => {
    setEditingId(p.id); setTitle(p.title); setDesc(p.description); setCategory(p.category);
    setTechnologiesInput(p.technologies ? p.technologies.join(", ") : "");
    setDemoUrl(p.demo_url || ""); setViewUrl(p.view_url || "");
    setThumbnailUrl(p.thumbnail_url || ""); setRole(p.role || ""); setMetric(p.metric || "");
    setSortOrder(String(p.sort_order));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    if (file.size > 4 * 1024 * 1024) return alert("⚠️ Maksimal 4MB");

    setIsUploadingImage(true);
    try {
      const res = await fetch(`/api/upload?filename=${encodeURIComponent(file.name)}`, { method: 'POST', body: file });
      const data = await res.json();
      if (data.url) {
        setThumbnailUrl(data.url);
        alert("✅ Foto proyek berhasil di-upload!");
      }
    } catch (err) {
      alert("❌ Gagal mengunggah gambar.");
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const techArray = technologiesInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const payload = {
      title,
      description: desc,
      category,
      technologies: techArray,
      demo_url: demoUrl || null,
      view_url: viewUrl || null,
      thumbnail_url: thumbnailUrl || null,
      role: role || null,
      metric: metric || null,
      sort_order: Number(sortOrder),
    };

    const endpoint = editingId ? `/api/projects/${editingId}` : "/api/projects";
    const res = await fetch(endpoint, {
      method: editingId ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) { fetchProjects(); resetForm(); } else alert("Gagal menyimpan!");
    setIsSubmitting(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Hapus proyek ini?")) return;
    const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
    if (res.ok) fetchProjects();
  };

  return (
    <div className="grid lg:grid-cols-3 gap-8 items-start animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="lg:col-span-1 bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm space-y-6">
        <div>
          <h2 className="text-lg font-bold flex items-center gap-2">
            {editingId ? <Edit3 className="w-5 h-5 text-blue-600"/> : <Plus className="w-5 h-5 text-blue-600"/>} 
            {editingId ? "Edit Proyek" : "Tambah Proyek"}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input required value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Judul Proyek" />
          
          <div className="grid grid-cols-2 gap-3">
            <select 
              required 
              value={category} 
              onChange={(e) => setCategory(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <option value="AI">AI</option>
              <option value="WEB">WEB</option>
              <option value="APPS">APPS</option>
            </select>
            <Input type="number" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} placeholder="Urutan (0)" />
          </div>

          <textarea 
            required 
            value={desc} 
            onChange={(e) => setDesc(e.target.value)} 
            placeholder="Deskripsi singkat..." 
            className="w-full h-24 text-sm p-3 rounded-md border border-input focus:ring-2 focus:ring-blue-600 outline-none" 
          />

          <div className="grid grid-cols-2 gap-3">
            <Input value={role} onChange={(e) => setRole(e.target.value)} placeholder="Peran (misal: Solo Developer)" />
            <Input value={metric} onChange={(e) => setMetric(e.target.value)} placeholder="Metrik Dampak (misal: Akurasi 99%)" />
          </div>

          <Input 
            value={technologiesInput} 
            onChange={(e) => setTechnologiesInput(e.target.value)} 
            placeholder="Tech Stack (pisahkan dengan koma: React, PyTorch, RAG)" 
          />

          <div className="grid grid-cols-2 gap-3">
            <Input value={demoUrl} onChange={(e) => setDemoUrl(e.target.value)} placeholder="Link Demo Live" />
            <Input value={viewUrl} onChange={(e) => setViewUrl(e.target.value)} placeholder="Link Code / GitHub" />
          </div>
          
          <div className="space-y-2 p-3 bg-slate-50 border border-slate-200 rounded-xl">
            <label className="text-xs font-bold text-slate-600">Thumbnail Proyek</label>
            {thumbnailUrl && (
              <div className="flex items-center gap-3 bg-white p-2 border rounded-lg mb-2">
                <span className="text-xs truncate text-slate-600">{thumbnailUrl}</span>
                <Button type="button" variant="ghost" size="sm" onClick={() => setThumbnailUrl("")} className="text-red-500 ml-auto h-7 text-xs">Hapus</Button>
              </div>
            )}
            <div className="relative">
              <Input 
                type="file" 
                accept="image/*" 
                onChange={handleImageUpload} 
                disabled={isUploadingImage} 
                className="cursor-pointer file:text-blue-600 file:bg-blue-50 file:border-0 file:rounded-md file:px-3 file:py-1 file:mr-3 file:font-medium text-xs" 
              />
              {isUploadingImage && (
                <div className="absolute inset-0 bg-white/80 flex items-center justify-center rounded-md text-xs font-bold text-blue-600">
                  <Loader2 className="w-4 h-4 animate-spin mr-2" /> Mengunggah...
                </div>
              )}
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button type="submit" disabled={isSubmitting || isUploadingImage} className="flex-1 bg-blue-600 hover:bg-blue-700">
              {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin"/> : "Simpan Proyek"}
            </Button>
            {editingId && <Button type="button" variant="outline" onClick={resetForm}>Batal</Button>}
          </div>
        </form>
      </div>

      <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm space-y-4">
        <h2 className="text-lg font-bold">Daftar Proyek Terdaftar</h2>
        {isLoading ? <p className="text-sm text-slate-400">Loading data...</p> : (
          <div className="grid sm:grid-cols-2 gap-4">
            {projects.map((p) => (
              <div key={p.id} className="border p-4 rounded-xl shadow-sm flex flex-col justify-between">
                <div>
                  {p.thumbnail_url ? (
                    <img src={p.thumbnail_url} className="w-full aspect-video object-cover rounded-lg mb-3" />
                  ) : (
                    <div className="w-full aspect-video bg-slate-100 flex items-center justify-center rounded-lg mb-3">
                      <ImageIcon className="w-6 h-6 text-slate-300"/>
                    </div>
                  )}
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-bold uppercase">{p.category}</span>
                    {p.role && <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">{p.role}</span>}
                  </div>
                  <h3 className="font-bold text-slate-900 leading-tight">{p.title}</h3>
                  <p className="text-xs text-slate-500 line-clamp-2 mt-1">{p.description}</p>
                </div>

                <div className="flex justify-end gap-1 mt-4 border-t pt-3">
                  <Button size="icon" variant="ghost" onClick={() => handleEdit(p)}><Edit3 className="w-4 h-4" /></Button>
                  <Button size="icon" variant="ghost" onClick={() => handleDelete(p.id)} className="text-red-500"><Trash2 className="w-4 h-4" /></Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}