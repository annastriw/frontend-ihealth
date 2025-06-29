import { z } from "zod";

export const moduleSchema = z.object({
  name: z.string().nonempty(),
  description: z.string().nullable(),
  type: z.string(),
});

export type ModuleType = z.infer<typeof moduleSchema>;
