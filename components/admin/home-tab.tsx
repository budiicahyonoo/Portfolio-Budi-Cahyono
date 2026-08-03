"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, User, UploadCloud } from "lucide-react";

export function HomeTab() {
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false); // Status khusus untuk tombol upload
  
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [valueProp, setValueProp] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    fetch("/api/home")
      .then((res) => res.json())
      .then((data) => {
        if (data.id) {
          setName(data.name || "");
          setRole(data.role || "");
          setValueProp(data.value_proposition || "");
          setPhotoUrl(data.photo_url || "");
          setEmail(data.email || "");
        }
        setLoading(false);
      });
  }, []);

  // FUNGSI UPLOAD MANUAL KE VERCEL BLOB
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];

    // Validasi ukuran max 4MB
    if (file.size > 4 * 1024 * 1024) {
      alert("⚠️ Ukuran file maksimal 4MB");
      return;
    }

    setUploading(true);
    try {
      const response = await fetch(`/api/upload?filename=${encodeURIComponent(file.name)}`, {
        method: 'POST',
        body: file,
      });

      const newBlob = await response.json();
      
      if (newBlob.url) {
        setPhotoUrl(newBlob.url);
        alert("✅ Foto berhasil di-upload!");
      } else {
        alert("❌ Gagal mendapatkan URL dari server.");
      }
    } catch (error) {
      alert("❌ Terjadi kesalahan saat mengunggah foto.");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const res = await fetch("/api/home", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, role, value_proposition: valueProp, photo_url: photoUrl, email }),
    });
    if (res.ok) {
      alert("✅ Profil Home berhasil diperbarui!");
    } else {
      alert("❌ Gagal memperbarui profil.");
    }
    setSubmitting(false);
  };

  if (loading) return <p className="text-sm text-slate-400">Loading data profil...</p>;

  return (
    <div className="grid lg:grid-cols-2 gap-8 items-start animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm space-y-6">
        <div>
          <h2 className="text-lg font-bold flex items-center gap-2">
            <User className="w-5 h-5 text-blue-600" /> Pengaturan Profil Home
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">Atur tampilan awal yang muncul di hero section.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-600">Nama Lengkap</label>
            <Input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Contoh: Budi Cahyono" />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-600">Role / Profesi</label>
            <Input required value={role} onChange={(e) => setRole(e.target.value)} placeholder="Contoh: AI Engineer" />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-600">Email Utama</label>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email@domain.com" />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-600">Value Proposition (Tagline)</label>
            <textarea 
              value={valueProp} 
              onChange={(e) => setValueProp(e.target.value)} 
              placeholder="Deskripsi singkat yang menjual..."
              className="w-full h-24 text-sm p-3 rounded-md border border-input focus:ring-2 focus:ring-blue-600 outline-none"
            />
          </div>

          {/* AREA UPLOAD FOTO (VERCEL BLOB) */}
          <div className="space-y-2 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <label className="text-xs font-bold text-slate-600">Foto Profil Utama</label>
            
            {photoUrl && (
              <div className="flex items-center gap-3 bg-white p-2 border rounded-lg mb-3">
                <img src={photoUrl} className="w-10 h-10 rounded-full object-cover border" alt="Preview" />
                <span className="text-xs text-slate-500 truncate">{photoUrl}</span>
                <Button type="button" variant="ghost" size="sm" onClick={() => setPhotoUrl("")} className="text-red-500 ml-auto h-7 text-xs">Hapus</Button>
              </div>
            )}

            <div className="relative">
              <Input 
                type="file" 
                accept="image/*"
                onChange={handleFileUpload}
                disabled={uploading}
                className="cursor-pointer file:text-blue-600 file:bg-blue-50 file:border-0 file:rounded-md file:px-3 file:py-1 file:mr-3 file:font-medium"
              />
              {uploading && (
                <div className="absolute inset-0 bg-white/80 flex items-center justify-center rounded-md text-sm font-bold text-blue-600">
                  <Loader2 className="w-4 h-4 animate-spin mr-2" /> Mengunggah... Mohon tunggu
                </div>
              )}
            </div>
          </div>

          <Button type="submit" disabled={submitting || uploading} className="w-full bg-blue-600 hover:bg-blue-700 mt-4">
            {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Simpan Profil"}
          </Button>
        </form>
      </div>
    </div>
  );
}