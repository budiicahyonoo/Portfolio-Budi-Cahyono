import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { sort_order: "asc" },
    });
    
    const formattedProjects = projects.map(p => ({
      id: p.id,
      title: p.title,
      description: p.description,
      category: p.category,
      tags: p.technologies.join(', '),
      project_url: p.demo_url,
      github_url: p.view_url,
      image_url: p.thumbnail_url,
      sort_order: p.sort_order,
      role: p.role,
      metric: p.metric,
    }));

    return NextResponse.json(formattedProjects);
  } catch (error) {
    return NextResponse.json({ error: "Gagal mengambil data proyek" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description, category, tags, project_url, github_url, image_url, sort_order, role, metric } = body;

    const technologiesArray = tags ? tags.split(',').map((t: string) => t.trim()).filter(Boolean) : [];

    const newProject = await prisma.project.create({
      data: {
        title,
        description,
        category,
        technologies: technologiesArray,
        demo_url: project_url || null,
        view_url: github_url || null,
        thumbnail_url: image_url || null,
        sort_order: Number(sort_order) || 0,
        role: role || null,
        metric: metric || null,
      },
    });

    return NextResponse.json(newProject);
  } catch (error) {
    console.error("Error POST:", error);
    return NextResponse.json({ error: "Gagal menambahkan proyek" }, { status: 500 });
  }
}