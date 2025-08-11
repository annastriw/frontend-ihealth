import { z } from "zod";

export const changePasswordSchema = z
  .object({
    current_password: z
      .string()
      .min(1, { message: "Password saat ini harus diisi." })
      .trim(),

    new_password: z
      .string()
      .min(8, { message: "Password baru minimal 8 karakter." })
      .regex(/[A-Z]/, {
        message: "Password baru harus mengandung huruf besar.",
      })
      .regex(/[a-z]/, {
        message: "Password baru harus mengandung huruf kecil.",
      })
      .regex(/[0-9]/, { message: "Password baru harus mengandung angka." })
      .regex(/[^A-Za-z0-9]/, {
        message: "Password baru harus mengandung simbol (contoh: !@#$%).",
      })
      .trim(),

    new_password_confirmation: z
      .string()
      .min(1, { message: "Konfirmasi password baru harus diisi." })
      .trim(),
  })
  .refine((data) => data.new_password === data.new_password_confirmation, {
    message: "Konfirmasi password baru tidak cocok.",
    path: ["new_password_confirmation"],
  });

export type ChangePasswordType = z.infer<typeof changePasswordSchema>;
