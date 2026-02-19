import { Request, Response } from 'express';
import prisma from '../prisma';

export const createMessage = async (req: Request, res: Response) => {
  const { name, email, message } = req.body;
  try {
    const msg = await prisma.message.create({ data: { name, email, message } });
    res.status(201).json(msg);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getAllMessages = async (req: Request, res: Response) => {
  try {
    const messages = await prisma.message.findMany({ orderBy: { createdAt: 'desc' } });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteMessage = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.message.delete({ where: { id } });
    res.json({ message: 'Message deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
