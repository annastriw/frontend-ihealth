import { z } from "zod";

export const SubmitScreeningDSMQValidator = z.object({
  user_id: z.string(),
  answers: z
    .array(
      z.object({
        question_id: z.number(),
        score: z.number().min(0).max(4),
      }),
    )
    .length(16), // DSMQ terdiri dari 16 soal
});

export type SubmitScreeningDSMQValidatorType = z.infer<
  typeof SubmitScreeningDSMQValidator
>;
