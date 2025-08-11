import { z } from "zod";

export const faqDiscussionSchema = z.object({
  answer: z.string(),
  question: z.string(),
});

export type FAQDiscussionType = z.infer<typeof faqDiscussionSchema>;
