import Image from 'next/image';
import {
  Utensils,
  Waves,
  Dumbbell,
  Wifi,
  Shield,
  Car,
  Coffee,
  Tv
} from 'lucide-react';

export default function AmenitiesPage() {
  const mainAmenities = [
    {
      title: 'Gourmet Dining',
      description: 'Experience world-class cuisine at our signature restaurant, featuring local and international flavors.',
      icon: Utensils,
      image: '/images/gallery/2.jpg'
    },
    {
      title: 'Rooftop Pool',
      description: 'Unwind at our infinity pool with panoramic views of the city skyline.',
      icon: Waves,
      image: '/images/gallery/1.jpg'
    },
    {
      title: 'Fitness Center',
      description: 'Stay active in our state-of-the-art gym equipped with the latest cardio and strength machines.',
      icon: Dumbbell,
      image: '/images/hotel/lobby.jpg'
    },
    {
      title: 'High-Speed Wifi',
      description: 'Complimentary ultra-fast internet throughout the entire hotel property.',
      icon: Wifi,
      image: '/images/rooms/executive.jpg'
    }
  ];

  return (
    <main className="min-h-screen pt-32 pb-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <header className="text-center mb-24">
          <h1 className="text-5xl font-serif text-[#1A1A1A] mb-8">World-Class Amenities</h1>
          <p className="text-gray-500 max-w-xl mx-auto font-light text-lg">
            At Grand Commodores, we offer a wide range of premium services and facilities to enhance your stay.
          </p>
        </header>

        <div className="space-y-32">
          {mainAmenities.map((item, index) => (
            <div key={index} className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-16 items-center`}>
              <div className="w-full lg:w-1/2 relative h-[500px] bg-cream-50 shadow-2xl">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="w-full lg:w-1/2">
                <item.icon className="w-12 h-12 text-primary mb-8" />
                <h2 className="text-3xl font-serif text-[#1A1A1A] mb-6">{item.title}</h2>
                <p className="text-gray-500 mb-10 text-lg font-light leading-relaxed">{item.description}</p>
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-500 font-light">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-primary" />
                    <span>24/7 Security</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Car className="w-4 h-4 text-primary" />
                    <span>Valet Parking</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Coffee className="w-4 h-4 text-primary" />
                    <span>Room Service</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Tv className="w-4 h-4 text-primary" />
                    <span>Smart TV</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
