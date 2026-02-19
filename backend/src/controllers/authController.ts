import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../prisma';

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const admin = await prisma.admin.findUnique({ where: { username } });

    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: admin.id }, process.env.JWT_SECRET as string, { expiresIn: '1d' });

    res.json({
      token,
      admin: {
        id: admin.id,
        username: admin.username,
        mustChangePassword: admin.mustChangePassword
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const changePassword = async (req: any, res: Response) => {
  const { newPassword } = req.body;
  const adminId = req.adminId;

  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.admin.update({
      where: { id: adminId },
      data: {
        password: hashedPassword,
        mustChangePassword: false
      }
    });

    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
