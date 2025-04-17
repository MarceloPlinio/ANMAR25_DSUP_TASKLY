import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

prisma.$executeRaw`PRAGMA foreign_keys = ON;`;

