import { Router } from 'express';
import { createMessage, getAllMessages, deleteMessage } from '../controllers/messageController';
import { authenticateAdmin } from '../middleware/auth';

const router = Router();

router.post('/', createMessage);
router.get('/', authenticateAdmin, getAllMessages);
router.delete('/:id', authenticateAdmin, deleteMessage);

export default router;
