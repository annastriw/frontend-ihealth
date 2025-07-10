// src/validators/screening-scoring/screening-scoring-validator.ts
import { z } from "zod";

/**
 * Schema untuk validasi form Screening Scoring
 */
export const screeningScoringSchema = z.object({
  name: z.string().nonempty({ message: "Nama screening wajib diisi" }),
  type: z.union([
    z.enum(["HT", "DM"]),
    z.literal(""), // untuk fallback saat form kosong
  ]),
});

export type ScreeningScoringType = z.infer<typeof screeningScoringSchema>;
