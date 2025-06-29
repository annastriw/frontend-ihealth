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
  preTestSchema,
  PreTestType,
} from "@/validators/test/pre-test-validator";
import { useAddNewPreTest } from "@/http/test/create-pre-test";
import { useGetAllQuestionBanks } from "@/http/question-banks/get-all-question-bank";
import { useGetAllSubModulesNoCategory } from "@/http/sub-modules/get-all-sub-modules-no-category";

interface DialogCreateArticleProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function DialogCreatePreTest({
  open,
  setOpen,
}: DialogCreateArticleProps) {
  const form = useForm<PreTestType>({
    resolver: zodResolver(preTestSchema),
    defaultValues: {
      sub_module_id: "",
      question_set_id: "",
      name: "",
    },
    mode: "onChange",
  });

  const queryClient = useQueryClient();

  const { mutate: addCAPDHandler, isPending } = useAddNewPreTest({
    onError: () => {
      toast.error("Gagal menambahkan pre test!");
    },
    onSuccess: () => {
      toast.success("Berhasil menambahkan pre test!");
      queryClient.invalidateQueries({
        queryKey: ["pre-test-list"],
      });
      setOpen(false);
    },
  });

  const onSubmit = (body: PreTestType) => {
    addCAPDHandler(body);
  };

  const { data: session, status } = useSession();
  const { data } = useGetAllSubModulesNoCategory(
    session?.access_token as string,
    {
      enabled: status === "authenticated",
    },
  );

  const { data: questionBank } = useGetAllQuestionBanks(
    session?.access_token as string,
    {
      enabled: status === "authenticated",
    },
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Tambah Pre Test</DialogTitle>
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
                            {data?.data.map((module) => (
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
                    <FormLabel>Bank Soal</FormLabel>
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
                            {questionBank?.data.map((questionBank) => (
                              <SelectItem
                                key={questionBank.id}
                                value={questionBank.id}
                              >
                                {questionBank.name}
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
                    <FormLabel>Nama Pre Test</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Pre Test Anatomi Ginjal"
                        {...field}
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
