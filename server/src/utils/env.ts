import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();

const envSchema = z.object({
  PORT: z.string().optional(),
  ACCESS_SECRET: z.string().nonempty("JWT_SECRET is required"),
  REFRESH_SECRET: z.string().nonempty("JWT_SECRET is required"),
  DATABASE_URL: z.string().nonempty("DATABASE_URL is required"),
  CLIENT_URL: z
    .string()
    .url("CLIENT_URL must be a valid URL")
    .nonempty("CLIENT_URL is required"),
  NODE_ENV: z.enum(["development", "production"]).default("development"),
  CONVEX_URL: z.string().nonempty("CONVEX_URL is required"),
  CONVEX_ADMIN_KEY: z.string().nonempty("CONVEX_ADMIN_KEY is required"),
  COOKIE_SECURE: z.string().nonempty("COOKIE_SECURE is required"),
  COOKIE_DOMAIN: z.string().optional(),
});

function createEnv(env: NodeJS.ProcessEnv) {
  const validationResult = envSchema.safeParse(env);
  if (!validationResult.success)
    throw new Error(validationResult.error.message);
  return validationResult.data;
}

export const env = createEnv(process.env);
