"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Plus,
  Trash2,
  Edit3,
  ImageIcon,
  Loader2,
} from "lucide-react";

interface Project {
  id: string;
  title: string;
  description: string;
  category: string;

  thumbnail_url: string | null;
  image_url: string | null;

  demo_url: string | null;
  project_url: string | null;

  view_url: string | null;
  github_url: string | null;

  technologies: string[] | string;
  tags: string | null;

  role: string | null;
  metric: string | null;
  sort_order: number;
}

export function ProjectsTab() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // =========================
  // FORM STATE
  // =========================

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

  // =========================
  // GET PROJECTS
  // =========================

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setIsLoading(true);

    try {
      const res = await fetch("/api/projects", {
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error("Gagal mengambil data proyek");
      }

      const data = await res.json();

      setProjects(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Gagal mengambil daftar proyek:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // =========================
  // RESET FORM
  // =========================

  const resetForm = () => {
    setEditingId(null);
    setTitle("");
    setDesc("");
    setCategory("AI");
    setTechnologiesInput("");
    setDemoUrl("");
    setViewUrl("");
    setThumbnailUrl("");
    setRole("");
    setMetric("");
    setSortOrder("0");
  };

  // =========================
  // EDIT PROJECT
  // =========================

  const handleEdit = (p: Project) => {
    setEditingId(p.id);

    setTitle(p.title || "");
    setDesc(p.description || "");
    setCategory(p.category || "AI");

    // =========================
    // TECH TOOLS
    // =========================

    if (Array.isArray(p.technologies)) {
      setTechnologiesInput(p.technologies.join(", "));
    } else if (typeof p.technologies === "string") {
      setTechnologiesInput(p.technologies);
    } else if (p.tags) {
      setTechnologiesInput(p.tags);
    } else {
      setTechnologiesInput("");
    }

    // =========================
    // LINK DEMO
    // =========================

    setDemoUrl(
      p.project_url ||
        p.demo_url ||
        ""
    );

    // =========================
    // LINK GITHUB
    // =========================

    setViewUrl(
      p.github_url ||
        p.view_url ||
        ""
    );

    // =========================
    // THUMBNAIL
    // =========================

    setThumbnailUrl(
      p.thumbnail_url ||
        p.image_url ||
        ""
    );

    // =========================
    // OTHER FIELDS
    // =========================

    setRole(p.role || "");
    setMetric(p.metric || "");
    setSortOrder(String(p.sort_order ?? 0));

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =========================
  // IMAGE UPLOAD
  // =========================

  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (
      !e.target.files ||
      e.target.files.length === 0
    ) {
      return;
    }

    const file = e.target.files[0];

    if (file.size > 4 * 1024 * 1024) {
      alert("⚠️ Maksimal 4MB");
      e.target.value = "";
      return;
    }

    setIsUploadingImage(true);

    try {
      const res = await fetch(
        `/api/upload?filename=${encodeURIComponent(
          file.name
        )}`,
        {
          method: "POST",
          body: file,
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data?.error ||
            "Gagal mengunggah gambar"
        );
      }

      if (data.url) {
        setThumbnailUrl(data.url);
        alert(
          "✅ Foto proyek berhasil di-upload!"
        );
      } else {
        throw new Error(
          "URL gambar tidak ditemukan"
        );
      }
    } catch (error) {
      console.error(
        "Gagal mengunggah gambar:",
        error
      );

      alert(
        error instanceof Error
          ? `❌ ${error.message}`
          : "❌ Gagal mengunggah gambar."
      );
    } finally {
      setIsUploadingImage(false);
      e.target.value = "";
    }
  };

  // =========================
  // SUBMIT / CREATE / UPDATE
  // =========================

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (isUploadingImage) {
      alert(
        "⏳ Tunggu sampai gambar selesai di-upload."
      );
      return;
    }

    setIsSubmitting(true);

    /*
     * API /api/projects dan /api/projects/[id]
     * membaca:
     *
     * tags
     * project_url
     * github_url
     * image_url / thumbnail_url
     *
     * Jadi payload harus menggunakan nama
     * field tersebut.
     */

    const payload = {
      title: title.trim(),
      description: desc.trim(),
      category,

      // Tech Tools
      tags: technologiesInput.trim() || null,

      // Demo
      project_url: demoUrl.trim() || null,

      // GitHub
      github_url: viewUrl.trim() || null,

      // Image
      thumbnail_url:
        thumbnailUrl.trim() || null,

      image_url:
        thumbnailUrl.trim() || null,

      // Other
      role: role.trim() || null,
      metric: metric.trim() || null,
      sort_order: Number(sortOrder) || 0,
    };

    const endpoint = editingId
      ? `/api/projects/${editingId}`
      : "/api/projects";

    try {
      const res = await fetch(endpoint, {
        method: editingId ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(
          data?.error ||
            data?.message ||
            "Gagal menyimpan proyek"
        );
      }

      await fetchProjects();

      resetForm();

      alert(
        editingId
          ? "✅ Proyek berhasil diperbarui!"
          : "✅ Proyek berhasil ditambahkan!"
      );
    } catch (error) {
      console.error(
        "Gagal menyimpan proyek:",
        error
      );

      alert(
        error instanceof Error
          ? `❌ ${error.message}`
          : "❌ Gagal menyimpan proyek."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // =========================
  // DELETE
  // =========================

  const handleDelete = async (id: string) => {
    if (
      !confirm(
        "Apakah Anda yakin ingin menghapus proyek ini?"
      )
    ) {
      return;
    }

    try {
      const res = await fetch(
        `/api/projects/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(
          data?.error ||
            data?.message ||
            "Gagal menghapus proyek"
        );
      }

      await fetchProjects();

      if (editingId === id) {
        resetForm();
      }

      alert("✅ Proyek berhasil dihapus!");
    } catch (error) {
      console.error(
        "Gagal menghapus proyek:",
        error
      );

      alert(
        error instanceof Error
          ? `❌ ${error.message}`
          : "❌ Gagal menghapus proyek."
      );
    }
  };

  // =========================
  // RENDER
  // =========================

  return (
    <div className="grid lg:grid-cols-3 gap-8 items-start animate-in fade-in slide-in-from-bottom-4 duration-500">

      {/* =====================================
          FORM
      ====================================== */}

      <div className="lg:col-span-1 bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm space-y-6">

        <div>
          <h2 className="text-lg font-bold flex items-center gap-2 text-slate-900">
            {editingId ? (
              <Edit3 className="w-5 h-5 text-blue-600" />
            ) : (
              <Plus className="w-5 h-5 text-blue-600" />
            )}

            {editingId
              ? "Edit Proyek"
              : "Tambah Proyek"}
          </h2>

          <p className="text-xs text-slate-500 mt-1">
            {editingId
              ? "Edit data proyek yang sudah tersimpan."
              : "Tambahkan proyek baru ke portfolio."}
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          {/* TITLE */}

          <Input
            required
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            placeholder="Judul Proyek"
          />

          {/* CATEGORY + SORT */}

          <div className="grid grid-cols-2 gap-3">
            <select
              required
              value={category}
              onChange={(e) =>
                setCategory(e.target.value)
              }
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring text-slate-900"
            >
              <option value="AI">
                AI
              </option>

              <option value="WEB">
                WEB
              </option>

              <option value="APPS">
                APPS
              </option>
            </select>

            <Input
              type="number"
              value={sortOrder}
              onChange={(e) =>
                setSortOrder(e.target.value)
              }
              placeholder="Urutan (0)"
            />
          </div>

          {/* DESCRIPTION */}

          <textarea
            required
            value={desc}
            onChange={(e) =>
              setDesc(e.target.value)
            }
            placeholder="Deskripsi singkat..."
            className="w-full h-24 text-sm p-3 rounded-md border border-input focus:ring-2 focus:ring-blue-600 outline-none text-slate-900 bg-background resize-none"
          />

          {/* ROLE + METRIC */}

          <div className="grid grid-cols-2 gap-3">
            <Input
              value={role}
              onChange={(e) =>
                setRole(e.target.value)
              }
              placeholder="Peran (misal: Solo Developer)"
            />

            <Input
              value={metric}
              onChange={(e) =>
                setMetric(e.target.value)
              }
              placeholder="Metrik Dampak (misal: Akurasi 99%)"
            />
          </div>

          {/* TECH TOOLS */}

          <Input
            value={technologiesInput}
            onChange={(e) =>
              setTechnologiesInput(
                e.target.value
              )
            }
            placeholder="Tech Stack (pisahkan dengan koma: React, PyTorch, RAG)"
          />

          <p className="text-[11px] text-slate-400 -mt-2">
            Pisahkan setiap teknologi dengan koma.
          </p>

          {/* DEMO + GITHUB */}

          <div className="grid grid-cols-2 gap-3">

            <Input
              value={demoUrl}
              onChange={(e) =>
                setDemoUrl(e.target.value)
              }
              placeholder="Link Demo Live"
            />

            <Input
              value={viewUrl}
              onChange={(e) =>
                setViewUrl(e.target.value)
              }
              placeholder="Link Code / GitHub"
            />

          </div>

          {/* THUMBNAIL */}

          <div className="space-y-2 p-3 bg-slate-50 border border-slate-200 rounded-xl">

            <label className="text-xs font-bold text-slate-600 flex items-center gap-2">
              <ImageIcon className="w-4 h-4" />
              Thumbnail Proyek
            </label>

            {thumbnailUrl && (
              <div className="flex items-center gap-3 bg-white p-2 border rounded-lg mb-2">

                <span className="text-xs truncate text-slate-600 max-w-[180px]">
                  {thumbnailUrl}
                </span>

                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    setThumbnailUrl("")
                  }
                  className="text-red-500 ml-auto h-7 text-xs hover:bg-red-50"
                >
                  Hapus
                </Button>

              </div>
            )}

            <div className="relative">

              <Input
                type="file"
                accept="image/*"
                onChange={
                  handleImageUpload
                }
                disabled={
                  isUploadingImage
                }
                className="cursor-pointer file:text-blue-600 file:bg-blue-50 file:border-0 file:rounded-md file:px-3 file:py-1 file:mr-3 file:font-medium text-xs text-slate-600"
              />

              {isUploadingImage && (
                <div className="absolute inset-0 bg-white/80 flex items-center justify-center rounded-md text-xs font-bold text-blue-600">
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Mengunggah...
                </div>
              )}

            </div>

          </div>

          {/* BUTTONS */}

          <div className="flex gap-2 pt-2">

            <Button
              type="submit"
              disabled={
                isSubmitting ||
                isUploadingImage
              }
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
            >
              {isSubmitting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : editingId ? (
                "Update Proyek"
              ) : (
                "Simpan Proyek"
              )}
            </Button>

            {editingId && (
              <Button
                type="button"
                variant="outline"
                onClick={resetForm}
                className="text-slate-700"
              >
                Batal
              </Button>
            )}

          </div>

        </form>
      </div>

      {/* =====================================
          PROJECT LIST
      ====================================== */}

      <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm space-y-4">

        <div>
          <h2 className="text-lg font-bold text-slate-900">
            Daftar Proyek Terdaftar
          </h2>

          <p className="text-xs text-slate-500 mt-1">
            {projects.length} proyek terdaftar
          </p>
        </div>

        {isLoading ? (

          <div className="flex items-center justify-center min-h-[200px]">
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <Loader2 className="w-4 h-4 animate-spin" />
              Loading data proyek...
            </div>
          </div>

        ) : projects.length === 0 ? (

          <div className="flex flex-col items-center justify-center min-h-[200px] rounded-xl border border-dashed border-slate-300 text-center">

            <ImageIcon className="w-8 h-8 text-slate-300 mb-3" />

            <p className="text-sm font-medium text-slate-600">
              Belum ada proyek
            </p>

            <p className="text-xs text-slate-400 mt-1">
              Tambahkan proyek menggunakan form di sebelah kiri.
            </p>

          </div>

        ) : (

          <div className="grid sm:grid-cols-2 gap-4">

            {projects.map((p) => {

              const displayImage =
                p.thumbnail_url ||
                p.image_url;

              return (
                <div
                  key={p.id}
                  className="border p-4 rounded-xl shadow-sm flex flex-col justify-between"
                >

                  <div>

                    {/* IMAGE */}

                    {displayImage ? (

                      <img
                        src={displayImage}
                        alt={p.title}
                        className="w-full aspect-video object-cover rounded-lg mb-3"
                      />

                    ) : (

                      <div className="w-full aspect-video bg-slate-100 flex items-center justify-center rounded-lg mb-3">
                        <ImageIcon className="w-6 h-6 text-slate-300" />
                      </div>

                    )}

                    {/* CATEGORY + ROLE */}

                    <div className="flex items-center gap-2 mb-1">

                      <span className="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-bold uppercase">
                        {p.category}
                      </span>

                      {p.role && (
                        <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
                          {p.role}
                        </span>
                      )}

                    </div>

                    {/* TITLE */}

                    <h3 className="font-bold text-slate-900 leading-tight">
                      {p.title}
                    </h3>

                    {/* DESCRIPTION */}

                    <p className="text-xs text-slate-500 line-clamp-2 mt-1">
                      {p.description}
                    </p>

                    {/* TECH STACK */}

                    {Array.isArray(p.technologies) &&
                      p.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-3">
                          {p.technologies
                            .slice(0, 4)
                            .map(
                              (
                                tech,
                                index
                              ) => (
                                <span
                                  key={`${tech}-${index}`}
                                  className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded"
                                >
                                  {tech}
                                </span>
                              )
                            )}

                          {p.technologies
                            .length > 4 && (
                            <span className="text-[10px] bg-slate-100 text-slate-400 px-2 py-0.5 rounded">
                              +
                              {p
                                .technologies
                                .length -
                                4}
                            </span>
                          )}
                        </div>
                      )}

                  </div>

                  {/* ACTIONS */}

                  <div className="flex justify-end gap-1 mt-4 border-t pt-3">

                    <Button
                      type="button"
                      size="icon"
                      variant="ghost"
                      onClick={() =>
                        handleEdit(p)
                      }
                      className="text-slate-600 hover:bg-slate-50"
                      title="Edit proyek"
                    >
                      <Edit3 className="w-4 h-4" />
                    </Button>

                    <Button
                      type="button"
                      size="icon"
                      variant="ghost"
                      onClick={() =>
                        handleDelete(p.id)
                      }
                      className="text-red-500 hover:bg-red-50"
                      title="Hapus proyek"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>

                  </div>

                </div>
              );
            })}

          </div>

        )}

      </div>
    </div>
  );
}