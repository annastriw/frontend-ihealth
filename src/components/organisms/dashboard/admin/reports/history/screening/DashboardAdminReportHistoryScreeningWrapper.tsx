"use client";

import AlertDialogDeleteHistoryScreening from "@/components/atoms/alert/AlertDialogDeleteHistoryScreening";
import { historyScreeningColumns } from "@/components/atoms/datacolumn/DataHistoryScreeningAdmin";
import { DataTable } from "@/components/molecules/datatable/DataTable";
import HistorySearch from "@/components/molecules/search/ReportDetailSearch";
import { useDeleteUserHistoryScreening } from "@/http/history/screening/delete-history-screening";
import { useGetHistoryScreeningByScreeningId } from "@/http/screening/get-history-screening-by-screening-id";
import { HistoryScreening } from "@/types/screening/screening";
import { useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

interface DashboardAdminReportHistoryScreeningWrapperProps {
  id: string;
}

export default function DashboardAdminReportHistoryScreeningWrapper({
  id,
}: DashboardAdminReportHistoryScreeningWrapperProps) {
  const { data: session, status } = useSession();
  const [search, setSearch] = useState("");
  const [selectedHistoryScreening, setSelectedHistoryScreening] =
    useState<HistoryScreening | null>(null);
  const [openAlertDelete, setOpenAlertDelete] = useState<boolean>(false);

  const { data, isPending } = useGetHistoryScreeningByScreeningId(
    id,
    session?.access_token as string,
    {
      enabled: status === "authenticated",
    },
  );

  const filteredData = useMemo(() => {
    return (data?.data ?? []).filter((item: HistoryScreening) =>
      item.user?.name?.toLowerCase().includes(search.toLowerCase()),
    );
  }, [data?.data, search]);

  const deleteHistoryScreeningHandler = (data: HistoryScreening) => {
    setSelectedHistoryScreening(data);
    setOpenAlertDelete(true);
  };

  const queryClient = useQueryClient();

  const { mutate: deleteHistoryScreening, isPending: isDeletePending } =
    useDeleteUserHistoryScreening({
      onError: () => {
        toast.error("Gagal menghapus history screening pasien!");
      },
      onSuccess: () => {
        setSelectedHistoryScreening(null);
        toast.success("Berhasil menghapus history screening pasien!");

        queryClient.invalidateQueries({
          queryKey: ["history-screening-by-screening-id", id],
        });
      },
    });

  const handleDeleteHistoryScreening = () => {
    if (selectedHistoryScreening?.id) {
      deleteHistoryScreening({
        id: selectedHistoryScreening.id,
        token: session?.access_token as string,
      });
    }
  };
  return (
    <div>
      <HistorySearch search={search} setSearch={setSearch} />
      <DataTable
        data={filteredData}
        columns={historyScreeningColumns({
          deleteHistoryScreeningHandler: deleteHistoryScreeningHandler,
        })}
        isLoading={isPending}
      />
      {selectedHistoryScreening && (
        <AlertDialogDeleteHistoryScreening
          open={openAlertDelete}
          setOpen={setOpenAlertDelete}
          confirmDelete={handleDeleteHistoryScreening}
          isPending={isDeletePending}
          data={selectedHistoryScreening}
        />
      )}
    </div>
  );
}
