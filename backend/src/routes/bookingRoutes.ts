import { Router } from 'express';
import { createBooking, getAllBookings, updateBookingStatus, deleteBooking } from '../controllers/bookingController';
import { authenticateAdmin } from '../middleware/auth';

const router = Router();

router.post('/', createBooking);
router.get('/', authenticateAdmin, getAllBookings);
router.put('/:id/status', authenticateAdmin, updateBookingStatus);
router.delete('/:id', authenticateAdmin, deleteBooking);

export default router;
