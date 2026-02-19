import Image from 'next/image';

const amenities = [
  {
    title: 'Restaurant & Dining',
    description: 'Savor local and continental dishes prepared by our master chefs. Our restaurant offers an elegant dining experience with a focus on fresh ingredients and exquisite flavors.',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
    icon: '🍽️'
  },
  {
    title: 'VIP Lounge',
    description: 'Relax and unwind in our sophisticated lounge. Perfect for business meetings or casual evening drinks in a comfortable, upscale environment.',
    image: 'https://images.unsplash.com/photo-1560624052-449f5ddf0c31?auto=format&fit=crop&w=800&q=80',
    icon: '🍸'
  },
  {
    title: '24-hour Electricity & Wi-Fi',
    description: 'Stay connected and comfortable at all times. Our hotel features a robust power backup system and high-speed internet throughout the premises.',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80',
    icon: '⚡'
  },
  {
    title: 'Security & Privacy',
    description: 'Your safety is our priority. We employ 24/7 security personnel, CCTV surveillance, and modern keycard access systems to ensure a secure stay.',
    image: 'https://images.unsplash.com/photo-1557597774-9d2739f85a94?auto=format&fit=crop&w=800&q=80',
    icon: '🛡️'
  },
  {
    title: 'Spacious Parking',
    description: 'We provide ample and secure parking space for all our guests, ensuring your vehicle is safe and easily accessible.',
    image: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=800&q=80',
    icon: '🅿️'
  }
];

export default function AmenitiesPage() {
  return (
    <div className="bg-background min-h-screen">
      <section className="bg-primary text-white py-24 px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4 italic">Our Amenities</h1>
        <p className="text-lg max-w-2xl mx-auto opacity-90">Designed to make your stay exceptional.</p>
      </section>

      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {amenities.map((item, index) => (
            <div key={index} className="bg-white rounded-none shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden flex flex-col">
              <div className="relative h-64">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors"></div>
              </div>
              <div className="p-8 flex-grow border-b-4 border-primary/10">
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3 className="text-2xl font-serif font-bold mb-4">{item.title}</h3>
                <p className="text-foreground/70 leading-relaxed text-sm">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Services summary */}
      <section className="bg-foreground text-background py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <p className="text-3xl font-serif font-bold text-primary mb-2">24/7</p>
            <p className="text-xs uppercase tracking-[0.2em] opacity-70">Room Service</p>
          </div>
          <div>
            <p className="text-3xl font-serif font-bold text-primary mb-2">FREE</p>
            <p className="text-xs uppercase tracking-[0.2em] opacity-70">High-Speed Wi-Fi</p>
          </div>
          <div>
            <p className="text-3xl font-serif font-bold text-primary mb-2">SECURE</p>
            <p className="text-xs uppercase tracking-[0.2em] opacity-70">CCTV Coverage</p>
          </div>
          <div>
            <p className="text-3xl font-serif font-bold text-primary mb-2">MODERN</p>
            <p className="text-xs uppercase tracking-[0.2em] opacity-70">Power Backup</p>
          </div>
        </div>
      </section>
    </div>
  );
}
