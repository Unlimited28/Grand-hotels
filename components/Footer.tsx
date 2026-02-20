import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-secondary text-white pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16 mb-16">
        <div className="col-span-1 md:col-span-2">
          <h2 className="text-2xl font-serif text-primary mb-8 tracking-tighter">GRAND COMMODORES</h2>
          <p className="text-gray-400 max-w-md mb-8 font-light leading-relaxed">
            Experience the pinnacle of luxury and hospitality at Grand Commodores Hotel & Suites.
            Our commitment to excellence ensures every stay is a masterpiece of comfort and style.
          </p>
          <div className="text-sm text-gray-500 font-light">
            <p>123 Luxury Avenue, Victoria Island</p>
            <p>Lagos, Nigeria</p>
          </div>
        </div>

        <div>
          <h3 className="text-sm uppercase tracking-[0.2em] mb-8 text-primary font-medium">Navigation</h3>
          <ul className="space-y-4 text-gray-400 text-sm font-light">
            <li><Link href="/rooms" className="hover:text-white transition-colors">Our Suites</Link></li>
            <li><Link href="/amenities" className="hover:text-white transition-colors">Experience</Link></li>
            <li><Link href="/gallery" className="hover:text-white transition-colors">Visuals</Link></li>
            <li><Link href="/reviews" className="hover:text-white transition-colors">Testimonials</Link></li>
            <li><Link href="/contact" className="hover:text-white transition-colors">Get in Touch</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm uppercase tracking-[0.2em] mb-8 text-primary font-medium">Administration</h3>
          <ul className="space-y-4 text-gray-400 text-sm font-light">
            <li><Link href="/admin" className="hover:text-white transition-colors">Portal Login</Link></li>
            <li><Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Ethics</Link></li>
            <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-10 border-t border-white/5 text-center text-gray-500 text-[10px] tracking-[0.3em] uppercase">
        © {new Date().getFullYear()} Grand Commodores Hotel & Suites. Crafted for Distinction.
      </div>
    </footer>
  );
}
