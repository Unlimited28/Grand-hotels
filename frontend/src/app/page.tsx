import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1920&q=80"
            alt="Grand Commodores Hotel"
            fill
            className="object-cover brightness-[0.4]"
            priority
          />
        </div>
        <div className="relative z-10 text-center text-white px-4 max-w-4xl">
          <h2 className="text-sm uppercase tracking-[0.5em] mb-4 animate-in fade-in slide-in-from-bottom duration-1000">Welcome to Excellence</h2>
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-8 animate-in fade-in slide-in-from-bottom duration-1000 delay-200">
            Grand Commodores <br /> <span className="text-primary italic">Hotel & Suites</span>
          </h1>
          <p className="text-lg md:text-xl mb-12 opacity-90 font-sans tracking-wide animate-in fade-in slide-in-from-bottom duration-1000 delay-500 max-w-2xl mx-auto italic">
            Refined luxury, personalized service, and a peaceful atmosphere in the heart of Oyo.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in fade-in slide-in-from-bottom duration-1000 delay-700">
            <Link href="/booking" className="bg-primary text-white px-10 py-4 rounded-none hover:bg-primary/90 transition-all uppercase text-sm font-bold tracking-widest shadow-xl">
              Book Your Stay
            </Link>
            <Link href="/rooms" className="border border-white text-white px-10 py-4 rounded-none hover:bg-white hover:text-foreground transition-all uppercase text-sm font-bold tracking-widest">
              Explore Rooms
            </Link>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-primary text-sm uppercase tracking-widest mb-4">Discover Our Hotel</h2>
              <h3 className="text-4xl font-serif font-bold mb-6">A Legacy of Hospitality</h3>
              <p className="text-foreground/70 mb-8 leading-relaxed">
                Located at Eyin Cele Rd, Isokun, Oyo, Grand Commodores Hotel and Suites is more than just a place to stay. It is an experience designed for those who appreciate the finer things in life. From our elegantly appointed rooms to our world-class dining, every detail is crafted to provide you with unparalleled comfort.
              </p>
              <div className="grid grid-cols-2 gap-8 mb-10">
                <div>
                  <h4 className="font-serif text-xl font-bold mb-2">24/7 Service</h4>
                  <p className="text-sm text-foreground/60">Dedicated staff ready to assist you at any hour.</p>
                </div>
                <div>
                  <h4 className="font-serif text-xl font-bold mb-2">Modern Amenities</h4>
                  <p className="text-sm text-foreground/60">High-speed Wi-Fi, 24h electricity, and secure parking.</p>
                </div>
              </div>
              <Link href="/about" className="text-primary font-bold uppercase text-xs tracking-[0.3em] border-b-2 border-primary/30 pb-2 hover:border-primary transition-all">
                Learn More About Us
              </Link>
            </div>
            <div className="relative h-[600px] grid grid-cols-2 gap-4">
              <div className="relative h-full pt-12">
                <Image
                  src="https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=600&q=80"
                  alt="Hotel Interior"
                  fill
                  className="object-cover rounded-sm shadow-2xl"
                />
              </div>
              <div className="relative h-full pb-12">
                <Image
                  src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80"
                  alt="Hotel Exterior"
                  fill
                  className="object-cover rounded-sm shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Rooms */}
      <section className="py-24 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-primary text-sm uppercase tracking-[0.4em] mb-4">Luxury Accommodations</h2>
            <h3 className="text-4xl md:text-5xl font-serif font-bold italic">Our Signature Suites</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Standard Room', price: '18,500', img: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=600&q=80' },
              { name: 'Double Room', price: '25,000', img: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=600&q=80' },
              { name: 'Executive Suite', price: '30,000', img: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80' }
            ].map((room, i) => (
              <div key={i} className="group bg-white overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500">
                <div className="relative h-80 overflow-hidden">
                  <Image
                    src={room.img}
                    alt={room.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 bg-primary text-white px-4 py-1 text-xs font-bold tracking-widest uppercase">
                    From ₦{room.price}
                  </div>
                </div>
                <div className="p-8 text-center">
                  <h4 className="text-2xl font-serif font-bold mb-4">{room.name}</h4>
                  <Link href="/booking" className="inline-block border-b-2 border-primary/20 pb-1 text-xs font-bold tracking-widest uppercase hover:border-primary transition-all">
                    Reserve Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-16">
            <Link href="/rooms" className="bg-foreground text-background px-12 py-4 hover:bg-primary transition-all uppercase text-xs font-bold tracking-widest">
              View All Rooms
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative bg-primary">
        <div className="max-w-4xl mx-auto text-center px-4 relative z-10 text-white">
          <h2 className="text-4xl md:text-6xl font-serif font-bold mb-8 italic">Ready to Experience Grandeur?</h2>
          <p className="text-xl mb-12 opacity-90 font-sans">Book your stay today and enjoy our hospitality.</p>
          <Link href="/booking" className="bg-white text-primary px-12 py-5 hover:bg-secondary transition-all uppercase text-sm font-bold tracking-[0.2em] shadow-2xl">
            Book Now
          </Link>
        </div>
      </section>
    </div>
  );
}
