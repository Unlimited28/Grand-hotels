import Image from 'next/image';
import Link from 'next/link';

const rooms = [
  {
    id: '1',
    type: 'Standard Room',
    price: 18500,
    description: 'Our Standard Room offers a cozy and comfortable stay with essential amenities, perfect for business travelers or short stays.',
    features: ['Wi-Fi', 'Air Conditioning', 'Satellite TV', '24-hour Electricity', 'Shower'],
    image: 'https://crystalbeds.com.ng/images/960x490/unnamed%20(15).webp'
  },
  {
    id: '2',
    type: 'Double Room',
    price: 25000,
    description: 'Experience more space and comfort in our Double Room. Featuring a queen-sized bed and upgraded furnishings for a relaxing atmosphere.',
    features: ['Wi-Fi', 'Air Conditioning', 'Satellite TV', 'Mini Bar', '24-hour Electricity', 'Desk & Chair'],
    image: 'https://crystalbeds.com.ng/images/960x490/unnamed%20(14).webp'
  },
  {
    id: '3',
    type: 'Executive Suite',
    price: 30000,
    description: 'For those seeking ultimate luxury, our Executive Suite provides a separate living area, premium amenities, and stunning views.',
    features: ['Wi-Fi', 'Air Conditioning', 'Smart TV', 'Mini Bar', 'Bath Tub', 'Lounge Area', '24-hour Electricity'],
    image: 'https://crystalbeds.com.ng/images/960x490/2022-08-17%20(2).webp'
  }
];

export default function RoomsPage() {
  return (
    <div className="bg-background min-h-screen">
      {/* Header */}
      <section className="bg-foreground text-background py-20 px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4 uppercase tracking-widest text-primary">Rooms & Rates</h1>
        <p className="text-lg max-w-2xl mx-auto italic opacity-80">Experience unparalleled comfort in our carefully curated accommodations.</p>
      </section>

      {/* Rooms List */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-24">
          {rooms.map((room, index) => (
            <div key={room.id} className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 items-center`}>
              <div className="w-full md:w-1/2 relative h-[400px] shadow-2xl overflow-hidden group">
                <Image
                  src={room.image}
                  alt={room.type}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="w-full md:w-1/2">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-[1px] w-12 bg-primary"></div>
                  <span className="text-primary font-bold uppercase tracking-widest text-xs">Available Now</span>
                </div>
                <h2 className="text-4xl font-serif font-bold mb-6 italic">{room.type}</h2>
                <p className="text-foreground/70 mb-8 text-lg leading-relaxed">{room.description}</p>
                <div className="mb-8">
                  <h3 className="font-bold uppercase text-xs tracking-widest mb-4 text-foreground/50">Room Amenities</h3>
                  <div className="grid grid-cols-2 gap-y-3">
                    {room.features.map(feature => (
                      <div key={feature} className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-8 border-t border-primary/10 pt-8">
                  <div>
                    <span className="text-sm text-foreground/50 uppercase tracking-widest">Rate per night</span>
                    <p className="text-3xl font-bold text-primary">₦{room.price.toLocaleString()}</p>
                  </div>
                  <Link href="/booking" className="bg-foreground text-background px-10 py-4 hover:bg-primary transition-all uppercase text-sm font-bold tracking-widest w-full sm:w-auto text-center">
                    Reserve Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Policy section */}
      <section className="bg-secondary/20 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl font-serif font-bold mb-6">Booking Policy</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
            <div>
              <p className="font-bold mb-2 uppercase tracking-widest text-primary text-xs">Check-in</p>
              <p>From 3:00 PM</p>
            </div>
            <div>
              <p className="font-bold mb-2 uppercase tracking-widest text-primary text-xs">Check-out</p>
              <p>Until 11:00 AM</p>
            </div>
            <div>
              <p className="font-bold mb-2 uppercase tracking-widest text-primary text-xs">Cancellation</p>
              <p>Free up to 48 hours before arrival</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
