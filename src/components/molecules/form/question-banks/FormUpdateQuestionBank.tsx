"use client";

import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  questionBankSchema,
  QuestionBankType,
} from "@/validators/question-banks/question-bank-validator";
import { useQueryClient } from "@tanstack/react-query";
import { QuestionBank } from "@/types/question-bank/question-bank";
import { useEditQuestionBank } from "@/http/question-banks/update-question-bank";

interface FormUpdateQuestionBankProps {
  id: string;
  data?: QuestionBank;
  setOpen: (open: boolean) => void;
}

export default function FormUpdateQuestionBank({
  id,
  data,
  setOpen,
}: FormUpdateQuestionBankProps) {
  const defaultValues = useMemo(
    () => ({
      name: data?.name || "",
    }),
    [data],
  );

  const form = useForm<QuestionBankType>({
    resolver: zodResolver(questionBankSchema),
    defaultValues: defaultValues,
    mode: "onChange",
  });

  const queryClient = useQueryClient();

  const { mutate: editFAQDiscussionHandler, isPending } = useEditQuestionBank({
    onError: () => {
      toast.error("Gagal memperbarui bank soal!");
    },
    onSuccess: () => {
      toast.success("Berhasil memperbarui bank soal!");
      queryClient.invalidateQueries({
        queryKey: ["question-banks-list"],
      });
      setOpen(false);
    },
  });

  const onSubmit = (body: QuestionBankType) => {
    editFAQDiscussionHandler({ id, body });
  };

  return (
    <div>
      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Nama Bank Soal <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Masukkan nama bank soal"
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
    </div>
  );
}
