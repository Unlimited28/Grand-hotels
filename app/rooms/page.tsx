import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export default async function RoomsPage() {
  const rooms = await prisma.room.findMany({
    where: { availability: true },
    orderBy: { price: "asc" },
  });

  const parseAmenities = (amenities: string) => {
    try {
      const parsed = JSON.parse(amenities);
      return Array.isArray(parsed) ? parsed : amenities.split(',');
    } catch (e) {
      return amenities.split(',').filter(a => a.trim() !== '');
    }
  };

  return (
    <div className="pt-32 pb-24 bg-background min-h-screen">
      <div className="max-w-7xl auto px-4">
        <header className="text-center mb-20">
          <span className="text-primary font-medium tracking-[0.2em] uppercase text-sm mb-4 block">Selection</span>
          <h1 className="text-5xl font-serif text-[#1A1A1A] mb-6">Suites & Sanctuaries</h1>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg font-light">
            Each of our rooms is meticulously curated to provide the ultimate in comfort and style,
            blending modern amenities with classic elegance.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {rooms.map((room: any) => {
                const amenities = parseAmenities(room.amenities);
                return (
                <div key={room.id} className="bg-white group">
                <div className="relative h-[400px] overflow-hidden mb-8">
                    <Image
                    src={room.image_url || '/images/hotel/lobby.jpg'}
                    alt={room.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm text-[#1A1A1A] px-6 py-2 text-sm font-medium tracking-wide shadow-lg">
                    ₦{room.price.toLocaleString()} / night
                    </div>
                </div>
                <div className="flex flex-col">
                    <div className="flex justify-between items-baseline mb-4">
                    <h2 className="text-2xl font-serif text-[#1A1A1A]">{room.name}</h2>
                    </div>
                    <p className="text-gray-500 mb-8 font-light line-clamp-3 leading-relaxed">
                    {room.description}
                    </p>
                    <div className="flex flex-wrap gap-3 mb-8">
                        {amenities.slice(0, 3).map((amenity: string, idx: number) => (
                        <span key={idx} className="text-[10px] uppercase tracking-widest text-gray-400 border border-gray-100 px-3 py-1">
                        {amenity.trim()}
                        </span>
                    ))}
                    </div>
                    <div className="flex gap-4">
                        <Link href={`/rooms/${room.id}`} className="flex-1">
                            <button className="w-full border border-[#1A1A1A] text-[#1A1A1A] py-4 text-xs uppercase tracking-[0.2em] hover:bg-[#1A1A1A] hover:text-white transition-colors font-medium">
                                Details
                            </button>
                        </Link>
                        <Link href={`/booking?room=${room.id}`} className="flex-1">
                            <button className="w-full bg-[#1A1A1A] text-white py-4 text-xs uppercase tracking-[0.2em] hover:bg-primary transition-colors font-medium">
                                Book
                            </button>
                        </Link>
                    </div>
                </div>
                </div>
            )})}
        </div>
      </div>
    </div>
  );
}
