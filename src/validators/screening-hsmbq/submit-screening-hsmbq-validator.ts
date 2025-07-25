import { z } from "zod";

export const SubmitScreeningHSMBQValidator = z.object({
  user_id: z.string(),
  answers: z
    .array(
      z.object({
        question_id: z.number(),
        score: z.number().min(0).max(4),
      }),
    )
    .length(40),
});

export type SubmitScreeningHSMBQValidatorType = z.infer<
  typeof SubmitScreeningHSMBQValidator
>;
