import { z } from "zod";

// Validasi dengan console.log untuk debugging
export const moduleContentSchema = z
  .object({
    sub_module_id: z.string().nonempty("Sub Modul wajib diisi"),
    content: z.string().nonempty("Konten wajib diisi"),
    name: z.string().nonempty("Nama konten wajib diisi"),
    video_url: z.string().nonempty("URL Video wajib diisi"),
    type: z.string().nonempty("Tipe wajib diisi"),
    file_path: z
      .instanceof(File)
      .refine((file) => file.type === "application/pdf", {
        message: "File harus berformat PDF",
      })
      .nullable()
      .optional(),
  })
  .superRefine((data, ctx) => {
    // Debug log: tampilkan data yang masuk ke validator
    console.log("🧪 [ZOD] Validating form values:", data);

    // (Tambahan custom logic bisa dimasukkan di sini kalau perlu)
  });

export type ModuleContentType = z.infer<typeof moduleContentSchema>;
