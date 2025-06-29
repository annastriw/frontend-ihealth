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
import { useEffect } from "react";
import { Screening } from "@/types/screening/screening";
import {
  screeningSchema,
  ScreeningType,
} from "@/validators/screening/screening-validator";
import { useEditScreening } from "@/http/admin/screening/edit-screening";
import { useGetAllQuestionBanks } from "@/http/question-banks/get-all-question-bank";

interface DialogEditScreeningProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  data: Screening;
  id: string;
}

export default function DialogEditScreening({
  open,
  setOpen,
  data,
  id,
}: DialogEditScreeningProps) {
  const form = useForm<ScreeningType>({
    resolver: zodResolver(screeningSchema),
    defaultValues: {
      question_set_id: data.question_set_id,
      name: data.name,
    },
    mode: "onChange",
  });

  useEffect(() => {
    form.reset({
      question_set_id: data.question_set_id,
      name: data.name,
    });
  }, [data, form]);

  const queryClient = useQueryClient();

  const { mutate: editScreeningHandler, isPending } = useEditScreening({
    onError: () => {
      toast.error("Gagal memperbarui screening!");
    },
    onSuccess: () => {
      toast.success("Berhasil memperbarui screening!");
      queryClient.invalidateQueries({
        queryKey: ["screening-list"],
      });
      setOpen(false);
    },
  });

  const onSubmit = (body: ScreeningType) => {
    editScreeningHandler({ body, id });
  };

  const { data: session, status } = useSession();
  const { data: modules } = useGetAllQuestionBanks(
    session?.access_token as string,
    {
      enabled: status === "authenticated",
    },
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Screening</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[80vh]">
          <Form {...form}>
            <form
              className="space-y-5 pt-4"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name="question_set_id"
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
                      <Input type="text" placeholder="Screening" {...field} />
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
