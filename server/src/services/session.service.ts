import { hashToken } from "../libs/crypto.js";
import { prisma } from "../libs/db.js";

export async function createSession(
  userId: string,
  refreshToken: string,
  expiresAt: Date,
  ipAddress?: string,
  userAgent?: string
) {
  const tokenHash = hashToken(refreshToken);
  return prisma.session.create({
    data: {
      userId,
      token: tokenHash,
      expiresAt,
      ipAddress: ipAddress ?? null,
      userAgent: userAgent ?? null,
    },
  });
}

export async function invalidateSessionByToken(refreshToken: string) {
  const tokenHash = hashToken(refreshToken);
  return prisma.session.deleteMany({ where: { token: tokenHash } });
}

export async function invalidateAllSessionsForUser(userId: string) {
  return prisma.session.deleteMany({ where: { userId } });
}

export async function findValidSessionByRefreshToken(refreshToken: string) {
  const tokenHash = hashToken(refreshToken);
  const now = new Date();
  return prisma.session.findFirst({
    where: { token: tokenHash, expiresAt: { gt: now } },
    include: { user: true },
  });
}
