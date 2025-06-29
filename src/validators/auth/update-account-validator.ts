import { z } from "zod";

export const updateAccountSchema = z.object({
  name: z.string().min(1, { message: "Nama harus diisi." }).trim(),
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
      message: "Format nomor telepon tidak valid. Gunakan format 08xxxxxxxxx.",
    }),
});

export type UpdateAccountType = z.infer<typeof updateAccountSchema>;
