import { z } from 'zod';

export const locationSchema = z.object({
  kelurahan: z
    .string()
    .min(1, { message: 'Kelurahan wajib dipilih.' })
    .refine((val) => ['pedalangan', 'padangsari'].includes(val), {
      message: 'Kelurahan tidak valid.',
    }),

  rw: z
    .string()
    .min(1, { message: 'RW wajib dipilih.' }),

  alamatLengkap: z
    .string()
    .min(5, { message: 'Alamat terlalu pendek. Isi dengan lebih lengkap.' })
    .max(200, { message: 'Alamat terlalu panjang (maksimal 200 karakter).' })
    .trim(),
});

export type LocationFormType = z.infer<typeof locationSchema>;
