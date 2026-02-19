import { Router } from 'express';
import { getAllRooms, getRoomById, createRoom, updateRoom, deleteRoom } from '../controllers/roomController';
import { authenticateAdmin } from '../middleware/auth';

const router = Router();

router.get('/', getAllRooms);
router.get('/:id', getRoomById);
router.post('/', authenticateAdmin, createRoom);
router.put('/:id', authenticateAdmin, updateRoom);
router.delete('/:id', authenticateAdmin, deleteRoom);

export default router;
