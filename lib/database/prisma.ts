import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ['query'],
    datasources: {
      db: {
        url:
          process.env.DATABASE_URL ||
          'postgresql://postgres:postgres@localhost:5432/htv_request_hub',
      },
    },
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
