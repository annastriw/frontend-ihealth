// src/validators/screening-scoring/screening-scoring-validator.ts

import { z } from "zod";

/**
 * Schema untuk validasi form Screening Scoring
 */
export const screeningScoringSchema = z.object({
  question_set_id: z.string().uuid({ message: "Bank soal wajib dipilih" }),
  name: z.string().nonempty({ message: "Nama screening wajib diisi" }),
  type: z.union([
    z.enum(["HT", "DM"]),
    z.literal(""), // fallback untuk initial state di form
  ]),
});

export type ScreeningScoringType = z.infer<typeof screeningScoringSchema>;
