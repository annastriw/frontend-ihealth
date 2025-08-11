"use client";

import { useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { DataTable } from "@/components/molecules/datatable/DataTable";
import HistorySearch from "@/components/molecules/search/ReportDetailSearch";
import AlertDialogDeleteHistoryScreeningDASS from "@/components/atoms/alert/AlertDialogDeleteHistoryScreeningDASS";

import { historyScreeningDASSColumns } from "@/components/atoms/datacolumn/DataHistoryScreeningDASSMedical";

import { useGetAllHistoryScreeningDASS } from "@/http/history/screening-dass/medical-get-all-history-screening-dass";
import { useDeleteAdminHistoryScreeningDASS } from "@/http/history/screening-dass/medical-delete-history-screening-dass";

import { AdminScreeningDASSHistoryItem } from "@/types/screening-dass/admin-screening-dass";

export default function DashboardAdminReportHistoryScreeningDASSWrapper() {
  const { data: session, status } = useSession();
  const token = session?.access_token as string;

  const [search, setSearch] = useState("");
  const [selectedHistory, setSelectedHistory] =
    useState<AdminScreeningDASSHistoryItem | null>(null);
  const [openAlertDelete, setOpenAlertDelete] = useState(false);

  // Ambil seluruh data screening DASS dari endpoint admin
  const { data, isPending } = useGetAllHistoryScreeningDASS(token, {
    enabled: status === "authenticated",
  });

  const filteredData = useMemo(() => {
    const list = data?.data ?? [];
    return list.filter((item: AdminScreeningDASSHistoryItem) =>
      item.name?.toLowerCase().includes(search.toLowerCase())
    );
  }, [data?.data, search]);

  const queryClient = useQueryClient();

  // Hook hapus
  const { mutate: deleteHistoryScreening, isPending: isDeletePending } =
    useDeleteAdminHistoryScreeningDASS({
      onError: () => {
        toast.error("Gagal menghapus riwayat screening DASS-21 pasien.");
      },
      onSuccess: () => {
        toast.success("Berhasil menghapus riwayat screening DASS-21 pasien.");
        setSelectedHistory(null);
        queryClient.invalidateQueries({
          queryKey: ["all-history-screening-dass"],
        });
      },
    });

  const handleDeleteHistoryScreening = () => {
    if (selectedHistory?.history_id && token) {
      deleteHistoryScreening({
        id: selectedHistory.history_id,
        token,
      });
    }
  };

  return (
    <div>
      <HistorySearch search={search} setSearch={setSearch} />
      <DataTable
        data={filteredData}
        columns={historyScreeningDASSColumns({
          deleteHistoryScreeningHandler: (data) => {
            setSelectedHistory(data);
            setOpenAlertDelete(true);
          },
        })}
        isLoading={isPending}
      />
      {selectedHistory && (
        <AlertDialogDeleteHistoryScreeningDASS
          open={openAlertDelete}
          setOpen={setOpenAlertDelete}
          confirmDelete={handleDeleteHistoryScreening}
          isPending={isDeletePending}
          data={selectedHistory}
        />
      )}
    </div>
  );
}
