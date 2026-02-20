import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding data...');

  // 1. Create Admin User
  const hashedPassword = await bcrypt.hash('GrandCom2026!', 10);
  await prisma.user.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      password_hash: hashedPassword,
      must_change_password: true,
    },
  });

  // 2. Create Rooms
  const rooms = [
    {
      id: 'standard',
      name: 'Standard Room',
      description: 'Comfortable and elegant room perfect for solo travelers or couples.',
      price: 85000,
      image_url: '/images/rooms/deluxe.jpg', // Reusing images
      availability: true,
      amenities: ['Queen Bed', 'Free WiFi', 'Smart TV', 'Air Conditioning']
    },
    {
        id: 'executive',
        name: 'Executive Room',
        description: 'Spacious room with a dedicated work area, ideal for business professionals.',
        price: 150000,
        image_url: '/images/rooms/executive.jpg',
        availability: true,
        amenities: ['King Bed', 'City View', 'Work Desk', 'Mini Bar', 'Free WiFi']
    },
    {
        id: 'deluxe',
        name: 'Deluxe Suite',
        description: 'Luxury suite featuring a separate living area and panoramic views of Victoria Island.',
        price: 250000,
        image_url: '/images/hotel/hero.jpg',
        availability: true,
        amenities: ['King Bed', 'Living Room', 'Ocean View', 'Nespresso Machine', 'Premium Toiletries']
    },
    {
        id: 'presidential',
        name: 'Presidential Suite',
        description: 'The pinnacle of luxury with expansive space, private dining, and unparalleled service.',
        price: 450000,
        image_url: '/images/hotel/lobby.jpg',
        availability: true,
        amenities: ['Master Bedroom', 'Private Lounge', '24/7 Butler Service', 'Kitchenette', 'Panoramic Balcony']
    }
  ];

  for (const room of rooms) {
    await prisma.room.upsert({
      where: { id: room.id },
      update: {
          name: room.name,
          description: room.description,
          price: room.price,
          image_url: room.image_url,
          amenities: JSON.stringify(room.amenities)
      },
      create: {
        id: room.id,
        name: room.name,
        description: room.description,
        price: room.price,
        image_url: room.image_url,
        availability: true,
        amenities: JSON.stringify(room.amenities),
      },
    });
  }

  console.log('Seeding complete.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
