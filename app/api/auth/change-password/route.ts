import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { z } from "zod";

const passwordSchema = z.string().min(8).regex(/[A-Z]/, "Must contain at least one uppercase letter").regex(/[0-9]/, "Must contain at least one number");

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { password } = await req.json();

    // Validate complexity
    const validation = passwordSchema.safeParse(password);
    if (!validation.success) {
        return NextResponse.json({ message: validation.error.errors[0].message }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.update({
      where: { username: (session.user as any).username },
      data: {
        password_hash: hashedPassword,
        must_change_password: false,
      },
    });

    return NextResponse.json({ message: "Password updated successfully" });
  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
