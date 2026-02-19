import { Request, Response } from 'express';
import prisma from '../prisma';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const createBooking = async (req: Request, res: Response) => {
  const { roomId, name, email, phone, checkIn, checkOut, guests } = req.body;

  try {
    // Check availability
    const room = await prisma.room.findUnique({ where: { id: roomId } });
    if (!room) return res.status(404).json({ message: 'Room not found' });

    const overlappingBookings = await prisma.booking.count({
      where: {
        roomId,
        status: { in: ['pending', 'confirmed'] },
        OR: [
          {
            checkIn: { lte: new Date(checkOut) },
            checkOut: { gte: new Date(checkIn) },
          },
        ],
      },
    });

    if (overlappingBookings >= room.totalRooms) {
      return res.status(400).json({ message: 'No rooms available for these dates' });
    }

    const booking = await prisma.booking.create({
      data: {
        roomId,
        name,
        email,
        phone,
        checkIn: new Date(checkIn),
        checkOut: new Date(checkOut),
        guests: parseInt(guests),
      },
      include: { room: true }
    });

    // Send confirmation email
    const mailOptions = {
      from: process.env.SMTP_FROM,
      to: email,
      subject: 'Booking Confirmation - Grand Commodores Hotel and Suites',
      text: `Dear ${name},\n\nYour booking for a ${booking.room.type} from ${checkIn} to ${checkOut} has been received and is pending confirmation.\n\nThank you for choosing Grand Commodores Hotel and Suites!`,
      html: `<p>Dear ${name},</p><p>Your booking for a <strong>${booking.room.type}</strong> from <strong>${checkIn}</strong> to <strong>${checkOut}</strong> has been received and is pending confirmation.</p><p>Thank you for choosing Grand Commodores Hotel and Suites!</p>`,
    };

    transporter.sendMail(mailOptions).catch(err => console.error('Email error:', err));

    res.status(201).json(booking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getAllBookings = async (req: Request, res: Response) => {
  try {
    const bookings = await prisma.booking.findMany({
      include: { room: true },
      orderBy: { createdAt: 'desc' }
    });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateBookingStatus = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const booking = await prisma.booking.update({
      where: { id },
      data: { status },
      include: { room: true }
    });

    // Optional: Send status update email
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteBooking = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.booking.delete({ where: { id } });
    res.json({ message: 'Booking deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
