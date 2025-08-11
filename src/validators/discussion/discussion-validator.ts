import { z } from "zod";

export const discussionSchema = z.object({
  title: z.string().max(30, { message: "Topik diskusi maksimal 30 karakter" }),
});

export type DiscussionType = z.infer<typeof discussionSchema>;
