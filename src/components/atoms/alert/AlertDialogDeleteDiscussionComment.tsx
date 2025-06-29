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
import { DiscussionComment } from "@/types/discussions/discussion";

interface AlertDialogDeleteDiscussionCommentProps {
  confirmDelete: () => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  isPending?: boolean;
  data?: DiscussionComment | null;
}

const AlertDialogDeleteDiscussionComment = ({
  open,
  setOpen,
  confirmDelete,
  isPending,
  data,
}: AlertDialogDeleteDiscussionCommentProps) => {
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Hapus Data?</AlertDialogTitle>
          <AlertDialogDescription>
            Apakah anda yakin ingin menghapus pesan diskusi{""}
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

export default AlertDialogDeleteDiscussionComment;
