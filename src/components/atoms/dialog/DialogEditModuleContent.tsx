"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useQueryClient } from "@tanstack/react-query";
import {
  moduleContentSchema,
  ModuleContentType,
} from "@/validators/module-contents/module-content-validator";
import { ModuleContent } from "@/types/modules/modules";
import { useEditModuleContent } from "@/http/module-content/edit-module-content";
import { useGetAllSubModulesNoCategory } from "@/http/sub-modules/get-all-sub-modules-no-category";
import QuillEditor from "@/components/atoms/quill/QuillEditor";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  data: ModuleContent;
}

export default function DialogEditModuleContent({
  open,
  setOpen,
  data,
}: Props) {
  const form = useForm<ModuleContentType>({
    resolver: zodResolver(moduleContentSchema),
    defaultValues: {
      sub_module_id: data.sub_module_id,
      name: data.name,
      content: data.content,
      type: data.type,
      video_url: data.video_url,
      file_path: null,
    },
    mode: "onChange",
  });

  const { data: session } = useSession();
  const queryClient = useQueryClient();

  const { data: subModulesData } = useGetAllSubModulesNoCategory(
    session?.access_token as string,
    {
      enabled: !!session?.access_token,
    },
  );

  const { mutate: editModuleContent, isPending } = useEditModuleContent({
    onSuccess: (res) => {
      console.log("✅ [SUCCESS] Konten berhasil diperbarui:", res);
      toast.success("Konten berhasil diperbarui");
      queryClient.invalidateQueries();
      setOpen(false);
    },
    onError: (err) => {
      console.error("❌ [ERROR] Gagal memperbarui konten:", err);
      toast.error("Gagal memperbarui konten");
    },
  });

  useEffect(() => {
    console.log("🌀 [RESET FORM] data konten yang diterima:", data);

    form.reset({
      sub_module_id: data.sub_module_id,
      name: data.name,
      content: data.content,
      type: data.type,
      video_url: data.video_url,
      file_path: null,
    });
  }, [data, form]);

  const onSubmit = (values: ModuleContentType) => {
    console.log("🚀 [SUBMIT] Nilai form:", values);

    const formData = new FormData();
    formData.append("sub_module_id", values.sub_module_id);
    formData.append("name", values.name);
    formData.append("content", values.content);
    formData.append("type", values.type);
    formData.append("video_url", values.video_url);

    if (values.file_path instanceof File) {
      console.log("📄 [FILE] File PDF akan dikirim:", values.file_path.name);
      formData.append("file_path", values.file_path);
    } else {
      console.log("ℹ️ [FILE] Tidak ada file PDF baru yang diupload");
    }

    for (const pair of formData.entries()) {
      console.log("📦 FormData:", pair[0], pair[1]);
    }

    editModuleContent({
      id: data.id,
      token: session?.access_token as string,
      body: formData,
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Edit Konten Materi</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[80vh]">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 pt-4">
              <FormField
                control={form.control}
                name="sub_module_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Materi</FormLabel>
                    <FormControl>
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Pilih materi yang tersedia" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Materi</SelectLabel>
                            {subModulesData?.data.map((module) => (
                              <SelectItem key={module.id} value={module.id}>
                                {module.name}
                                <span className="uppercase"> ({module.module.type})</span>
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipe</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Pilih tipe" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Tipe</SelectLabel>
                            <SelectItem value="ht">Hipertensi</SelectItem>
                            <SelectItem value="dm">Diabetes Melitus</SelectItem>
                            <SelectItem value="km">Kesehatan Mental</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama Konten Materi</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Masukkan nama konten materi" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="video_url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      URL Video <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Masukkan URL video dari YouTube (contoh: QdU7Ztdd-sw)"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                    <FormDescription>
                      * Contoh URL: https://www.youtube.com/watch?v=QdU7Ztdd-sw — yang dimasukkan adalah: <code>QdU7Ztdd-sw</code>
                    </FormDescription>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="file_path"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Upload File PDF (opsional)</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept="application/pdf"
                        onChange={(e) => field.onChange(e.target.files?.[0] ?? null)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Konten</FormLabel>
                    <FormControl>
                      <QuillEditor value={field.value} onChange={field.onChange} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end">
                <Button type="submit" disabled={isPending}>
                  {isPending ? "Menyimpan..." : "Simpan"}
                </Button>
              </div>
            </form>
          </Form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
