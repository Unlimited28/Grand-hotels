'use client';

import Link from 'next/link';
import { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-background/80 backdrop-blur-md sticky top-0 z-50 border-b border-primary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex flex-col items-center">
              <span className="text-2xl font-serif font-bold text-primary tracking-wider uppercase">Grand Commodores</span>
              <span className="text-xs font-sans tracking-[0.3em] uppercase">Hotel & Suites</span>
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="hover:text-primary transition-colors uppercase text-sm font-medium tracking-widest">Home</Link>
            <Link href="/rooms" className="hover:text-primary transition-colors uppercase text-sm font-medium tracking-widest">Rooms</Link>
            <Link href="/amenities" className="hover:text-primary transition-colors uppercase text-sm font-medium tracking-widest">Amenities</Link>
            <Link href="/gallery" className="hover:text-primary transition-colors uppercase text-sm font-medium tracking-widest">Gallery</Link>
            <Link href="/about" className="hover:text-primary transition-colors uppercase text-sm font-medium tracking-widest">About</Link>
            <Link href="/reviews" className="hover:text-primary transition-colors uppercase text-sm font-medium tracking-widest">Reviews</Link>
            <Link href="/booking" className="bg-primary text-white px-6 py-3 rounded-none hover:bg-primary/90 transition-all uppercase text-xs font-bold tracking-[0.2em]">Book Now</Link>
          </div>
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-foreground focus:outline-none">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-background border-b border-primary/20 animate-in slide-in-from-top duration-300">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 text-center">
            <Link href="/" onClick={() => setIsOpen(false)} className="block px-3 py-4 text-base font-medium hover:bg-primary/10">Home</Link>
            <Link href="/rooms" onClick={() => setIsOpen(false)} className="block px-3 py-4 text-base font-medium hover:bg-primary/10">Rooms</Link>
            <Link href="/amenities" onClick={() => setIsOpen(false)} className="block px-3 py-4 text-base font-medium hover:bg-primary/10">Amenities</Link>
            <Link href="/gallery" onClick={() => setIsOpen(false)} className="block px-3 py-4 text-base font-medium hover:bg-primary/10">Gallery</Link>
            <Link href="/about" onClick={() => setIsOpen(false)} className="block px-3 py-4 text-base font-medium hover:bg-primary/10">About</Link>
            <Link href="/reviews" onClick={() => setIsOpen(false)} className="block px-3 py-4 text-base font-medium hover:bg-primary/10">Reviews</Link>
            <Link href="/booking" onClick={() => setIsOpen(false)} className="block px-3 py-4 text-base font-medium bg-primary text-white">Book Now</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
