import { z } from "zod";

export const subModuleSchema = z.object({
  module_id: z.string().nonempty(),
  name: z.string().nonempty(),
  description: z.string().nullable(),
});

export type SubModuleType = z.infer<typeof subModuleSchema>;
