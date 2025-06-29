import { z } from "zod";

const optionSchema = z.object({
  option_text: z.string().nonempty(),
  option_index: z.number().positive(),
  score: z.preprocess((val) => {
    if (val === "" || val === null || val === undefined) return null;
    const num = Number(val);
    return isNaN(num) ? null : num;
  }, z.number().nullable()),
});

export const questionSchema = z.object({
  question_set_id: z.string().uuid(),
  question_text: z.string().nonempty(),
  options: z
    .array(optionSchema)
    .min(2, { message: "Minimal harus ada 2 opsi" }),
});

export type QuestionType = z.infer<typeof questionSchema>;
