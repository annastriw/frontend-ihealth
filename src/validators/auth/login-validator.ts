import { z } from "zod";

export const loginSchema = z.object({
  login: z
    .string()
    .min(1, { message: "Email, username, atau nomor telepon harus diisi." })
    .trim(),
  password: z.string().min(1, { message: "Password harus diisi." }),
});

export type LoginType = z.infer<typeof loginSchema>;
