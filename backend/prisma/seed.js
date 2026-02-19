"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const prisma = new client_1.PrismaClient();
async function main() {
    const hashedPassword = await bcryptjs_1.default.hash('GrandCom2026!', 10);
    const admin = await prisma.admin.upsert({
        where: { username: 'admin' },
        update: {},
        create: {
            username: 'admin',
            password: hashedPassword,
            mustChangePassword: true,
        },
    });
    console.log('Admin user created:', admin.username);
    // Seed some rooms
    const rooms = [
        {
            type: 'Standard Room',
            price: 18500,
            description: 'Comfortable standard room with essential amenities.',
            features: ['Wi-Fi', 'AC', 'Satellite TV', '24h Electricity'],
            totalRooms: 10,
            images: ['https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=800&q=80'],
        },
        {
            type: 'Double Room',
            price: 25000,
            description: 'Spacious double room for extra comfort.',
            features: ['Wi-Fi', 'AC', 'Satellite TV', 'Mini Bar', '24h Electricity'],
            totalRooms: 5,
            images: ['https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=800&q=80'],
        },
        {
            type: 'Executive Suite',
            price: 30000,
            description: 'Luxury suite with premium features.',
            features: ['Wi-Fi', 'AC', 'Satellite TV', 'Mini Bar', 'Work Desk', '24h Electricity'],
            totalRooms: 3,
            images: ['https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80'],
        },
    ];
    for (const room of rooms) {
        await prisma.room.create({ data: room });
    }
    console.log('Sample rooms seeded.');
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map