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
import { ScreeningScoring } from "@/types/screening-scoring/screening-scoring";

interface AlertDialogDeleteScreeningScoringProps {
  confirmDelete: () => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  isPending?: boolean;
  data?: ScreeningScoring | null;
}

const AlertDialogDeleteScreeningScoring = ({
  open,
  setOpen,
  confirmDelete,
  isPending,
  data,
}: AlertDialogDeleteScreeningScoringProps) => {
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Hapus Screening?</AlertDialogTitle>
          <AlertDialogDescription>
            Apakah Anda yakin ingin menghapus screening scoring{" "}
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

export default AlertDialogDeleteScreeningScoring;
