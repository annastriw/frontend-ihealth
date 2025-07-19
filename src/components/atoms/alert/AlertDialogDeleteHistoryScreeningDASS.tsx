// src/components/atoms/alert/AlertDialogDeleteHistoryScreeningDASS.tsx

import { AdminScreeningDASSHistoryItem } from "@/types/screening-dass/admin-screening-dass";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

interface AlertDialogDeleteHistoryScreeningDASSProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  confirmDelete: () => void;
  isPending?: boolean;
  data?: AdminScreeningDASSHistoryItem | null;
}

export default function AlertDialogDeleteHistoryScreeningDASS({
  open,
  setOpen,
  confirmDelete,
  isPending,
  data,
}: AlertDialogDeleteHistoryScreeningDASSProps) {
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Hapus history screening DASS-21 untuk{" "}
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
