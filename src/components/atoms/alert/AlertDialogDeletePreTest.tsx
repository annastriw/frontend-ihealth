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
import { PreTest } from "@/types/test/pre-test";

interface AlertDialogDeletePreTestProps {
  confirmDelete: () => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  isPending?: boolean;
  data?: PreTest | null;
}

const AlertDialogDeletePreTestDialog = ({
  open,
  setOpen,
  confirmDelete,
  isPending,
  data,
}: AlertDialogDeletePreTestProps) => {
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Hapus Data?</AlertDialogTitle>
          <AlertDialogDescription>
            Apakah anda yakin ingin menghapus data {""}
            <b className="text-black">{data?.name}</b>? Data yang sudah dihapus
            tidak dapat dikembalikan.
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

export default AlertDialogDeletePreTestDialog;
