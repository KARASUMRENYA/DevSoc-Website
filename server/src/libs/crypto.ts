import crypto from "crypto";
import argon2 from "argon2";

export function hashToken(token: string) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

export async function hashPassword(password: string) {
  return await argon2.hash(password, {
    type: argon2.argon2id,
    memoryCost: 2 ** 16,
    timeCost: 3,
    parallelism: 1,
  });
}

export async function verifyPassword(password: string, hash: string) {
  return await argon2.verify(hash, password);
}
