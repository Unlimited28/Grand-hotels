import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ArrowRight, Star, Shield, Clock, MapPin } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <Image
          src="/images/hotel/hero.jpg"
          alt="Grand Commodores Luxury Hotel"
          fill
          className="object-cover brightness-[0.4]"
          priority
        />
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <span className="text-primary font-medium tracking-[0.4em] uppercase text-sm mb-6 block animate-fade-in">
            Refined Luxury. Timeless Elegance.
          </span>
          <h1 className="text-5xl md:text-8xl font-serif text-white mb-8 leading-tight">
            A Sanctuary of <br /> <span className="italic text-primary">Distinction</span>
          </h1>
          <p className="text-cream-100/80 text-lg md:text-xl mb-12 max-w-2xl mx-auto font-light leading-relaxed">
            Experience the pinnacle of hospitality in the heart of Victoria Island. Where every detail is crafted for your absolute comfort.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link
              href="/booking"
              className="bg-primary text-white px-10 py-5 text-xs uppercase tracking-[0.2em] font-medium hover:bg-gold-700 transition-all duration-300 w-full sm:w-auto shadow-xl"
            >
              Reserve Your Stay
            </Link>
            <Link
              href="/rooms"
              className="text-white px-10 py-5 text-xs uppercase tracking-[0.2em] font-medium border border-white/30 hover:bg-white hover:text-[#1A1A1A] transition-all duration-300 w-full sm:w-auto backdrop-blur-sm"
            >
              Explore Suites
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-50">
          <div className="w-px h-12 bg-white mx-auto"></div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-32 bg-background relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative h-[600px]">
              <div className="absolute top-0 left-0 w-4/5 h-4/5 border border-primary/20 -translate-x-4 -translate-y-4"></div>
              <Image
                src="/images/hotel/lobby.jpg"
                alt="Luxury Lobby"
                fill
                className="object-cover shadow-2xl"
              />
            </div>
            <div>
              <span className="text-primary font-medium tracking-[0.2em] uppercase text-xs mb-4 block">Our Philosophy</span>
              <h2 className="text-4xl md:text-5xl font-serif text-[#1A1A1A] mb-8 leading-tight">Beyond Accommodation, <br />An Experience.</h2>
              <p className="text-gray-500 mb-8 text-lg font-light leading-relaxed">
                At Grand Commodores, we believe true luxury lies in the details. From the curated art in our lobby to the personalized attention of our concierge, we strive to exceed every expectation.
              </p>
              <div className="grid grid-cols-2 gap-8 mb-12">
                <div>
                  <h3 className="text-3xl font-serif text-primary mb-2">24/7</h3>
                  <p className="text-xs uppercase tracking-widest text-gray-400">Concierge Excellence</p>
                </div>
                <div>
                  <h3 className="text-3xl font-serif text-primary mb-2">50+</h3>
                  <p className="text-xs uppercase tracking-widest text-gray-400">Luxury Suites</p>
                </div>
              </div>
              <Link href="/amenities" className="inline-flex items-center text-xs uppercase tracking-widest font-bold text-[#1A1A1A] hover:text-primary transition-colors group">
                Discover Our Services <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Rooms */}
      <section className="py-32 bg-cream-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-xl">
              <span className="text-primary font-medium tracking-[0.2em] uppercase text-xs mb-4 block">Selection</span>
              <h2 className="text-4xl font-serif text-[#1A1A1A]">Suites & Sanctuaries</h2>
            </div>
            <Link href="/rooms" className="text-xs uppercase tracking-[0.2em] font-medium border-b border-primary text-primary hover:text-gold-700 transition-colors pb-1">
              View All Accommodations
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              { name: 'Deluxe Suite', price: '250', image: '/images/rooms/deluxe.jpg', size: '45m²' },
              { name: 'Executive Room', price: '180', image: '/images/rooms/executive.jpg', size: '38m²' }
            ].map((room, i) => (
              <div key={i} className="group cursor-pointer">
                <div className="relative h-[500px] overflow-hidden mb-8">
                  <Image
                    src={room.image}
                    alt={room.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm px-4 py-2 text-xs font-medium tracking-widest">
                    FROM ${room.price}
                  </div>
                </div>
                <div className="flex justify-between items-baseline">
                  <div>
                    <h3 className="text-2xl font-serif text-[#1A1A1A] mb-2">{room.name}</h3>
                    <p className="text-gray-400 text-xs uppercase tracking-widest">{room.size} • City View • Premium Amenities</p>
                  </div>
                  <Link href={`/booking?room=${i+1}`} className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-colors">
                    <ArrowRight className="w-5 h-5 group-hover:text-white transition-colors" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Amenities Preview */}
      <section className="py-32 bg-[#1A1A1A] text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 -skew-x-12 translate-x-1/2"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <span className="text-primary font-medium tracking-[0.2em] uppercase text-xs mb-4 block">The Experience</span>
            <h2 className="text-4xl font-serif mb-6">World-Class Services</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: Shield, title: 'Secure Haven', desc: 'State-of-the-art security systems and 24/7 professional surveillance for absolute peace of mind.' },
              { icon: Star, title: 'Gourmet Dining', desc: 'A culinary journey led by award-winning chefs, blending local flavors with international techniques.' },
              { icon: Clock, title: 'Always At Service', desc: 'Our dedicated staff is available around the clock to cater to your every whim and requirement.' }
            ].map((item, i) => (
              <div key={i} className="text-center group">
                <div className="w-16 h-16 mx-auto mb-8 flex items-center justify-center border border-primary/30 group-hover:bg-primary transition-all duration-300">
                  <item.icon className="w-6 h-6 text-primary group-hover:text-white" />
                </div>
                <h3 className="text-lg font-serif mb-4 tracking-wide">{item.title}</h3>
                <p className="text-gray-400 font-light leading-relaxed text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-32 bg-cream-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-serif text-[#1A1A1A] mb-8">Ready to Experience <br />the Extraordinary?</h2>
          <p className="text-gray-500 max-w-xl mx-auto mb-12 font-light">
            Join us at Grand Commodores Hotel & Suites and redefine your expectations of luxury and comfort.
          </p>
          <Link
            href="/booking"
            className="inline-block bg-[#1A1A1A] text-white px-12 py-5 text-xs uppercase tracking-[0.2em] font-medium hover:bg-primary transition-colors shadow-2xl"
          >
            Book Your Stay Today
          </Link>
        </div>
      </section>
    </main>
  );
}
