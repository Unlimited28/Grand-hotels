import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { sendBookingConfirmation } from "@/lib/mail";
import { bookingSchema } from "@/lib/validations";
import { differenceInDays, startOfDay } from "date-fns";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const bookings = await prisma.booking.findMany({
      include: { room: true },
      orderBy: { created_at: "desc" },
    });
    return NextResponse.json(bookings);
  } catch (error) {
    console.error("GET_BOOKINGS_ERROR", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // 1. Zod Validation
    const validation = bookingSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { message: "Validation failed", errors: validation.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const {
      name,
      email,
      phone,
      room_id,
      check_in,
      check_out,
      guests,
    } = validation.data;

    const checkInDate = startOfDay(new Date(check_in));
    const checkOutDate = startOfDay(new Date(check_out));

    // 2. Check if room exists and is available
    const room = await prisma.room.findUnique({
      where: { id: room_id },
    });

    if (!room) {
      return NextResponse.json({ message: "Room not found" }, { status: 404 });
    }

    if (!room.availability) {
      return NextResponse.json({ message: "Room is currently not available" }, { status: 400 });
    }

    // 3. Overlap Check (CRITICAL)
    const existingBooking = await prisma.booking.findFirst({
      where: {
        room_id,
        status: { not: "CANCELLED" },
        OR: [
          {
            check_in: { lte: checkInDate },
            check_out: { gt: checkInDate },
          },
          {
            check_in: { lt: checkOutDate },
            check_out: { gte: checkOutDate },
          },
          {
            check_in: { gte: checkInDate },
            check_out: { lte: checkOutDate },
          },
        ],
      },
    });

    if (existingBooking) {
      return NextResponse.json(
        { message: "Room is already booked for the selected dates" },
        { status: 409 }
      );
    }

    // 4. Price Calculation
    const nights = differenceInDays(checkOutDate, checkInDate);
    const totalPrice = nights * room.price;

    // 5. Create Booking
    const booking = await prisma.booking.create({
      data: {
        name,
        email,
        phone,
        room_id,
        check_in: checkInDate,
        check_out: checkOutDate,
        guests,
        status: "PENDING",
      },
    });

    // 6. Send confirmation email
    try {
      await sendBookingConfirmation({
        to: email,
        name,
        roomName: room.name,
        checkIn: check_in,
        checkOut: check_out,
        totalPrice,
      });
    } catch (mailError) {
      console.error("FAILED_TO_SEND_EMAIL", mailError);
    }

    return NextResponse.json({ ...booking, totalPrice }, { status: 201 });
  } catch (error) {
    console.error("POST_BOOKING_ERROR", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
