import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-serif" });

export const metadata: Metadata = {
  title: "Grand Commodores Hotel & Suites – Luxury Stay Experience",
  description: "Grand Commodores Hotel & Suites offers premium accommodations, world-class amenities, and exceptional hospitality. Book your stay today.",
  keywords: "luxury hotel, hotel booking, suites, premium accommodation, hotel rooms, hospitality",
  openGraph: {
    title: "Grand Commodores Hotel & Suites",
    description: "Experience luxury like never before.",
    url: "https://grandcommodores.com",
    siteName: "Grand Commodores Hotel",
    images: [
      {
        url: "/images/hero/lobby.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Grand Commodores Hotel & Suites",
    description: "Experience luxury like never before.",
    images: ["/images/hero/lobby.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        <Providers>
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
