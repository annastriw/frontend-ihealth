import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSession } from "next-auth/react";
import { useGetDetailFAQDiscussion } from "@/http/faq/get-detail-faq";

interface DialogDetailFAQDiscussionProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  id: string;
}

export default function DialogDetailFAQDiscussion({
  open,
  setOpen,
  id,
}: DialogDetailFAQDiscussionProps) {
  const { data: session, status } = useSession();

  const { data: faq } = useGetDetailFAQDiscussion(
    id,
    session?.access_token as string,
    {
      enabled: status === "authenticated",
    },
  );
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Detail FAQ Discussion</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[80vh]">
          <div className="space-y-4">
            <div className="flex flex-col gap-1">
              <h1 className="text-muted-foreground">Pertanyaan</h1>
              <p>{faq?.data.question}</p>
            </div>
            <div className="flex flex-col gap-1">
              <h1 className="text-muted-foreground">Jawaban</h1>
              <p>{faq?.data.answer}</p>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
