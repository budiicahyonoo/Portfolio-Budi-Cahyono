import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function PUT(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { title, description, category, tags, project_url, github_url, image_url, sort_order, role, metric } = body;

    const technologiesArray = tags ? tags.split(',').map((t: string) => t.trim()).filter(Boolean) : [];

    const updatedProject = await prisma.project.update({
      where: { id },
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

    return NextResponse.json(updatedProject);
  } catch (error) {
    return NextResponse.json({ error: "Gagal memperbarui proyek" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    await prisma.project.delete({
      where: { id },
    });
    return NextResponse.json({ success: true, message: "Proyek berhasil dihapus" });
  } catch (error) {
    return NextResponse.json({ error: "Gagal menghapus proyek" }, { status: 500 });
  }
}