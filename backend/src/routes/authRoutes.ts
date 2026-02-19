import { Router } from 'express';
import { login, changePassword } from '../controllers/authController';
import { authenticateAdmin } from '../middleware/auth';

const router = Router();

router.post('/login', login);
router.post('/change-password', authenticateAdmin, changePassword);

export default router;
