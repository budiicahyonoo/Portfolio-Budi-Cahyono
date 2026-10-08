import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// ==========================================
// 1. FUNGSI GET (Mengambil Data Proyek)
// ==========================================
export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { sort_order: "asc" },
    });

    // Melakukan mapping properti agar kompatibel dengan sistem lama & baru
    const formattedProjects = projects.map(p => ({
      id: p.id,
      title: p.title,
      description: p.description,
      category: p.category,
      technologies: p.technologies,
      tags: p.technologies.join(', '), // Mengubah array menjadi string koma
      demo_url: p.demo_url,
      project_url: p.demo_url, // Alias untuk sistem lama/baru
      view_url: p.view_url,
      github_url: p.view_url,   // Alias untuk sistem lama/baru
      thumbnail_url: p.thumbnail_url, // Properti Baru
      image_url: p.thumbnail_url,     // Properti Lama (Kompatibilitas balik)
      sort_order: p.sort_order,
      role: p.role,
      metric: p.metric,
    }));

    return NextResponse.json(formattedProjects);
  } catch (error) {
    console.error("Error GET Projects:", error);
    return NextResponse.json({ error: "Gagal mengambil data proyek" }, { status: 500 });
  }
}

// ==========================================
// 2. FUNGSI POST (Menambahkan Proyek Baru)
// ==========================================
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { 
      title, 
      description, 
      category, 
      tags, 
      project_url, 
      github_url, 
      image_url, // Menerima image_url dari frontend
      sort_order, 
      role, 
      metric 
    } = body;

    // Mengubah string "react, nextjs" menjadi array ["react", "nextjs"]
    const technologiesArray = tags 
      ? tags.split(',').map((t: string) => t.trim()).filter(Boolean) 
      : [];

    const newProject = await prisma.project.create({
      data: {
        title,
        description,
        category,
        technologies: technologiesArray,
        demo_url: project_url || null,
        view_url: github_url || null,
        thumbnail_url: image_url || null, // Disimpan ke kolom database 'thumbnail_url'
        sort_order: Number(sort_order) || 0,
        role: role || null,
        metric: metric || null,
      },
    });

    return NextResponse.json(newProject);
  } catch (error) {
    console.error("Error POST Projects:", error);
    return NextResponse.json({ error: "Gagal menambahkan proyek" }, { status: 500 });
  }
}
