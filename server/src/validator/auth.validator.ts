import { z } from "zod";

export const RegisterSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email().max(320),
  password: z.string().min(8).max(128),
  image: z.string().url().optional().nullable(),
});

export const LoginSchema = z.object({
  email: z.string().email().max(320),
  password: z.string().min(8).max(128),
});

export const UpdateProfileSchema = z.object({
  name: z.string().min(2).max(100).optional(),
  image: z.string().url().optional().nullable(),
});

export type RegisterDTO = z.infer<typeof RegisterSchema>;
export type LoginDTO = z.infer<typeof LoginSchema>;
export type UpdateProfileDTO = z.infer<typeof UpdateProfileSchema>;
