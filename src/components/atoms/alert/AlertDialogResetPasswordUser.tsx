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

interface AlertDialogResetPasswordUserProps {
  confirmDelete: () => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  isPending?: boolean;
}

const AlertDialogResetPasswordUserDialog = ({
  open,
  setOpen,
  confirmDelete,
  isPending,
}: AlertDialogResetPasswordUserProps) => {
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Reset password pengguna?</AlertDialogTitle>
          <AlertDialogDescription>
            Apakah anda yakin ingin reset password pengguna menjadi
            &quot;password&quot;? Password yang sudah di reset tidak dapat
            dikembalikan.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Batal</AlertDialogCancel>
          <AlertDialogAction
            disabled={isPending}
            className={buttonVariants({ variant: "destructive" })}
            onClick={confirmDelete}
          >
            Reset Password
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertDialogResetPasswordUserDialog;
