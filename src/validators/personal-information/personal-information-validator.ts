import { z } from "zod";

export const personalInformationSchema = z.object({
  name: z.string().nonempty(),
  place_of_birth: z.string().nonempty(),
  date_of_birth: z
    .string()
    .min(1, { message: "Tanggal lahir harus diisi" })
    .refine((val) => /^\d{4}-\d{2}-\d{2}$/.test(val), {
      message: "Format tanggal harus YYYY-MM-DD",
    })
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Tanggal tidak valid",
    }),
  age: z.string().nonempty(),
  work: z.string().nonempty(),
  gender: z.enum(["male", "female"]),
  is_married: z.boolean(),
  last_education: z.string().nonempty(),
  origin_disease: z.string().nonempty(),
  patient_type: z.enum(["HT", "DM", "KM", "ALL"]),
  disease_duration: z.string().nonempty(),
  history_therapy: z.string().nonempty(),
});

export type PersonalInformationType = z.infer<typeof personalInformationSchema>;
