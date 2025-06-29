"use client";

import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import {
  discussionSchema,
  DiscussionType,
} from "@/validators/discussion/discussion-validator";
import { useAddNewDiscussion } from "@/http/discussions/create-discussion";

export default function MessageTopicDiscussion() {
  const form = useForm<DiscussionType>({
    resolver: zodResolver(discussionSchema),
    defaultValues: {
      title: "",
    },
    mode: "onChange",
  });

  const queryClient = useQueryClient();

  const { mutate: addHDHandler, isPending } = useAddNewDiscussion({
    onError: () => {
      toast.error("Gagal menambahkan topik diskusi!");
    },
    onSuccess: () => {
      toast.success("Berhasil menambahkan topik diskusi!");
      queryClient.invalidateQueries({
        queryKey: ["discussion-list"],
      });
      form.reset();
    },
  });

  const onSubmit = (body: DiscussionType) => {
    addHDHandler(body);
  };

  return (
    <div className="mb-6 w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-y-2 rounded-xl border p-4"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="flex-grow">
                <FormControl>
                  <Textarea
                    placeholder="Tulis topik diskusi disini..."
                    className="resize-none border-0 p-0 shadow-none"
                    rows={1}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex w-full items-center justify-end gap-x-2">
            <Button
              type="submit"
              disabled={isPending}
              className="rounded-full"
              size={"icon"}
            >
              <ArrowUp className="h-8 w-8" />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
