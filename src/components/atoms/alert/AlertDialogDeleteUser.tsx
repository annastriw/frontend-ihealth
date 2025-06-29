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
import { User } from "@/types/user/user";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

interface AlertDialogDeleteUserProps {
  confirmDelete: () => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  isPending?: boolean;
  data?: User | null;
}

const AlertDialogDeleteUser = ({
  open,
  setOpen,
  confirmDelete,
  isPending,
  data,
}: AlertDialogDeleteUserProps) => {
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Hapus Pengguna?</AlertDialogTitle>
          <AlertDialogDescription>
            <div className="space-y-4">
              <Alert className="border-red-500 bg-red-50 text-red-600">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Tindakan Berbahaya</AlertTitle>
                <AlertDescription className="text-red-600">
                  Tindakan ini akan menghapus seluruh riwayat pre test, post
                  test, dan screening pasien secara permanen.
                </AlertDescription>
              </Alert>
              <div>
                Apakah anda yakin ingin menghapus pengguna{" "}
                <b className="text-black">{data?.name}</b>? Data yang sudah
                dihapus tidak dapat dikembalikan.
              </div>
            </div>
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

export default AlertDialogDeleteUser;
