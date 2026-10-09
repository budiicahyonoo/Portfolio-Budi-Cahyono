import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const experiences = await prisma.experience.findMany({
      orderBy: { sort_order: "asc" },
    });
    
    const formattedExperiences = experiences.map(e => ({
      id: e.id,
      title: e.title,
      description: e.description,
      category: e.category,
      tags: e.technologies.join(', '), 
      image_url: e.thumbnail_url,
      date_start: e.date_start,
      date_end: e.date_end,
      sort_order: e.sort_order,
      achievements: e.achievements ? e.achievements.join('\n') : '', 
      demo_url: e.demo_url,
      view_url: e.view_url,
    }));

    return NextResponse.json(formattedExperiences);
  } catch (error) {
    return NextResponse.json({ error: "Gagal mengambil data experience" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description, category, tags, image_url, date_start, date_end, sort_order, achievements, demo_url, view_url, work_photos } = body;

    const technologiesArray = tags ? tags.split(',').map((t: string) => t.trim()).filter(Boolean) : [];
    const achievementsArray = achievements ? achievements.split('\n').map((a: string) => a.trim()).filter(Boolean) : [];
    const workPhotosArray = work_photos ? work_photos.split(',').map((p: string) => p.trim()).filter(Boolean) : [];

    const newExperience = await prisma.experience.create({
      data: {
        title,
        description,
        category,
        technologies: technologiesArray,
        thumbnail_url: image_url || null,
        date_start: date_start ? new Date(date_start) : null,
        date_end: date_end ? new Date(date_end) : null,
        sort_order: Number(sort_order) || 0,
        achievements: achievementsArray,
        demo_url: demo_url || null,
        view_url: view_url || null,
      },
    });

    return NextResponse.json(newExperience);
  } catch (error) {
    console.error("Error POST Experience:", error);
    return NextResponse.json({ error: "Gagal menambahkan experience" }, { status: 500 });
  }
}