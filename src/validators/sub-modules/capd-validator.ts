import { z } from "zod";

export const capdSchema = z.object({
  module_id: z.string().nonempty(),
  name: z.string().nonempty(),
  video_url: z.string().nonempty(),
  content: z.string().nonempty(),
});

export type CAPDType = z.infer<typeof capdSchema>;
