"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
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
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  questionSchema,
  QuestionType,
} from "@/validators/question/question-validator";
import { useAddNewQuestion } from "@/http/question/create-question";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";

interface FormCreateQuestionProps {
  id: string;
}

export default function FormCreateQuestion({ id }: FormCreateQuestionProps) {
  const router = useRouter();
  const [isScreening, setIsScreening] = useState(false);

  const form = useForm<QuestionType>({
    resolver: zodResolver(questionSchema),
    defaultValues: {
      question_set_id: id,
      question_text: "",
      options: [
        { option_text: "", score: null, option_index: 1 },
        { option_text: "", score: null, option_index: 2 },
      ],
    },

    mode: "onChange",
  });

  const { fields, append } = useFieldArray({
    control: form.control,
    name: "options",
  });

  useEffect(() => {
    if (isScreening) {
      fields.forEach((_, index) => {
        form.setValue(`options.${index}.score`, null);
      });
    }
  }, [isScreening, fields, form]);

  const { mutate: addNewQuestionTalkHandler, isPending } = useAddNewQuestion({
    onError: () => {
      toast.error("Gagal membuat soal baru!");
    },
    onSuccess: () => {
      toast.success("Berhasil membuat soal baru!");
      router.push(`/dashboard/admin/question-banks/${id}`);
    },
  });

  const onSubmit = (body: QuestionType) => {
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
                name="question_text"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Pertanyaan <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Masukkan pertanyaan"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="mb-6 space-y-2">
                <FormLabel className="mb-4">
                  Tipe Screening <span className="text-red-500">*</span>
                </FormLabel>
                <div className="flex items-center gap-3">
                  <Checkbox
                    checked={isScreening}
                    onCheckedChange={(checked) => setIsScreening(!!checked)}
                  />
                  <p className="text-sm">Ya, Screening</p>
                </div>
                <FormDescription>
                  *Jika bukan screening abaikan saja (tidak usah dicentang)
                  karena screening tidak ada skor.
                </FormDescription>
              </div>

              <div>
                <FormLabel className="mb-4">
                  Pilihan Jawaban <span className="text-red-500">*</span>
                </FormLabel>
                <div className="space-y-4">
                  {fields.map((field, index) => (
                    <div
                      key={field.id}
                      className="grid grid-cols-2 items-start gap-4"
                    >
                      <FormField
                        control={form.control}
                        name={`options.${index}.option_text`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Opsi {index + 1}</FormLabel>
                            <FormControl>
                              <Input
                                placeholder={`Opsi jawaban ${index + 1}`}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`options.${index}.option_index`}
                        render={() => (
                          <FormItem>
                            <FormLabel>No</FormLabel>
                            <FormControl>
                              <Input
                                readOnly
                                value={Number(index + 1)}
                                className="bg-muted cursor-not-allowed"
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      {!isScreening && (
                        <FormField
                          control={form.control}
                          name={`options.${index}.score`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Skor</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  placeholder="Masukkan skor jawaban"
                                  {...field}
                                  value={field.value ?? ""}
                                />
                              </FormControl>
                              <FormDescription>
                                * Tidak usah pakai (+ atau -), langsung angka.
                                Contoh: 4
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )}
                    </div>
                  ))}
                </div>

                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="mt-4"
                  onClick={() =>
                    append({
                      option_text: "",
                      score: null,
                      option_index: Number(fields.length + 1),
                    })
                  }
                >
                  <Plus className="mr-1 h-4 w-4" />
                  Tambah Opsi Jawaban
                </Button>
              </div>

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
