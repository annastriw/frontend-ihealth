// src/validators/screening-dass/submit-screening-dass-validator.ts
import { z } from "zod";

export const SubmitScreeningDASSValidator = z.object({
  user_id: z.string(),
  answers: z
    .array(
      z.object({
        question_id: z.number(),
        score: z.number().min(0).max(3),
        category: z.enum(["Stres", "Kecemasan", "Depresi"]),
      }),
    )
    .length(21),
});

export type SubmitScreeningDASSValidatorType = z.infer<
  typeof SubmitScreeningDASSValidator
>;
