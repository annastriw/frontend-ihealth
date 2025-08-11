"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAddNewFAQDiscussion } from "@/http/faq/create-faq";
import {
  faqDiscussionSchema,
  FAQDiscussionType,
} from "@/validators/faq/faq-discussion-validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function FormCreateFAQDiscussion() {
  const router = useRouter();
  const form = useForm<FAQDiscussionType>({
    resolver: zodResolver(faqDiscussionSchema),
    defaultValues: {
      question: "",
      answer: "",
    },
    mode: "onChange",
  });

  const { mutate: addFAQDiscussionHandler, isPending } = useAddNewFAQDiscussion(
    {
      onError: () => {
        toast.error("Gagal menambahkan faq baru!");
      },
      onSuccess: () => {
        toast.success("Berhasil menambahkan faq baru!");
        router.push("/dashboard/admin/faqs");
      },
    },
  );

  const onSubmit = (body: FAQDiscussionType) => {
    addFAQDiscussionHandler(body);
  };
  return (
    <Card>
      <CardContent>
        <Form {...form}>
          <form
            className="space-y-5 pt-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
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
                {isPending ? "Loading..." : "Tambahkan"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
