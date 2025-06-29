import { z } from "zod";

export const screeningSchema = z.object({
  question_set_id: z.string().nonempty(),
  name: z.string().nonempty(),
});

export type ScreeningType = z.infer<typeof screeningSchema>;
