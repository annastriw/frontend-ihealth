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
import {
  discussionSchema,
  DiscussionType,
} from "@/validators/discussion/discussion-validator";
import { useAddNewDiscussion } from "@/http/discussions/create-discussion";

interface DialogCreateDiscussionProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function DialogCreateDiscussion({
  open,
  setOpen,
}: DialogCreateDiscussionProps) {
  const form = useForm<DiscussionType>({
    resolver: zodResolver(discussionSchema),
    defaultValues: {
      title: "",
    },
    mode: "onChange",
  });

  const queryClient = useQueryClient();

  const { mutate: addCAPDHandler, isPending } = useAddNewDiscussion({
    onError: () => {
      toast.error("Gagal menambahkan topik disuksi baru!");
    },
    onSuccess: () => {
      toast.success("Berhasil menambahkan topik disuksi baru!");
      queryClient.invalidateQueries({
        queryKey: ["discussion-list"],
      });
      setOpen(false);
    },
  });

  const onSubmit = (body: DiscussionType) => {
    addCAPDHandler(body);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Tambah Topik Diskusi</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[80vh]">
          <Form {...form}>
            <form
              className="space-y-5 pt-4"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Topik Diskusi</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Masukkan topik diskusi"
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
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
