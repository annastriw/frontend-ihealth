import { useEffect, useMemo } from "react";
import { useForm, useFieldArray } from "react-hook-form";
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
import { useEditQuestion } from "@/http/question/edit-question";
import {
  QuestionType,
  questionSchema,
} from "@/validators/question/question-validator";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Question } from "@/types/questions/question";

interface FormEditQuestionProps {
  id: string;
  data?: Question;
}

export default function FormEditQuestion({ id, data }: FormEditQuestionProps) {
  const router = useRouter();

  const defaultValues = useMemo(
    () => ({
      question_set_id: data?.question_set_id || "",
      question_text: data?.question_text || "",
      options: data?.options?.map((option) => ({
        option_text: option.option_text || "",
        score: option.score ?? null,
        option_index: option.option_index,
      })) ?? [
        { option_text: "", score: null, option_index: 1 },
        { option_text: "", score: null, option_index: 2 },
      ],
    }),
    [data],
  );

  const form = useForm<QuestionType>({
    resolver: zodResolver(questionSchema),
    defaultValues: defaultValues,
    mode: "onChange",
  });

  const { fields } = useFieldArray({
    control: form.control,
    name: "options",
  });

  const { mutate: editQuestionHandler, isPending } = useEditQuestion({
    onError: () => {
      toast.error("Gagal mengupdate soal!");
      router.back();
    },
    onSuccess: () => {
      toast.success("Berhasil mengupdate soal!");
      router.back();
    },
  });

  const onSubmit = (body: QuestionType) => {
    editQuestionHandler({ id, body });
  };

  useEffect(() => {
    if (data) {
      form.reset(defaultValues); // reset form ketika data berubah
    }
  }, [data, form, defaultValues]);

  return (
    <div>
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

          {fields.map((field, index) => (
            <div key={field.id} className="space-y-4">
              <FormField
                control={form.control}
                name={`options.${index}.option_text`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Pilihan {index + 1}{" "}
                      <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={`Masukkan pilihan ${index + 1}`}
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
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Urutan Pilihan Jawaban
                      <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={`Masukkan pilihan ${index + 1}`}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {form.getValues(`options.${index}.score`) !== null && (
                <FormField
                  control={form.control}
                  name={`options.${index}.score`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Skor Pilihan {index + 1}</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder={`Masukkan skor pilihan ${index + 1}`}
                          value={field.value ?? ""}
                          onChange={field.onChange}
                          onBlur={field.onBlur}
                          name={field.name}
                          ref={field.ref}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>
          ))}

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
