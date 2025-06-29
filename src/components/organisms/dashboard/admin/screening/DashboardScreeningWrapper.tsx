"use client";

import AlertDialogDeleteScreening from "@/components/atoms/alert/AlertDialogDeleteScreening";
import { screeningColumns } from "@/components/atoms/datacolumn/DataScreening";
import DialogEditScreening from "@/components/atoms/dialog/DialogEditScreening";
import { DataTable } from "@/components/molecules/datatable/DataTable";
import { Button } from "@/components/ui/button";
import { useDeleteScreening } from "@/http/admin/screening/delete-screening";
import { useGetAllScreening } from "@/http/screening/get-all-screening";
import { Screening } from "@/types/screening/screening";
import { useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

export default function DashboardScreeningWrapper() {
  const { data: session, status } = useSession();
  const { data, isPending } = useGetAllScreening(
    session?.access_token as string,
    {
      enabled: status === "authenticated",
    },
  );
  const [selectedScreening, setSelectedScreening] = useState<Screening | null>(
    null,
  );
  const [openAlertDelete, setOpenAlertDelete] = useState<boolean>(false);
  const [openDialogEdit, setOpenDialogEdit] = useState<boolean>(false);

  const deleteScreeningHandler = (data: Screening) => {
    setSelectedScreening(data);
    setOpenAlertDelete(true);
  };

  const handleDialogEditOpen = (data: Screening) => {
    setSelectedScreening(data);
    setOpenDialogEdit(true);
  };

  const queryClient = useQueryClient();

  const { mutate: deleteScreening, isPending: isDeletePending } =
    useDeleteScreening({
      onError: () => {
        toast.error("Gagal menghapus screening!");
      },
      onSuccess: () => {
        setSelectedScreening(null);
        toast.success("Berhasil menghapus screening!");

        queryClient.invalidateQueries({
          queryKey: ["screening-list"],
        });
      },
    });

  const handleDeleteScreening = () => {
    if (selectedScreening?.id) {
      deleteScreening({
        id: selectedScreening.id,
        token: session?.access_token as string,
      });
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <Link href={"/dashboard/admin/screening/create"}>
          <Button>Tambah Screening</Button>
        </Link>
      </div>
      <DataTable
        columns={screeningColumns({
          deleteScreeningHandler,
          onEditHandler: handleDialogEditOpen,
        })}
        data={data?.data ?? []}
        isLoading={isPending}
      />
      {selectedScreening && (
        <>
          <DialogEditScreening
            open={openDialogEdit}
            setOpen={setOpenDialogEdit}
            id={selectedScreening.id}
            data={selectedScreening}
          />
          <AlertDialogDeleteScreening
            open={openAlertDelete}
            setOpen={setOpenAlertDelete}
            confirmDelete={handleDeleteScreening}
            isPending={isDeletePending}
            data={selectedScreening}
          />
        </>
      )}
    </div>
  );
}
