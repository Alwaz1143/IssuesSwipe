import { PrismaClient } from '@prisma/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
// @ts-expect-error missing types
import Database from 'better-sqlite3';

const dbUrl = process.env.DATABASE_URL || 'file:./dev.db';
const sqlite = new Database(dbUrl.replace('file:', ''));
const adapter = new PrismaBetterSqlite3(sqlite);

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined };

export const db = globalForPrisma.prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db;
