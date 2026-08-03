"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2, FileText, ImageIcon, Loader2, Eye, Heart, MessageSquare } from "lucide-react";

interface Blog {
  id: string;
  title: string;
  description: string;
  category: string;
  thumbnail_url: string | null;
  content: string | null;
  read_time: number;
  views: number;
  likes: number;
  comments: any[];
}

export function BlogTab() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [content, setContent] = useState("");
  const [readTime, setReadTime] = useState("5");
  const [sortOrder, setSortOrder] = useState("0");

  // State Loading Vercel Blob
  const [isUploadingThumbnail, setIsUploadingThumbnail] = useState(false);
  const [isUploadingContentImage, setIsUploadingContentImage] = useState(false);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    setIsLoading(true);
    const res = await fetch("/api/blog");
    if (res.ok) setBlogs(await res.json());
    setIsLoading(false);
  };

  // Fungsi pintar: Menyisipkan tag gambar langsung ke dalam isi konten paragraf
  const insertImageToContent = (url: string) => {
    const imageTag = `<img src="${url}" alt="Blog Image" class="w-full rounded-xl my-4 object-cover" />`;
    setContent((prev) => prev + "\n" + imageTag);
  };

  // Fungsi Upload Thumbnail Blog
  const handleThumbnailUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    if (file.size > 4 * 1024 * 1024) return alert("⚠️ Maksimal 4MB");

    setIsUploadingThumbnail(true);
    try {
      const res = await fetch(`/api/upload?filename=${encodeURIComponent(file.name)}`, { method: 'POST', body: file });
      const data = await res.json();
      if (data.url) {
        setThumbnailUrl(data.url);
        alert("✅ Cover blog berhasil di-upload!");
      }
    } catch (err) {
      alert("❌ Gagal mengunggah gambar.");
    } finally {
      setIsUploadingThumbnail(false);
    }
  };

  // Fungsi Upload Gambar Sisipan Paragraf
  const handleContentImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    if (file.size > 4 * 1024 * 1024) return alert("⚠️ Maksimal 4MB");

    setIsUploadingContentImage(true);
    try {
      const res = await fetch(`/api/upload?filename=${encodeURIComponent(file.name)}`, { method: 'POST', body: file });
      const data = await res.json();
      if (data.url) {
        insertImageToContent(data.url);
        alert("✅ Gambar berhasil disisipkan ke dalam paragraf!");
      }
    } catch (err) {
      alert("❌ Gagal mengunggah gambar.");
    } finally {
      setIsUploadingContentImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      title,
      description,
      category,
      thumbnail_url: thumbnailUrl || null,
      content,
      read_time: Number(readTime),
      sort_order: Number(sortOrder),
    };

    const res = await fetch("/api/blog", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      fetchBlogs();
      setTitle("");
      setDescription("");
      setCategory("");
      setThumbnailUrl("");
      setContent("");
    } else {
      alert("Gagal mempublish blog!");
    }
    setIsSubmitting(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Hapus artikel ini?")) return;
    const res = await fetch(`/api/blog/${id}`, { method: "DELETE" });
    if (res.ok) fetchBlogs();
  };

  return (
    <div className="grid lg:grid-cols-3 gap-8 items-start animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* FORM BUAT BLOG */}
      <div className="lg:col-span-1 bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm space-y-6">
        <div>
          <h2 className="text-lg font-bold flex items-center gap-2">
            <Plus className="w-5 h-5 text-blue-600" /> Tulis Artikel Baru
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">Publikasikan wawasan dan ceritamu.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input required value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Judul Artikel" />
          
          <div className="grid grid-cols-2 gap-3">
            <select 
              required 
              value={category} 
              onChange={(e) => setCategory(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="" disabled>Pilih Kategori</option>
              <option value="What You Learned">What You Learned</option>
              <option value="How You Built Something">How You Built Something</option>
              <option value="Lessons From Failure">Lessons From Failure</option>
            </select>
            <Input type="number" value={readTime} onChange={(e) => setReadTime(e.target.value)} placeholder="Estimasi Menit" />
          </div>

          <textarea 
            required 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            placeholder="Ringkasan / Abstrak singkat..." 
            className="w-full h-20 text-sm p-3 rounded-md border border-input focus:ring-2 focus:ring-blue-600 outline-none" 
          />

          {/* COVER THUMBNAIL (VERCEL BLOB) */}
          <div className="space-y-2 p-3 bg-slate-50 border border-slate-200 rounded-xl">
            <label className="text-xs font-bold text-slate-600">Gambar Cover Utama</label>
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
                onChange={handleThumbnailUpload} 
                disabled={isUploadingThumbnail} 
                className="cursor-pointer file:text-blue-600 file:bg-blue-50 file:border-0 file:rounded-md file:px-3 file:py-1 file:mr-3 file:font-medium" 
              />
              {isUploadingThumbnail && (
                <div className="absolute inset-0 bg-white/80 flex items-center justify-center rounded-md text-xs font-bold text-blue-600">
                  <Loader2 className="w-4 h-4 animate-spin mr-2" /> Mengunggah...
                </div>
              )}
            </div>
          </div>

          {/* KONTEN UTAMA DENGAN SISIPAN GAMBAR */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold text-slate-600">Isi Konten (HTML / Paragraf)</label>
            </div>
            
            {/* Tombol Pintas Upload Gambar ke Dalam Paragraf (VERCEL BLOB) */}
            <div className="p-3 bg-slate-50 border border-dashed border-slate-300 rounded-xl space-y-2 relative">
              <p className="text-[11px] text-slate-500 font-medium">Sisipkan gambar di sela paragraf:</p>
              <Input 
                type="file" 
                accept="image/*" 
                onChange={handleContentImageUpload} 
                disabled={isUploadingContentImage} 
                className="cursor-pointer text-xs file:text-blue-600 file:bg-blue-50 file:border-0 file:rounded-md file:px-2 file:py-1 file:mr-2 file:font-medium" 
              />
              {isUploadingContentImage && (
                <div className="absolute inset-0 bg-white/90 flex items-center justify-center rounded-xl text-xs font-bold text-slate-700 z-10">
                  <Loader2 className="w-4 h-4 animate-spin mr-2" /> Menyisipkan gambar...
                </div>
              )}
            </div>

            <textarea 
              value={content} 
              onChange={(e) => setContent(e.target.value)} 
              placeholder="Tulis paragraf artikel di sini... (atau gunakan tag HTML sederhana)" 
              className="w-full h-40 text-sm p-3 rounded-md border border-input focus:ring-2 focus:ring-blue-600 outline-none font-mono" 
            />
          </div>

          <Button type="submit" disabled={isSubmitting || isUploadingThumbnail || isUploadingContentImage} className="w-full bg-blue-600 hover:bg-blue-700">
            {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Publish Artikel"}
          </Button>
        </form>
      </div>

      {/* LIST BLOG AKTIF */}
      <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm space-y-4">
        <h2 className="text-lg font-bold">Daftar Artikel Terpublikasi</h2>
        {isLoading ? (
          <p className="text-sm text-slate-400">Loading...</p>
        ) : blogs.length === 0 ? (
          <div className="h-48 border-2 border-dashed border-slate-200 rounded-xl flex items-center justify-center text-slate-400 text-sm">
            Belum ada artikel blog.
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {blogs.map((blog) => (
              <div key={blog.id} className="border p-4 rounded-xl flex flex-col sm:flex-row gap-4 shadow-sm items-start justify-between">
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-bold uppercase">{blog.category}</span>
                    <span className="text-xs text-slate-400">{blog.read_time} menit baca</span>
                  </div>
                  <h3 className="font-bold text-lg">{blog.title}</h3>
                  <p className="text-xs text-slate-500 line-clamp-2">{blog.description}</p>
                  
                  {/* Statistik Pengunjung */}
                  <div className="flex items-center gap-4 pt-2 text-xs text-slate-400 font-medium">
                    <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" /> {blog.views} Views</span>
                    <span className="flex items-center gap-1"><Heart className="w-3.5 h-3.5 text-red-500" /> {blog.likes} Likes</span>
                    <span className="flex items-center gap-1"><MessageSquare className="w-3.5 h-3.5" /> {blog.comments?.length || 0} Komentar</span>
                  </div>
                </div>

                <Button size="icon" variant="ghost" onClick={() => handleDelete(blog.id)} className="text-red-500 hover:bg-red-50 self-end sm:self-start">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}