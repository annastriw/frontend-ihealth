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
import { useSession } from "next-auth/react";
import {
  subModuleSchema,
  SubModuleType,
} from "@/validators/sub-modules/sub-modules-validator";
import { useGetAllModules } from "@/http/modulels/get-all-modules";
import { SubModules } from "@/types/modules/modules";
import { useEditSubModules } from "@/http/sub-modules/edit-sub-modules";
import { useEffect } from "react";

interface DialogEditSubModuleProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  data: SubModules;
  id: string;
}

export default function DialogEditSubModule({
  open,
  setOpen,
  data,
  id,
}: DialogEditSubModuleProps) {
  const form = useForm<SubModuleType>({
    resolver: zodResolver(subModuleSchema),
    defaultValues: {
      module_id: data.module_id,
      name: data.name,
      description: data.description,
    },
    mode: "onChange",
  });

  useEffect(() => {
    form.reset({
      module_id: data.module_id,
      name: data.name,
      description: data.description,
    });
  }, [data, form]);

  const queryClient = useQueryClient();

  const { mutate: editSubModulesHandler, isPending } = useEditSubModules({
    onError: () => {
      toast.error("Gagal memperbarui materi!");
    },
    onSuccess: () => {
      toast.success("Berhasil memperbarui materi!");
      queryClient.invalidateQueries({
        queryKey: ["sub-modules"],
      });
      setOpen(false);
    },
  });

  const onSubmit = (body: SubModuleType) => {
    editSubModulesHandler({ body, id });
  };

  const { data: session, status } = useSession();
  const { data: modules } = useGetAllModules(session?.access_token as string, {
    enabled: status === "authenticated",
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Materi</DialogTitle>
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
                    <FormLabel>
                      Modul <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Pilih modul yang tersedia" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Modul</SelectLabel>
                            {modules?.data.map((module) => (
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
                    <FormLabel>
                      Nama Materi <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Ketidaknyamanan"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Deskripsi</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Masukkan deskripsi"
                        {...field}
                        value={field.value ?? ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end">
                <Button type="submit" disabled={isPending}>
                  {isPending ? "Loading..." : "Simpan"}
                </Button>
              </div>
            </form>
          </Form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
