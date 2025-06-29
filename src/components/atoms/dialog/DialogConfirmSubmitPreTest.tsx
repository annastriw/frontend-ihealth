import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

interface DialogConfirmSubmitProps {
  open: boolean;
  onClose: () => void;
  unansweredNumbers: number[];
  onConfirm: () => void;
}

export default function DialogConfirmSubmit({
  open,
  onClose,
  unansweredNumbers,
  onConfirm,
}: DialogConfirmSubmitProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Yakin ingin submit jawaban?</DialogTitle>
        </DialogHeader>
        <div className="text-muted-foreground text-sm">
          {unansweredNumbers.length > 0 ? (
            <p>
              Anda belum menjawab soal nomor:{" "}
              <strong>{unansweredNumbers.join(", ")}</strong>
            </p>
          ) : (
            <p>Semua soal sudah dijawab.</p>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Batal
          </Button>
          <Button onClick={onConfirm}>Ya, Submit</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
