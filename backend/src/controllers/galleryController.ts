import { Request, Response } from 'express';
import prisma from '../prisma';

export const getAllGallery = async (req: Request, res: Response) => {
  try {
    const gallery = await prisma.gallery.findMany({ orderBy: { createdAt: 'desc' } });
    res.json(gallery);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const createGalleryItem = async (req: Request, res: Response) => {
  const { imageUrl, category, description } = req.body;
  try {
    const item = await prisma.gallery.create({ data: { imageUrl, category, description } });
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateGalleryItem = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { imageUrl, category, description } = req.body;
  try {
    const item = await prisma.gallery.update({
      where: { id },
      data: { imageUrl, category, description }
    });
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteGalleryItem = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.gallery.delete({ where: { id } });
    res.json({ message: 'Item deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
