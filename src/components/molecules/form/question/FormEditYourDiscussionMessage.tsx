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
import { DiscussionComment } from "@/types/discussions/discussion";
import { useEditYourQuestion } from "@/http/discussions/update-your-question";
import {
  discussionMessageSchema,
  DiscussionMessageType,
} from "@/validators/discussion/discussion-message-validator";

interface FormEditYourQuestionProps {
  id: string;
  data?: DiscussionComment;
}

export default function FormEditYourQuestion({
  id,
  data,
}: FormEditYourQuestionProps) {
  const router = useRouter();

  const defaultValues = useMemo(
    () => ({
      disscussion_id: data?.discussion_id || "",
      comment: data?.comment || "",
    }),
    [data],
  );

  const form = useForm<DiscussionMessageType>({
    resolver: zodResolver(discussionMessageSchema),
    defaultValues: defaultValues,
    mode: "onChange",
  });

  const { mutate: editFAQDiscussionHandler, isPending } = useEditYourQuestion({
    onError: () => {
      toast.error("Gagal memperbarui pertanyaan anda!");
      router.refresh();
    },
    onSuccess: () => {
      toast.success("Berhasil memperbarui pertanyaan anda!");
      router.back();
    },
  });

  const onSubmit = (body: DiscussionMessageType) => {
    editFAQDiscussionHandler({ id, body });
  };

  return (
    <div>
      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="comment"
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
