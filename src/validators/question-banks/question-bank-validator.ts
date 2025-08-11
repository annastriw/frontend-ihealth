import { z } from "zod";

export const questionBankSchema = z.object({
  name: z.string().nonempty(),
});

export type QuestionBankType = z.infer<typeof questionBankSchema>;
