
import { PrismaClient } from './generated/prisma'
import { PrismaNeon } from '@prisma/adapter-neon';
import { neonConfig } from '@neondatabase/serverless';

import ws from 'ws';
import { env } from '@/env';

neonConfig.webSocketConstructor = ws;

declare global {
  var prisma: PrismaClient | undefined
}

const connectionString = env.DATABASE_URL;

const adapter = new PrismaNeon({ connectionString });
export const prisma = global.prisma || new PrismaClient({ adapter });

if (process.env.NODE_ENV !== 'production') global.prisma = prisma;
