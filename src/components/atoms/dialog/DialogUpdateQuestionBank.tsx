import FormUpdateQuestionBank from "@/components/molecules/form/question-banks/FormUpdateQuestionBank";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { QuestionBank } from "@/types/question-bank/question-bank";

interface DialogUpdateQuestionBankProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  data?: QuestionBank;
  id: string;
}

export default function DialogUpdateQuestionBank({
  open,
  setOpen,
  id,
  data,
}: DialogUpdateQuestionBankProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Bank Soal</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[80vh] pt-4">
          <FormUpdateQuestionBank data={data} id={id} setOpen={setOpen} />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
