import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-serif font-bold text-primary mb-4 uppercase tracking-wider">Grand Commodores</h3>
            <p className="text-muted-foreground mb-6 max-w-md italic">
              Experience the perfect blend of hospitality and luxury in the heart of Oyo. Our commitment to excellence ensures every stay is memorable.
            </p>
            <div className="flex space-x-4">
              {/* Social icons placeholder */}
            </div>
          </div>
          <div>
            <h4 className="font-serif text-lg font-semibold mb-6 uppercase tracking-widest text-primary">Quick Links</h4>
            <ul className="space-y-4 font-sans text-sm tracking-wide">
              <li><Link href="/rooms" className="hover:text-primary transition-colors">Rooms & Rates</Link></li>
              <li><Link href="/amenities" className="hover:text-primary transition-colors">Amenities</Link></li>
              <li><Link href="/gallery" className="hover:text-primary transition-colors">Gallery</Link></li>
              <li><Link href="/reviews" className="hover:text-primary transition-colors">Reviews</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-serif text-lg font-semibold mb-6 uppercase tracking-widest text-primary">Contact Us</h4>
            <ul className="space-y-4 font-sans text-sm tracking-wide">
              <li>Eyin Cele Rd, Isokun, Oyo, Nigeria</li>
              <li>+234 802 235 2108</li>
              <li>info@grandcommodores.com</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 mt-16 pt-8 text-center text-xs tracking-widest uppercase opacity-60">
          <p>&copy; {new Date().getFullYear()} Grand Commodores Hotel and Suites. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
