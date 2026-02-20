import { prisma } from "@/lib/prisma";
import BookingForm from "@/components/BookingForm";

export const dynamic = 'force-dynamic';

export default async function BookingPage() {
  const rooms = await prisma.room.findMany({
    where: { availability: true },
    select: { id: true, name: true, price: true }
  });

  return (
    <div className="pt-32 pb-24 bg-background min-h-screen">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-16">
            <span className="text-primary font-medium tracking-[0.2em] uppercase text-sm mb-4 block">Reservation</span>
            <h1 className="text-4xl md:text-5xl font-serif text-[#1A1A1A] mb-4">Book Your Stay</h1>
            <p className="text-gray-500 font-light max-w-md mx-auto">
                Secure your sanctuary at Grand Commodores Hotel & Suites.
            </p>
        </div>

        <div className="bg-white p-8 md:p-16 shadow-sm border border-gray-100">
            <BookingForm rooms={rooms} />
        </div>

        <div className="mt-12 text-center text-gray-400 text-sm font-light">
            <p>Need assistance with your booking? <a href="/contact" className="text-primary border-b border-primary/20">Contact our concierge</a></p>
        </div>
      </div>
    </div>
  );
}
