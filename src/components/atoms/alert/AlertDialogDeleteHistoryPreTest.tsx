import React from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { buttonVariants } from "@/components/ui/button";
import { HistoryPreTest } from "@/types/test/pre-test";

interface AlertDialogDeleteHistoryPreTestProps {
  confirmDelete: () => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  isPending?: boolean;
  data?: HistoryPreTest | null;
}

const AlertDialogDeleteHistoryPreTestDialog = ({
  open,
  setOpen,
  confirmDelete,
  isPending,
  data,
}: AlertDialogDeleteHistoryPreTestProps) => {
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Hapus Data?</AlertDialogTitle>
          <AlertDialogDescription>
            Apakah anda yakin ingin menghapus history pre test dari pasien{" "}
            <b className="text-black">{data?.user.name}</b>? Data yang sudah
            dihapus tidak dapat dikembalikan.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Batal</AlertDialogCancel>
          <AlertDialogAction
            disabled={isPending}
            className={buttonVariants({ variant: "destructive" })}
            onClick={confirmDelete}
          >
            Hapus
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertDialogDeleteHistoryPreTestDialog;
