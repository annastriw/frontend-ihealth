"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
import { useAddNewQuestionBank } from "@/http/question-banks/create-question-bank";
import {
  questionBankSchema,
  QuestionBankType,
} from "@/validators/question-banks/question-bank-validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function FormCreateQuestionBank() {
  const router = useRouter();

  const form = useForm<QuestionBankType>({
    resolver: zodResolver(questionBankSchema),
    defaultValues: {
      name: "",
    },
    mode: "onChange",
  });

  const { mutate: addNewQuestionTalkHandler, isPending } =
    useAddNewQuestionBank({
      onError: () => {
        toast.error("Gagal membuat bank soal baru!");
      },
      onSuccess: () => {
        toast.success("Berhasil membuat bank soal baru!");
        router.push("/dashboard/admin/question-banks");
      },
    });

  const onSubmit = (body: QuestionBankType) => {
    addNewQuestionTalkHandler({ ...body });
  };
  return (
    <div>
      <Card>
        <CardContent>
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
                    <FormDescription>
                      * Misalnya: Pre Test Manajemen Diri.
                    </FormDescription>
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
        </CardContent>
      </Card>
    </div>
  );
}
