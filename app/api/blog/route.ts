import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const blogs = await prisma.blog.findMany({
      orderBy: { sort_order: "asc" },
      // Tarik juga relasi komentar jika ada
      include: { comments: true },
    });
    return NextResponse.json(blogs);
  } catch (error) {
    console.error("GET Blog Error:", error); // Akan mencetak detail error di terminal
    return NextResponse.json({ error: "Gagal mengambil data blog" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description, category, thumbnail_url, content, read_time, sort_order } = body;

    const newBlog = await prisma.blog.create({
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

    return NextResponse.json(newBlog);
  } catch (error) {
    console.error("POST Blog Error:", error);
    return NextResponse.json({ error: "Gagal membuat blog baru" }, { status: 500 });
  }
}