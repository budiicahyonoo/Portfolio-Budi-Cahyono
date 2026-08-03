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
    }));

    return NextResponse.json(formattedExperiences);
  } catch (error) {
    return NextResponse.json({ error: "Gagal mengambil data experience" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description, category, tags, image_url, date_start, date_end, sort_order } = body;

    const technologiesArray = tags ? tags.split(',').map((t: string) => t.trim()).filter(Boolean) : [];

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
      },
    });

    return NextResponse.json(newExperience);
  } catch (error) {
    console.error("Error POST Experience:", error);
    return NextResponse.json({ error: "Gagal menambahkan experience" }, { status: 500 });
  }
}