"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2, Edit3, Globe, Github as GitIcon, ImageIcon, Loader2 } from "lucide-react";

interface Project {
  id: string; title: string; description: string; category: string;
  tags: string; project_url: string | null; github_url: string | null;
  image_url: string | null; sort_order: number;
}

export function ProjectsTab() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form State
  const [title, setTitle] = useState(""); const [desc, setDesc] = useState("");
  const [category, setCategory] = useState(""); const [tags, setTags] = useState("");
  const [url, setUrl] = useState(""); const [githubUrl, setGithubUrl] = useState("");
  const [imageUrl, setImageUrl] = useState(""); const [sortOrder, setSortOrder] = useState("0");

  const [isUploadingImage, setIsUploadingImage] = useState(false);

  useEffect(() => { fetchProjects(); }, []);

  const fetchProjects = async () => {
    setIsLoading(true);
    const res = await fetch("/api/projects");
    if (res.ok) setProjects(await res.json());
    setIsLoading(false);
  };

  const resetForm = () => {
    setEditingId(null); setTitle(""); setDesc(""); setCategory("");
    setTags(""); setUrl(""); setGithubUrl(""); setImageUrl(""); setSortOrder("0");
  };

  const handleEdit = (p: Project) => {
    setEditingId(p.id); setTitle(p.title); setDesc(p.description); setCategory(p.category);
    setTags(p.tags); setUrl(p.project_url || ""); setGithubUrl(p.github_url || "");
    setImageUrl(p.image_url || ""); setSortOrder(String(p.sort_order));
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
        setImageUrl(data.url);
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
    const payload = { title, description: desc, category, tags, project_url: url || null, github_url: githubUrl || null, image_url: imageUrl || null, sort_order: Number(sortOrder) };
    const endpoint = editingId ? `/api/projects/${editingId}` : "/api/projects";
    const res = await fetch(endpoint, { method: editingId ? "PUT" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    if (res.ok) { fetchProjects(); resetForm(); } else alert("Gagal menyimpan!");
    setIsSubmitting(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Hapus proyek?")) return;
    const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
    if (res.ok) fetchProjects();
  };

  return (
    <div className="grid lg:grid-cols-3 gap-8 items-start animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="lg:col-span-1 bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm space-y-6">
        <div>
          <h2 className="text-lg font-bold flex items-center gap-2">{editingId ? <Edit3 className="w-5 h-5 text-blue-600"/> : <Plus className="w-5 h-5 text-blue-600"/>} {editingId ? "Edit Proyek" : "Tambah Proyek"}</h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input required value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Judul Proyek" />
          <div className="grid grid-cols-2 gap-3">
            <select 
              required 
              value={category} 
              onChange={(e) => setCategory(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="" disabled>Pilih Kategori</option>
              <option value="AI">AI</option>
              <option value="WEB">WEB</option>
              <option value="APPS">APPS</option>
            </select>
            <Input type="number" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} placeholder="Urutan (0)" />
          </div>
          <textarea required value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Deskripsi..." className="w-full h-24 text-sm p-3 rounded-md border border-input focus:ring-2 focus:ring-blue-600 outline-none" />
          <Input value={tags} onChange={(e) => setTags(e.target.value)} placeholder="Tags (pisahkan koma)" />
          <Input value={githubUrl} onChange={(e) => setGithubUrl(e.target.value)} placeholder="Link GitHub" />
          <Input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="Link Demo" />
          
          <div className="space-y-2 p-3 bg-slate-50 border border-slate-200 rounded-xl">
            <label className="text-xs font-bold text-slate-600">Foto Proyek</label>
            {imageUrl && (
              <div className="flex items-center gap-3 bg-white p-2 border rounded-lg mb-2">
                <span className="text-xs truncate text-slate-600">{imageUrl}</span>
                <Button type="button" variant="ghost" size="sm" onClick={() => setImageUrl("")} className="text-red-500 ml-auto h-7 text-xs">Hapus</Button>
              </div>
            )}
            <div className="relative">
              <Input 
                type="file" 
                accept="image/*" 
                onChange={handleImageUpload} 
                disabled={isUploadingImage} 
                className="cursor-pointer file:text-blue-600 file:bg-blue-50 file:border-0 file:rounded-md file:px-3 file:py-1 file:mr-3 file:font-medium" 
              />
              {isUploadingImage && (
                <div className="absolute inset-0 bg-white/80 flex items-center justify-center rounded-md text-xs font-bold text-blue-600">
                  <Loader2 className="w-4 h-4 animate-spin mr-2" /> Mengunggah...
                </div>
              )}
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button type="submit" disabled={isSubmitting || isUploadingImage} className="flex-1 bg-blue-600 hover:bg-blue-700">{isSubmitting ? <Loader2 className="w-4 h-4 animate-spin"/> : "Simpan"}</Button>
            {editingId && <Button type="button" variant="outline" onClick={resetForm}>Batal</Button>}
          </div>
        </form>
      </div>

      <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm space-y-4">
        <h2 className="text-lg font-bold">Daftar Proyek</h2>
        {isLoading ? <p className="text-sm text-slate-400">Loading...</p> : (
          <div className="grid sm:grid-cols-2 gap-4">
            {projects.map((p) => (
              <div key={p.id} className="border p-4 rounded-xl shadow-sm">
                {p.image_url ? <img src={p.image_url} className="w-full aspect-video object-cover rounded-lg mb-3" /> : <div className="w-full aspect-video bg-slate-100 flex items-center justify-center rounded-lg mb-3"><ImageIcon className="w-6 h-6 text-slate-300"/></div>}
                <span className="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-bold uppercase">{p.category}</span>
                <h3 className="font-bold mt-1 line-clamp-1">{p.title}</h3>
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