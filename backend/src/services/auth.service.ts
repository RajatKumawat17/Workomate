import jwt from 'jsonwebtoken';
import { config } from '../config/environment';
import { prisma } from '../config/database';
import { User } from '@prisma/client';

export class AuthService {
  generateToken(userId: string): string {
    return jwt.sign({ userId }, config.jwt.secret, {
      expiresIn: config.jwt.expiresIn,
    });
  }

  verifyToken(token: string): { userId: string } | null {
    try {
      const decoded = jwt.verify(token, config.jwt.secret) as { userId: string };
      return decoded;
    } catch (error) {
      return null;
    }
  }

  async getUserById(userId: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: { id: userId },
    });
  }

  async getUserByGoogleId(googleId: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: { googleId },
    });
  }

  async createUser(userData: {
    googleId: string;
    email: string;
    name: string;
    profilePicture?: string;
  }): Promise<User> {
    return await prisma.user.create({
      data: userData,
    });
  }

  async updateUser(userId: string, userData: Partial<User>): Promise<User> {
    return await prisma.user.update({
      where: { id: userId },
      data: userData,
    });
  }
}