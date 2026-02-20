import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { reviewSchema, reviewApprovalSchema } from "@/lib/validations";
import { z } from "zod";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    let reviews;
    if (session) {
      reviews = await prisma.review.findMany({
        orderBy: { created_at: "desc" },
      });
    } else {
      reviews = await prisma.review.findMany({
        where: { approved: true },
        orderBy: { created_at: "desc" },
      });
    }

    return NextResponse.json(reviews);
  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validation = reviewSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { message: "Validation failed", errors: validation.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { name, rating, message } = validation.data;

    const review = await prisma.review.create({
      data: {
        name,
        rating,
        message,
        approved: false,
      },
    });

    return NextResponse.json(review, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { id, approved } = reviewApprovalSchema.parse(body);

    const review = await prisma.review.update({
      where: { id },
      data: { approved },
    });
    return NextResponse.json(review);
  } catch (error: any) {
    if (error instanceof z.ZodError) {
        return NextResponse.json({ message: "Validation failed", errors: error.flatten().fieldErrors }, { status: 400 });
    }
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
