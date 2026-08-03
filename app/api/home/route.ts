import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    let homeData = await prisma.home.findFirst();
    return NextResponse.json(homeData || {});
  } catch (error) {
    return NextResponse.json({ error: "Gagal mengambil data home" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { name, role, value_proposition, photo_url, email } = body;

    let homeData = await prisma.home.findFirst();
    
    if (!homeData) {
      const newHome = await prisma.home.create({
        data: { name, role, value_proposition, photo_url, email },
      });
      return NextResponse.json(newHome);
    }

    const updated = await prisma.home.update({
      where: { id: homeData.id },
      data: { name, role, value_proposition, photo_url, email },
    });

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: "Gagal memperbarui data home" }, { status: 500 });
  }
}