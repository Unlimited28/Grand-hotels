import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { bookingStatusSchema, idParamSchema } from '@/lib/validations';
import { z } from 'zod';

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = idParamSchema.parse(params);
    await prisma.booking.delete({
      where: { id },
    });
    return NextResponse.json({ message: 'Booking deleted' });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
        return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
    }
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function PATCH(
    req: Request,
    { params }: { params: { id: string } }
  ) {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    try {
      const { id } = idParamSchema.parse(params);
      const json = await req.json();
      const { status } = bookingStatusSchema.parse(json);

      const booking = await prisma.booking.update({
        where: { id },
        data: { status },
      });
      return NextResponse.json(booking);
    } catch (error: any) {
      if (error instanceof z.ZodError) {
          return NextResponse.json({ message: "Validation failed", errors: error.flatten().fieldErrors }, { status: 400 });
      }
      return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
  }
