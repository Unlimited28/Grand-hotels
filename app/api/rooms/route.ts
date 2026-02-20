import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { roomSchema } from '@/lib/validations';
import { z } from 'zod';

export async function GET() {
  try {
    const rooms = await prisma.room.findMany({
        orderBy: { name: 'asc' }
    });
    return NextResponse.json(rooms);
  } catch (error: any) {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const json = await req.json();
    const body = roomSchema.parse(json);

    const room = await prisma.room.create({
      data: {
        name: body.name,
        description: body.description,
        price: body.price,
        image_url: body.image_url || '',
        availability: body.availability,
        amenities: JSON.stringify(body.amenities),
      },
    });

    return NextResponse.json(room);
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: 'Validation failed', errors: error.flatten().fieldErrors }, { status: 400 });
    }
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
