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
import { useRouter } from "next/navigation";
import { FAQDiscussion } from "@/types/faq/faq";
import {
  faqDiscussionSchema,
  FAQDiscussionType,
} from "@/validators/faq/faq-discussion-validator";
import { useEditFAQDiscussion } from "@/http/faq/update-faq";

interface FormEditFAQDiscussionProps {
  id: string;
  data?: FAQDiscussion;
}

export default function FormEditFAQDiscussion({
  id,
  data,
}: FormEditFAQDiscussionProps) {
  const router = useRouter();

  const defaultValues = useMemo(
    () => ({
      question: data?.question || "",
      answer: data?.answer || "",
    }),
    [data],
  );

  const form = useForm<FAQDiscussionType>({
    resolver: zodResolver(faqDiscussionSchema),
    defaultValues: defaultValues,
    mode: "onChange",
  });

  const { mutate: editFAQDiscussionHandler, isPending } = useEditFAQDiscussion({
    onError: () => {
      toast.error("Gagal memperbarui faq!");
      router.refresh();
    },
    onSuccess: () => {
      toast.success("Berhasil memperbarui faq!");
      router.push("/dashboard/admin/faqs");
    },
  });

  const onSubmit = (body: FAQDiscussionType) => {
    editFAQDiscussionHandler({ id, body });
  };

  return (
    <div>
      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="question"
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

          <FormField
            control={form.control}
            name="answer"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Jawaban <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Masukkan jawaban dari pertanyaan"
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
