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
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
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
      file_path: null, // PDF baru opsional
    },
    mode: "onChange",
  });

  const { data: session } = useSession();
  const queryClient = useQueryClient();

  const { mutate: editModuleContent, isPending } = useEditModuleContent({
    onSuccess: () => {
      toast.success("Konten berhasil diperbarui");
      queryClient.invalidateQueries();
      setOpen(false);
    },
    onError: () => {
      toast.error("Gagal memperbarui konten");
    },
  });

  useEffect(() => {
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
    const formData = new FormData();
    formData.append("sub_module_id", values.sub_module_id);
    formData.append("name", values.name);
    formData.append("content", values.content);
    formData.append("type", values.type);
    formData.append("video_url", values.video_url);
    if (values.file_path instanceof File) {
      formData.append("file_path", values.file_path);
    }

    editModuleContent({
      id: data.id,
      token: session?.access_token as string,
      body: formData,
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Konten Materi</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[80vh]">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Judul</FormLabel>
                    <FormControl>
                      <Input placeholder="Judul materi" {...field} />
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
                      <Input placeholder="Isi konten materi" {...field} />
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
                      <Input placeholder="pretest/posttest/materi" {...field} />
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
                    <FormLabel>URL Video</FormLabel>
                    <FormControl>
                      <Input placeholder="https://youtube.com/..." {...field} />
                    </FormControl>
                    <FormMessage />
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
