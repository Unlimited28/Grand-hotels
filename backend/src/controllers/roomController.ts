import { Request, Response } from 'express';
import prisma from '../prisma';

export const getAllRooms = async (req: Request, res: Response) => {
  try {
    const rooms = await prisma.room.findMany();
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getRoomById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const room = await prisma.room.findUnique({ where: { id } });
    if (!room) return res.status(404).json({ message: 'Room not found' });
    res.json(room);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const createRoom = async (req: Request, res: Response) => {
  const { type, price, description, features, images, totalRooms } = req.body;
  try {
    const room = await prisma.room.create({
      data: { type, price: parseFloat(price), description, features, images, totalRooms: parseInt(totalRooms) }
    });
    res.status(201).json(room);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateRoom = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { type, price, description, features, images, totalRooms } = req.body;
  try {
    const room = await prisma.room.update({
      where: { id },
      data: {
        type,
        price: price ? parseFloat(price) : undefined,
        description,
        features,
        images,
        totalRooms: totalRooms ? parseInt(totalRooms) : undefined
      }
    });
    res.json(room);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteRoom = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.room.delete({ where: { id } });
    res.json({ message: 'Room deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
