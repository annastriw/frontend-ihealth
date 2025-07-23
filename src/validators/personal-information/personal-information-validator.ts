// src/validators/personal-information/personal-information-validator.ts
import { z } from "zod";
import { differenceInYears } from "date-fns";

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
    })
    .refine(
      (val) => {
        const dob = new Date(val);
        const age = differenceInYears(new Date(), dob);
        return age >= 10;
      },
      {
        message: "Umur harus lebih dari atau sama dengan 10 tahun",
      },
    ),

  age: z.string().nonempty(),

  work: z.string().nonempty(),
  gender: z.enum(["0", "1"], {
    required_error: "Jenis kelamin harus dipilih",
  }),

  is_married: z.boolean(),
  last_education: z.string().nonempty(),
  origin_disease: z.string().nonempty(),

  disease_duration: z.string().nonempty(),
  history_therapy: z.string().nonempty(),

  smoking_history: z.enum(
    [
      "perokok aktif",
      "mantan perokok",
      "tidak pernah merokok",
      "tidak ada informasi",
    ],
    {
      required_error: "Riwayat merokok harus dipilih",
    },
  ),

  bmi: z
    .string()
    .min(1, "BMI harus diisi")
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "BMI harus berupa angka yang valid. Contoh: 22.3",
    }),

  heart_disease_history: z.enum(["0", "1"], {
    required_error: "Riwayat penyakit jantung harus dipilih",
  }),

  weight: z
    .string()
    .min(1, "Berat badan harus diisi")
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Berat badan harus berupa angka positif",
    }),

  height: z
    .string()
    .min(1, "Tinggi badan harus diisi")
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Tinggi badan harus berupa angka positif",
    }),
});

export type PersonalInformationType = z.infer<typeof personalInformationSchema>;
