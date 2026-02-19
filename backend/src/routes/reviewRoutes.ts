import { Router } from 'express';
import { createReview, getAllReviews, getApprovedReviews, updateReviewStatus, deleteReview } from '../controllers/reviewController';
import { authenticateAdmin } from '../middleware/auth';

const router = Router();

router.post('/', createReview);
router.get('/', authenticateAdmin, getAllReviews);
router.get('/approved', getApprovedReviews);
router.put('/:id/status', authenticateAdmin, updateReviewStatus);
router.delete('/:id', authenticateAdmin, deleteReview);

export default router;
