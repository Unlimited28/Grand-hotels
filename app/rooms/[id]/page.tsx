import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { CheckCircle, ShieldCheck, Wifi } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function RoomDetailPage({ params }: { params: { id: string } }) {
  const room = await prisma.room.findUnique({
    where: { id: params.id },
  });

  if (!room) {
    notFound();
  }

  const parseAmenities = (amenities: string) => {
    try {
      const parsed = JSON.parse(amenities);
      return Array.isArray(parsed) ? parsed : amenities.split(',');
    } catch (e) {
      return amenities.split(',').filter(a => a.trim() !== '');
    }
  };

  const amenitiesList = parseAmenities(room.amenities);

  return (
    <main className="min-h-screen pt-32 pb-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left: Image */}
          <div className="space-y-4">
            <div className="relative h-[600px] rounded-lg overflow-hidden shadow-2xl">
              <Image
                src={room.image_url || '/images/hotel/hero.jpg'}
                alt={room.name}
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Right: Info */}
          <div className="flex flex-col">
            <nav className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-6">
               <Link href="/rooms" className="hover:text-primary transition-colors">Rooms</Link> / {room.name}
            </nav>
            <h1 className="text-5xl font-serif text-[#1A1A1A] mb-4">{room.name}</h1>
            <p className="text-3xl text-primary font-medium mb-8">₦{room.price.toLocaleString()} <span className="text-sm text-gray-400 uppercase tracking-widest ml-2">/ per night</span></p>

            <div className="prose prose-slate mb-12">
              <p className="text-gray-500 text-lg leading-relaxed font-light">
                {room.description}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-12">
              {amenitiesList.map((amenity, i) => (
                <div key={i} className="flex items-center gap-3 text-gray-600">
                  <CheckCircle size={18} className="text-primary" />
                  <span className="text-sm font-light tracking-wide">{amenity}</span>
                </div>
              ))}
            </div>

            <div className="mt-auto pt-8 border-t border-gray-100">
              <Link href={`/booking?room=${room.id}`} className="block">
                <button className="w-full bg-[#1A1A1A] text-white py-5 text-xs uppercase tracking-[0.3em] font-bold hover:bg-primary transition-all duration-500 shadow-xl">
                  Reserve This Suite
                </button>
              </Link>
              <div className="flex items-center justify-center gap-8 mt-6">
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-gray-400">
                  <ShieldCheck size={14} />
                  Best Price Guarantee
                </div>
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-gray-400">
                  <Wifi size={14} />
                  Free High-Speed WiFi
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
