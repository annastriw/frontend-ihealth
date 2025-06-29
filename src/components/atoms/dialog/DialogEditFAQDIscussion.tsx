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
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import { useEffect } from "react";
import { FAQDiscussion } from "@/types/faq/faq";
import {
  faqDiscussionSchema,
  FAQDiscussionType,
} from "@/validators/faq/faq-discussion-validator";
import { useEditFAQDiscussion } from "@/http/faq/update-faq";

interface DialogEditFAQDiscussionProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  data: FAQDiscussion;
  id: string;
}

export default function DialogEditFAQDiscussion({
  open,
  setOpen,
  data,
  id,
}: DialogEditFAQDiscussionProps) {
  const form = useForm<FAQDiscussionType>({
    resolver: zodResolver(faqDiscussionSchema),
    defaultValues: {
      question: data.question,
      answer: data.answer,
    },
    mode: "onChange",
  });

  useEffect(() => {
    form.reset({
      question: data.question,
      answer: data.answer,
    });
  }, [data, form]);

  const queryClient = useQueryClient();

  const { mutate: editPreTestHandler, isPending } = useEditFAQDiscussion({
    onError: () => {
      toast.error("Gagal memperbarui faq discussion!");
    },
    onSuccess: () => {
      toast.success("Berhasil memperbarui faq discussion!");
      queryClient.invalidateQueries({
        queryKey: ["pre-test-list"],
      });
      setOpen(false);
    },
  });

  const onSubmit = (body: FAQDiscussionType) => {
    editPreTestHandler({ body, id });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Edit FAQ Discussion</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[80vh]">
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
                      Materi <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Pertanyaan" {...field} />
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
                      <Input type="text" placeholder="Jawaban" {...field} />
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
