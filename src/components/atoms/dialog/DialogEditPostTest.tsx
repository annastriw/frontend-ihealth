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
import { useGetAllQuestionBanks } from "@/http/question-banks/get-all-question-bank";
import { PostTest } from "@/types/test/post-test";
import {
  postTestSchema,
  PostTestType,
} from "@/validators/test/post-test-validator";
import { useEditPostTest } from "@/http/admin/test/post-test/edit-post-test";
import { useGetAllSubModulesNoCategory } from "@/http/sub-modules/get-all-sub-modules-no-category";

interface DialogEditPostTestProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  data: PostTest;
  id: string;
}

export default function DialogEditPostTest({
  open,
  setOpen,
  data,
  id,
}: DialogEditPostTestProps) {
  const form = useForm<PostTestType>({
    resolver: zodResolver(postTestSchema),
    defaultValues: {
      sub_module_id: data.sub_module_id,
      question_set_id: data.question_set_id,
      name: data.name,
    },
    mode: "onChange",
  });

  useEffect(() => {
    form.reset({
      question_set_id: data.question_set_id,
      name: data.name,
      sub_module_id: data.sub_module_id,
    });
  }, [data, form]);

  const queryClient = useQueryClient();

  const { mutate: editPostTestHandler, isPending } = useEditPostTest({
    onError: () => {
      toast.error("Gagal memperbarui post test!");
    },
    onSuccess: () => {
      toast.success("Berhasil memperbarui post test!");
      queryClient.invalidateQueries({
        queryKey: ["post-test-list"],
      });
      setOpen(false);
    },
  });

  const onSubmit = (body: PostTestType) => {
    editPostTestHandler({ body, id });
  };

  const { data: session, status } = useSession();
  const { data: modules } = useGetAllQuestionBanks(
    session?.access_token as string,
    {
      enabled: status === "authenticated",
    },
  );

  const { data: subModules } = useGetAllSubModulesNoCategory(
    session?.access_token as string,
    {
      enabled: status === "authenticated",
    },
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Edit Post Test</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[80vh]">
          <Form {...form}>
            <form
              className="space-y-5 pt-4"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name="sub_module_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Materi <span className="text-red-500">*</span>
                    </FormLabel>
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
                            {subModules?.data.map((module) => (
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
                name="question_set_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Bank Soal <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Pilih bank soal yang tersedia" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Bank Soal</SelectLabel>
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
