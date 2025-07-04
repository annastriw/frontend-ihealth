import { z } from "zod";

export const screeningSchema = z.object({
  question_set_id: z.string().nonempty(),
  name: z.string().nonempty(),
  type: z.union([
    z.enum(["HT", "DM"]),
    z.literal(""),
  ]),
});

export type ScreeningType = z.infer<typeof screeningSchema>;