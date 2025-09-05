"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUp, FileImage, Paperclip, X } from "lucide-react";
import { useForm } from "react-hook-form";
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
  discussionMessageAnswerSchema,
  DiscussionMessageAnswerType,
} from "@/validators/discussion/discussion-message-answer-validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAddNewDiscussionMessageAnswer } from "@/http/discussions/answer/create-discussion-message-answer";
import { motion } from "framer-motion";

interface MessageDiscussionAnswerProps {
  id: string;
}

export default function MessageDiscussionAnswer({
  id,
}: MessageDiscussionAnswerProps) {
  const form = useForm<DiscussionMessageAnswerType>({
    resolver: zodResolver(discussionMessageAnswerSchema),
    defaultValues: {
      discussion_comment_id: id,
      image: undefined,
      comment: "",
    },
    mode: "onChange",
  });

  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      form.setValue("image", file);
    }
  };

  const handleClickPaperclip = () => {
    fileInputRef.current?.click();
  };

  const queryClient = useQueryClient();

  const { mutate: addHTHandler, isPending } = useAddNewDiscussionMessageAnswer({
    onError: () => {
      toast.error("Gagal mengirim balasan!");
    },
    onSuccess: () => {
      toast.success("Balasan berhasil dikirim!");
      queryClient.invalidateQueries({
        queryKey: ["discussion-comment-answer"],
      });
      form.reset();
      setFileName(null);
    },
  });

  const onSubmit = (body: DiscussionMessageAnswerType) => {
    addHTHandler(body);
  };

  return (
    <motion.div
      className="w-full"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-y-3 rounded-xl border bg-white p-4 shadow-sm"
        >
          {fileName && (
            <div className="flex items-center justify-between gap-x-2 rounded-md border p-2 text-sm text-gray-600 bg-primary/10">
              <div className="flex items-center gap-x-2">
                <FileImage className="h-5 w-5" />
                <span className="truncate max-w-[200px]">{fileName}</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setFileName(null);
                  form.setValue("image", undefined);
                }}
              >
                <X className="text-muted-foreground h-4 w-4 cursor-pointer" />
              </button>
            </div>
          )}

          <FormField
            control={form.control}
            name="comment"
            render={({ field }) => (
              <FormItem className="flex-grow">
                <FormControl>
                  <Textarea
                    placeholder="Tulis balasan di sini..."
                    className="resize-none border-0 p-0 shadow-none focus-visible:ring-0 text-sm"
                    rows={3}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex w-full items-center justify-between">
            <button type="button" onClick={handleClickPaperclip}>
              <Paperclip className="text-muted-foreground h-6 w-6 cursor-pointer" />
            </button>
            <Button
              type="submit"
              disabled={isPending}
              className="rounded-full"
              size="icon"
            >
              <ArrowUp className="h-5 w-5" />
            </Button>
          </div>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />
        </form>
      </Form>
    </motion.div>
  );
}
