import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function PUT(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { title, description, category, tags, image_url, date_start, date_end, sort_order, achievements, demo_url, view_url, work_photos } = body;

    const technologiesArray = tags ? tags.split(',').map((t: string) => t.trim()).filter(Boolean) : [];
    const achievementsArray = achievements ? achievements.split('\n').map((a: string) => a.trim()).filter(Boolean) : [];
    const workPhotosArray = work_photos ? work_photos.split(',').map((p: string) => p.trim()).filter(Boolean) : [];

    const updatedExperience = await prisma.experience.update({
      where: { id },
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
        work_photos: workPhotosArray,
      },
    });

    return NextResponse.json(updatedExperience);
  } catch (error) {
    return NextResponse.json({ error: "Gagal memperbarui experience" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    await prisma.experience.delete({
      where: { id },
    });
    return NextResponse.json({ success: true, message: "Experience berhasil dihapus" });
  } catch (error) {
    return NextResponse.json({ error: "Gagal menghapus experience" }, { status: 500 });
  }
}