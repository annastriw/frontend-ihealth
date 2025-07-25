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
import QuillEditor from "../quill/QuillEditor";
import { useGetAllModules } from "@/http/modulels/get-all-modules";
import { useSession } from "next-auth/react";
import { htSchema, HTType } from "@/validators/sub-modules/ht-validator";
import { useAddNewHT } from "@/http/sub-modules/create-ht";

interface DialogCreateHTProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function DialogCreateSubModuleHT({ open, setOpen }: DialogCreateHTProps) {
  const form = useForm<HTType>({
    resolver: zodResolver(htSchema),
    defaultValues: {
      module_id: "",
      file_path: undefined,
      name: "",
      content: "",
    },
    mode: "onChange",
  });

  const queryClient = useQueryClient();

  const { mutate: addHTHandler, isPending } = useAddNewHT({
    onError: () => {
      toast.error("Gagal menambahkan sub materi HT!");
    },
    onSuccess: () => {
      toast.success("Berhasil menambahkan sub materi HT!");
      queryClient.invalidateQueries({
        queryKey: ["ht-list"],
      });
      setOpen(false);
    },
  });

  const onSubmit = (body: HTType) => {
    addHTHandler(body);
  };

  const { data: session, status } = useSession();
  const { data } = useGetAllModules(session?.access_token as string, undefined, {
  enabled: status === "authenticated",
});



  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Tambah Sub Materi HT</DialogTitle>
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
                name="file_path"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>File Materi (PDF)</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept="application/pdf"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          field.onChange(file);
                        }}
                      />
                    </FormControl>
                    <FormDescription>
                      * File wajib berformat pdf dan maksimal 5 MB
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
