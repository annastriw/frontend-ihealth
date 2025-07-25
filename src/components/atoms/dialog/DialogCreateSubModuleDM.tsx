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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import { dmSchema, DMType } from "@/validators/sub-modules/dm-validator";
import { useAddNewDM } from "@/http/sub-modules/create-dm";
import QuillEditor from "../quill/QuillEditor";
import { useGetAllModules } from "@/http/modulels/get-all-modules";
import { useSession } from "next-auth/react";

interface DialogCreateArticleProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function DialogCreateSubModuleDM({
  open,
  setOpen,
}: DialogCreateArticleProps) {
  const form = useForm<DMType>({
    resolver: zodResolver(dmSchema),
    defaultValues: {
      module_id: "",
      video_url: "",
      name: "",
      content: "",
    },
    mode: "onChange",
  });

  const queryClient = useQueryClient();

  const { mutate: addDMHandler, isPending } = useAddNewDM({
    onError: () => {
      toast.error("Gagal menambahkan sub materi Diabetes Melitus!");
    },
    onSuccess: () => {
      toast.success("Berhasil menambahkan sub materi Diabetes Melitus!");
      queryClient.invalidateQueries({
        queryKey: ["dm-list"],
      });
    },
  });

  const onSubmit = (body: DMType) => {
    addDMHandler(body);
    setOpen(false);
  };

  const { data: session, status } = useSession();
  const { data } = useGetAllModules(session?.access_token as string, undefined, {
  enabled: status === "authenticated",
});



  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Tambah Sub Materi Diabetes Melitus</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[80vh]">
          <Form {...form}>
            <form
              className="space-y-5 pt-4"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name="module_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Materi</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Pilih materi yang tersedia" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Materi</SelectLabel>
                            {data?.map((module) => (
                              <SelectItem key={module.id} value={module.id}>
                                {module.name}
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
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama Sub Materi</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Masukkan nama sub materi"
                        {...field}
                      />
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
                    <FormLabel>URL Video Youtube</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="V3DRb9d6eQM" {...field} />
                    </FormControl>
                    <FormDescription>
                      * https://www.youtube.com/watch?v=V3DRb9d6eQM, yang diisi
                      hanya <code>V3DRb9d6eQM</code>
                    </FormDescription>
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
                      <QuillEditor
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end">
                <Button type="submit" disabled={isPending}>
                  {isPending ? "Loading..." : "Tambahkan"}
                </Button>
              </div>
            </form>
          </Form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
