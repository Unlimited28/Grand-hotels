'use client';

import { useState } from 'react';
import Image from 'next/image';

const galleryItems = [
  { id: 1, category: 'Rooms', src: 'https://crystalbeds.com.ng/images/960x490/unnamed%20(15).webp', title: 'Standard Room' },
  { id: 2, category: 'Rooms', src: 'https://crystalbeds.com.ng/images/960x490/unnamed%20(14).webp', title: 'Double Room' },
  { id: 3, category: 'Rooms', src: 'https://crystalbeds.com.ng/images/960x490/2022-08-17%20(2).webp', title: 'Executive Suite' },
  { id: 4, category: 'Outdoor', src: 'https://crystalbeds.com.ng/images/960x490/2022-08-17%20(1).webp', title: 'Hotel Exterior' },
  { id: 5, category: 'Lounge', src: 'https://crystalbeds.com.ng/images/960x490/outdoor-lounge.jpg', title: 'Outdoor Lounge' },
  { id: 6, category: 'Restaurant', src: 'https://crystalbeds.com.ng/images/960x490/images%20(34).jpeg', title: 'Dining Area' },
  { id: 7, category: 'Rooms', src: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=800&q=80', title: 'Guest Suite' },
  { id: 8, category: 'Parking', src: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=800&q=80', title: 'Parking Area' },
];

export default function GalleryPage() {
  const [filter, setFilter] = useState('All');
  const categories = ['All', 'Rooms', 'Restaurant', 'Lounge', 'Outdoor', 'Parking'];

  const filteredItems = filter === 'All' ? galleryItems : galleryItems.filter(item => item.category === filter);

  return (
    <div className="bg-background min-h-screen py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4 uppercase tracking-widest text-primary">Gallery</h1>
          <p className="text-lg italic opacity-80 mb-12">Visual journey through Grand Commodores Hotel and Suites.</p>

          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-8 py-2 text-xs font-bold tracking-widest uppercase transition-all border-b-2 ${filter === cat ? 'border-primary text-primary' : 'border-transparent text-foreground/50 hover:text-foreground'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map(item => (
            <div key={item.id} className="relative h-80 overflow-hidden group">
              <Image
                src={item.src}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                <div className="text-center p-4">
                  <p className="text-white text-xs font-bold tracking-widest uppercase mb-2">{item.category}</p>
                  <h3 className="text-white text-2xl font-serif font-bold">{item.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
