import { Router } from 'express';
import { getAllGallery, createGalleryItem, updateGalleryItem, deleteGalleryItem } from '../controllers/galleryController';
import { authenticateAdmin } from '../middleware/auth';

const router = Router();

router.get('/', getAllGallery);
router.post('/', authenticateAdmin, createGalleryItem);
router.put('/:id', authenticateAdmin, updateGalleryItem);
router.delete('/:id', authenticateAdmin, deleteGalleryItem);

export default router;
