import { z } from "zod";

export const registerSchema = z
  .object({
    name: z.string().min(1, { message: "Nama harus diisi." }).trim(),
    disease_type: z.string().min(1, { message: "Jenis penyakit harus diisi." }),
    email: z
      .string()
      .min(1, { message: "Email harus diisi." })
      .email({ message: "Format email tidak valid." })
      .trim(),
    username: z
      .string()
      .min(1, { message: "Username harus diisi." })
      .regex(/^[a-zA-Z0-9_]+$/, {
        message: "Username hanya boleh huruf, angka, dan underscore (_).",
      })
      .trim(),
    phone_number: z
      .string()
      .min(1, { message: "Nomor telepon harus diisi." })
      .regex(/^08\d{8,11}$/, {
        message:
          "Format nomor telepon tidak valid. Gunakan format 08xxxxxxxxx.",
      }),
    password: z.string().min(1, { message: "Password harus diisi." }),
    password_confirmation: z
      .string()
      .min(1, { message: "Konfirmasi password harus diisi." }),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Konfirmasi password harus sama dengan password.",
    path: ["password_confirmation"],
  });

export type RegisterType = z.infer<typeof registerSchema>;
