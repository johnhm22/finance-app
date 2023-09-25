import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient | null = null;

function initPrisma() {
  if (typeof window !== 'undefined') {
    return;
  }

  if (process.env.NODE_ENV === 'production') {
    prisma = new PrismaClient();
  } else {
    let globalWithPrisma = global as typeof globalThis & {
      prisma: PrismaClient;
    };
    if (!globalWithPrisma.prisma) {
      globalWithPrisma.prisma = new PrismaClient();
    }
    prisma = globalWithPrisma.prisma;
  }
}
initPrisma();

export default prisma as unknown as PrismaClient;
