"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

const links = [
  { name: "Home", href: "/" },
  { name: "Rooms", href: "/rooms" },
  { name: "Amenities", href: "/amenities" },
  { name: "Gallery", href: "/gallery" },
  { name: "Reviews", href: "/reviews" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
        scrolled
          ? "bg-white/95 backdrop-blur-md border-b border-gray-100 py-3 shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className={cn(
            "text-2xl font-serif tracking-tighter transition-colors",
            scrolled ? "text-primary" : "text-white"
        )}>
          GRAND COMMODORES
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-8 items-center">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "text-xs uppercase tracking-[0.2em] transition-colors hover:text-primary",
                scrolled ? "text-[#1A1A1A]" : "text-white/90"
              )}
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="/booking"
            className={cn(
                "px-8 py-2 rounded-sm text-xs uppercase tracking-[0.2em] font-medium transition-all",
                scrolled
                    ? "bg-primary text-white hover:bg-primary-dark"
                    : "bg-white text-[#1A1A1A] hover:bg-primary hover:text-white"
            )}
          >
            Book Now
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button className={cn(
            "md:hidden",
            scrolled ? "text-[#1A1A1A]" : "text-white"
        )} onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-100 p-8 flex flex-col space-y-6 shadow-xl">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm uppercase tracking-[0.2em] text-[#1A1A1A] border-b border-gray-50 pb-4 font-light"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="/booking"
            className="bg-primary text-white px-6 py-4 rounded-sm text-center uppercase tracking-[0.2em] text-xs font-medium"
            onClick={() => setIsOpen(false)}
          >
            Reserve Your Stay
          </Link>
        </div>
      )}
    </nav>
  );
}
