import Image from 'next/image';

export default function GalleryPage() {
  const images = [
    { src: '/images/hotel/hero.jpg', alt: 'Exterior View', category: 'Exterior' },
    { src: '/images/hotel/lobby.jpg', alt: 'Lobby Area', category: 'Lobby' },
    { src: '/images/rooms/deluxe.jpg', alt: 'Deluxe Suite', category: 'Rooms' },
    { src: '/images/rooms/executive.jpg', alt: 'Executive Room', category: 'Rooms' },
    { src: '/images/gallery/1.jpg', alt: 'Infinity Pool', category: 'Amenities' },
    { src: '/images/gallery/2.jpg', alt: 'Fine Dining', category: 'Restaurant' },
  ];

  return (
    <main className="min-h-screen pt-32 pb-24 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        <header className="text-center mb-20">
          <span className="text-primary font-medium tracking-[0.2em] uppercase text-sm mb-4 block">Visuals</span>
          <h1 className="text-5xl font-serif text-[#1A1A1A] mb-6">A Glimpse of Grandeur</h1>
          <div className="w-24 h-px bg-primary mx-auto"></div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {images.map((image, index) => (
            <div key={index} className="group relative h-[400px] overflow-hidden bg-cream-50">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-[#1A1A1A]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white p-6">
                <span className="text-[10px] uppercase tracking-[0.3em] mb-2">{image.category}</span>
                <h3 className="text-xl font-serif tracking-wide">{image.alt}</h3>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
            <p className="text-gray-400 font-light italic">More visuals coming soon as we continue to refine our sanctuary.</p>
        </div>
      </div>
    </main>
  );
}
