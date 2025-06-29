import { z } from "zod";

export const hdSchema = z.object({
  module_id: z.string().nonempty(),
  content: z.string().nonempty(),
  name: z.string().nonempty(),
  file_path: z
    .instanceof(File)
    .refine((file) => file.type === "application/pdf", {
      message: "File harus berformat PDF",
    })
    .refine((file) => file.size <= 5 * 1024 * 1024, {
      message: "Ukuran file maksimal 5MB",
    })
    .nullable()
    .optional(),
});

export type HDType = z.infer<typeof hdSchema>;
