import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    const images = await prisma.galleryImage.findMany({
      orderBy: { created_at: "desc" },
    });
    return NextResponse.json(images);
  } catch (error) {
    console.error("GET_GALLERY_ERROR", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { url, caption, category } = body;

    if (!url) {
      return NextResponse.json({ message: "URL is required" }, { status: 400 });
    }

    const image = await prisma.galleryImage.create({
      data: { url, caption, category },
    });

    return NextResponse.json(image, { status: 201 });
  } catch (error) {
    console.error("POST_GALLERY_ERROR", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
