import { z } from "zod";

export const moduleContentSchema = z.object({
  sub_module_id: z.string().nonempty(),
  content: z.string().nonempty(),
  name: z.string().nonempty(),
  video_url: z.string().nonempty(),
  type: z.string().nonempty(),
  file_path: z
    .instanceof(File)
    .refine((file) => file.type === "application/pdf", {
      message: "File harus berformat PDF",
    })
    .nullable()
    .optional(),
});

export type ModuleContentType = z.infer<typeof moduleContentSchema>;
