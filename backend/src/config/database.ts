import { PrismaClient } from '@prisma/client';
import { config } from './environment';

const prisma = new PrismaClient({
  log: config.nodeEnv === 'development' ? ['query', 'error', 'warn'] : ['error'],
});

export { prisma };