import { z } from "zod";

export const preTestSchema = z.object({
  sub_module_id: z.string().nonempty(),
  question_set_id: z.string().nonempty(),
  name: z.string().nonempty(),
});

export type PreTestType = z.infer<typeof preTestSchema>;
