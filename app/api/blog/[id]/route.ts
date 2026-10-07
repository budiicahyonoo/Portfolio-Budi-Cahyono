import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function PUT(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { title, description, category, thumbnail_url, content, read_time, sort_order } = body;

    const updatedBlog = await prisma.blog.update({
      where: { id },
      data: {
        title,
        description,
        category,
        thumbnail_url: thumbnail_url || null,
        content: content || null,
        read_time: Number(read_time) || 5,
        sort_order: Number(sort_order) || 0,
      },
    });

    return NextResponse.json(updatedBlog);
  } catch (error) {
    console.error("PUT Blog Error:", error);
    return NextResponse.json({ error: "Failed to update blog" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    await prisma.blog.delete({ where: { id } });
    return NextResponse.json({ success: true, message: "Blog deleted successfully" });
  } catch (error) {
    console.error("DELETE Blog Error:", error);
    return NextResponse.json({ error: "Failed to delete blog" }, { status: 500 });
  }
}