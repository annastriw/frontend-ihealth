// src/components/atoms/alert/AlertDialogDeleteHistoryScreeningHSMBQ.tsx

import { AdminScreeningHSMBQHistoryItem } from "@/types/screening-hsmbq/admin-screening-hsmbq";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

interface AlertDialogDeleteHistoryScreeningHSMBQProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  confirmDelete: () => void;
  isPending?: boolean;
  data?: AdminScreeningHSMBQHistoryItem | null;
}

export default function AlertDialogDeleteHistoryScreeningHSMBQ({
  open,
  setOpen,
  confirmDelete,
  isPending,
  data,
}: AlertDialogDeleteHistoryScreeningHSMBQProps) {
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Hapus history screening HSMBQ untuk{" "}
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
