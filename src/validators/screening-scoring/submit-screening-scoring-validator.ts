// src/validators/screening-scoring/submit-screening-scoring-validator.ts

import { z } from "zod";

/**
 * Schema untuk satu jawaban pertanyaan
 */
export const answerScoringSchema = z.object({
  question_id: z.string().uuid(),
  selected_option_id: z.string().uuid(),
});

/**
 * Schema untuk submit seluruh jawaban screening scoring
 */
export const submitScreeningScoringSchema = z.object({
  screening_scoring_id: z.string().uuid(),
  answers: z
    .array(answerScoringSchema)
    .min(1, { message: "Minimal satu jawaban diperlukan" }),
});

export type SubmitScreeningScoringType = z.infer<
  typeof submitScreeningScoringSchema
>;
