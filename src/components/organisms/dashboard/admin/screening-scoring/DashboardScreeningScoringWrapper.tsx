// src/components/organisms/dashboard/admin/screening-scoring/DashboardScreeningScoringWrapper.tsx

"use client";

import AlertDialogDeleteScreeningScoring from "@/components/atoms/alert/AlertDialogDeleteScreeningScoring";
import { screeningScoringColumns } from "@/components/atoms/datacolumn/DataScreeningScoring";
import DialogEditScreeningScoring from "@/components/atoms/dialog/DialogEditScreeningScoring";
import { DataTable } from "@/components/molecules/datatable/DataTable";
import { Button } from "@/components/ui/button";
import { useDeleteScreeningScoring } from "@/http/admin/screening-scoring/delete-screening-scoring";
import { useGetAllScreeningScoring } from "@/http/screening-scoring/get-all-screening-scoring";
import { ScreeningScoring } from "@/types/screening-scoring/screening-scoring";
import { useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

export default function DashboardScreeningScoringWrapper() {
  const { data: session, status } = useSession();
  const { data, isPending } = useGetAllScreeningScoring(
    session?.access_token as string,
    undefined,
    {
      enabled: status === "authenticated",
    }
  );

  const [selectedScreening, setSelectedScreening] = useState<ScreeningScoring | null>(null);
  const [openAlertDelete, setOpenAlertDelete] = useState<boolean>(false);
  const [openDialogEdit, setOpenDialogEdit] = useState<boolean>(false);

  const deleteScreeningHandler = (data: ScreeningScoring) => {
    setSelectedScreening(data);
    setOpenAlertDelete(true);
  };

  const handleDialogEditOpen = (data: ScreeningScoring) => {
    setSelectedScreening(data);
    setOpenDialogEdit(true);
  };

  const queryClient = useQueryClient();

  const { mutate: deleteScreeningScoring, isPending: isDeletePending } =
    useDeleteScreeningScoring({
      onError: () => {
        toast.error("Gagal menghapus screening scoring!");
      },
      onSuccess: () => {
        setSelectedScreening(null);
        toast.success("Berhasil menghapus screening scoring!");

        queryClient.invalidateQueries({
          queryKey: ["screening-scoring-list"],
        });
      },
    });

  const handleDeleteScreening = () => {
    if (selectedScreening?.id) {
      deleteScreeningScoring({
        id: selectedScreening.id,
        token: session?.access_token as string,
      });
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <Link href="/dashboard/admin/screening-scoring/create">
          <Button>Tambah Screening Scoring</Button>
        </Link>
      </div>
      <DataTable
        columns={screeningScoringColumns({
          deleteScreeningHandler,
          onEditHandler: handleDialogEditOpen,
        })}
        data={data?.data ?? []}
        isLoading={isPending}
      />
      {selectedScreening && (
        <>
          <DialogEditScreeningScoring
            open={openDialogEdit}
            setOpen={setOpenDialogEdit}
            id={selectedScreening.id}
            data={selectedScreening}
          />
          <AlertDialogDeleteScreeningScoring
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
