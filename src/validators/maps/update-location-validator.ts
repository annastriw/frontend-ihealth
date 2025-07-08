import { z } from "zod";

export const updateLocationSchema = z.object({
  latitude: z
    .string()
    .nonempty("Latitude harus diisi")
    .refine((val) => !isNaN(Number(val)), {
      message: "Latitude harus berupa angka",
    }),
  longitude: z
    .string()
    .nonempty("Longitude harus diisi")
    .refine((val) => !isNaN(Number(val)), {
      message: "Longitude harus berupa angka",
    }),
  address: z
    .string()
    .max(255, { message: "Alamat tidak boleh lebih dari 255 karakter" })
    .optional()
    .or(z.literal("")),
  kelurahan: z
    .string()
    .max(100, { message: "Kelurahan tidak boleh lebih dari 100 karakter" })
    .optional()
    .or(z.literal("")),
  rw: z
    .string()
    .max(10, { message: "RW tidak boleh lebih dari 10 karakter" })
    .optional()
    .or(z.literal("")),
});

export type UpdateLocationType = z.infer<typeof updateLocationSchema>;
