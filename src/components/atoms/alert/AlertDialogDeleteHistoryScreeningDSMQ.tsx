// src/components/atoms/alert/AlertDialogDeleteHistoryScreeningDSMQ.tsx

import { AdminScreeningDSMQHistoryItem } from "@/types/screening-dsmq/admin-screening-dsmq";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

interface AlertDialogDeleteHistoryScreeningDSMQProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  confirmDelete: () => void;
  isPending?: boolean;
  data?: AdminScreeningDSMQHistoryItem | null;
}

export default function AlertDialogDeleteHistoryScreeningDSMQ({
  open,
  setOpen,
  confirmDelete,
  isPending,
  data,
}: AlertDialogDeleteHistoryScreeningDSMQProps) {
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Hapus history screening DSMQ untuk{" "}
            <span className="font-semibold">{data?.name}</span>?
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Batal
          </Button>
          <Button
            variant="destructive"
            onClick={confirmDelete}
            disabled={isPending}
          >
            {isPending ? "Menghapus..." : "Hapus"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
