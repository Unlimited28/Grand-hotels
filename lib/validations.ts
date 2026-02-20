import { z } from "zod";

export const bookingSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 characters"),
  room_id: z.string().min(1, "Room is required"),
  check_in: z.string().refine((val) => !isNaN(Date.parse(val)), "Invalid check-in date"),
  check_out: z.string().refine((val) => !isNaN(Date.parse(val)), "Invalid check-out date"),
  guests: z.number().min(1, "At least 1 guest is required"),
}).refine((data) => {
  const checkIn = new Date(data.check_in);
  const checkOut = new Date(data.check_out);
  return checkOut > checkIn;
}, {
  message: "Check-out date must be after check-in date",
  path: ["check_out"],
}).refine((data) => {
  const checkIn = new Date(data.check_in);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return checkIn >= today;
}, {
  message: "Check-in date cannot be in the past",
  path: ["check_in"],
});

export const bookingStatusSchema = z.object({
    status: z.enum(["PENDING", "CONFIRMED", "CANCELLED"])
});

export const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
});

export const reviewSchema = z.object({
  name: z.string().min(2),
  rating: z.number().min(1).max(5),
  message: z.string().min(5),
});

export const reviewApprovalSchema = z.object({
    id: z.string().min(1),
    approved: z.boolean()
});

export const roomSchema = z.object({
  name: z.string().min(2),
  description: z.string().min(10),
  price: z.number().positive(),
  image_url: z.string().url().optional().or(z.literal('')),
  availability: z.boolean().default(true),
  amenities: z.array(z.string()).optional().default([]),
});

export const idParamSchema = z.object({
    id: z.string().min(1)
});
