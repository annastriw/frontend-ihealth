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
import { ScreeningScoring } from "@/types/screening-scoring/screening-scoring";
import {
  screeningScoringSchema,
  ScreeningScoringType,
} from "@/validators/screening-scoring/screening-scoring-validator";
import { useEditScreeningScoring } from "@/http/admin/screening-scoring/edit-screening-scoring";
import { useGetAllQuestionBanks } from "@/http/question-banks/get-all-question-bank";

interface DialogEditScreeningScoringProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  data: ScreeningScoring;
  id: string;
}

export default function DialogEditScreeningScoring({
  open,
  setOpen,
  data,
  id,
}: DialogEditScreeningScoringProps) {
  const form = useForm<ScreeningScoringType>({
    resolver: zodResolver(screeningScoringSchema),
    defaultValues: {
      question_set_id: data.question_set_id,
      name: data.name,
      type: data.type,
    },
    mode: "onChange",
  });

  useEffect(() => {
    form.reset({
      question_set_id: data.question_set_id,
      name: data.name,
      type: data.type,
    });
  }, [data, form]);

  const queryClient = useQueryClient();

  const { mutate: editScreeningScoringHandler, isPending } =
    useEditScreeningScoring({
      onError: () => {
        toast.error("Gagal memperbarui screening scoring!");
      },
      onSuccess: () => {
        toast.success("Berhasil memperbarui screening scoring!");
        queryClient.invalidateQueries({
          queryKey: ["screening-scoring-list"],
        });
        setOpen(false);
      },
    });

  const onSubmit = (body: ScreeningScoringType) => {
    editScreeningScoringHandler({ body, id });
  };

  const { data: session, status } = useSession();
  const { data: questionBanks } = useGetAllQuestionBanks(
    session?.access_token as string,
    {
      enabled: status === "authenticated",
    },
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Screening Scoring</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[80vh]">
          <Form {...form}>
            <form
              className="space-y-5 pt-4"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              {/* Bank Soal */}
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
                          <SelectValue placeholder="Pilih bank soal" />
                        </SelectTrigger>
                        <SelectContent position="popper" className="z-50">
                          <SelectGroup>
                            <SelectLabel>Bank Soal</SelectLabel>
                            {questionBanks?.data.map((bank) => (
                              <SelectItem key={bank.id} value={bank.id}>
                                {bank.name}
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

              {/* Tipe Screening */}
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Tipe Screening <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Pilih tipe screening" />
                        </SelectTrigger>
                        <SelectContent position="popper" className="z-50">
                          <SelectGroup>
                            <SelectItem value="HT">Hipertensi</SelectItem>
                            <SelectItem value="DM">Diabetes Melitus</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Nama Screening */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Nama Screening <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Masukkan nama screening"
                        {...field}
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
