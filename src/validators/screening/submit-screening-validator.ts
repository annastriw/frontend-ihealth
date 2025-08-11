import { z } from "zod";

export const answerSchema = z.object({
  question_id: z.string().uuid(),
  selected_option_id: z.string().uuid(),
});

export const submitScreeningSchema = z.object({
  screening_id: z.string().uuid(),
  answers: z.array(answerSchema).min(1, "Minimal satu jawaban diperlukan"),
});

export type SubmitScreeningType = z.infer<typeof submitScreeningSchema>;
