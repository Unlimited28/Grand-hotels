import { Request, Response } from 'express';
import prisma from '../prisma';

export const createReview = async (req: Request, res: Response) => {
  const { name, rating, comment } = req.body;
  try {
    const review = await prisma.review.create({
      data: { name, rating: parseInt(rating), comment }
    });
    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getAllReviews = async (req: Request, res: Response) => {
  try {
    const reviews = await prisma.review.findMany({ orderBy: { createdAt: 'desc' } });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getApprovedReviews = async (req: Request, res: Response) => {
  try {
    const reviews = await prisma.review.findMany({ where: { status: 'approved' }, orderBy: { createdAt: 'desc' } });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateReviewStatus = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const review = await prisma.review.update({ where: { id }, data: { status } });
    res.json(review);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteReview = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.review.delete({ where: { id } });
    res.json({ message: 'Review deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
