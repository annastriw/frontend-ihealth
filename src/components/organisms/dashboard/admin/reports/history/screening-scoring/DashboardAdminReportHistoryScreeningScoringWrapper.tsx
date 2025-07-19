"use client";

import AlertDialogDeleteHistoryScreeningScoring from "@/components/atoms/alert/AlertDialogDeleteHistoryScreeningScoring";
import { historyScreeningScoringColumns } from "@/components/atoms/datacolumn/DataHistoryScreeningScoringAdmin";
import { DataTable } from "@/components/molecules/datatable/DataTable";
import HistorySearch from "@/components/molecules/search/ReportDetailSearch";
import { useDeleteUserHistoryScreeningScoring } from "@/http/history/screening-scoring/delete-history-screening-scoring";
import { useGetHistoryScreeningScoringByScreeningId } from "@/http/screening-scoring/get-history-screening-scoring-by-screening-scoring-id";
import { AdminUserHistoryScreeningScoringByScreening } from "@/types/screening-scoring/screening-scoring";
import { useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

interface DashboardAdminReportHistoryScreeningScoringWrapperProps {
  id: string;
}

export default function DashboardAdminReportHistoryScreeningScoringWrapper({
  id,
}: DashboardAdminReportHistoryScreeningScoringWrapperProps) {
  const { data: session, status } = useSession();
  const [search, setSearch] = useState("");
  const [selectedHistory, setSelectedHistory] =
    useState<AdminUserHistoryScreeningScoringByScreening | null>(null);
  const [openAlertDelete, setOpenAlertDelete] = useState<boolean>(false);

  const { data, isPending } = useGetHistoryScreeningScoringByScreeningId(
    id,
    session?.access_token as string,
    {
      enabled: status === "authenticated",
    }
  );

  const filteredData = useMemo(() => {
    return (data?.data ?? []).filter((item) =>
      item.user?.name?.toLowerCase().includes(search.toLowerCase())
    );
  }, [data?.data, search]);

  const deleteHandler = (data: AdminUserHistoryScreeningScoringByScreening) => {
    setSelectedHistory(data);
    setOpenAlertDelete(true);
  };

  const queryClient = useQueryClient();

  const { mutate: deleteHistory, isPending: isDeletePending } =
    useDeleteUserHistoryScreeningScoring({
      onError: () => {
        toast.error("Gagal menghapus history screening scoring!");
      },
      onSuccess: () => {
        setSelectedHistory(null);
        toast.success("Berhasil menghapus history screening scoring!");
        queryClient.invalidateQueries({
          queryKey: ["history-screening-scoring-by-id", id],
        });
      },
    });

  const handleDelete = () => {
    if (selectedHistory?.id) {
      deleteHistory({
        id: selectedHistory.id,
        token: session?.access_token as string,
      });
    }
  };

  return (
    <div>
      <HistorySearch search={search} setSearch={setSearch} />
      <DataTable
        data={filteredData}
        columns={historyScreeningScoringColumns({
          deleteHistoryScreeningHandler: deleteHandler,
        })}
        isLoading={isPending}
      />
      {selectedHistory && (
        <AlertDialogDeleteHistoryScreeningScoring
          open={openAlertDelete}
          setOpen={setOpenAlertDelete}
          confirmDelete={handleDelete}
          isPending={isDeletePending}
          data={selectedHistory}
        />
      )}
    </div>
  );
}
