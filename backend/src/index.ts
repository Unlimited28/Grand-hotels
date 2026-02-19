import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import roomRoutes from './routes/roomRoutes';
import bookingRoutes from './routes/bookingRoutes';
import reviewRoutes from './routes/reviewRoutes';
import messageRoutes from './routes/messageRoutes';
import galleryRoutes from './routes/galleryRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/gallery', galleryRoutes);

app.get('/', (req, res) => {
  res.send('Grand Commodores Hotel API is running');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
