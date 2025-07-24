// src/components/organisms/dashboard/admin/reports/history/screening-hsmbq/DashboardAdminReportHistoryScreeningHSMBQWrapper.tsx

"use client";

import { useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { DataTable } from "@/components/molecules/datatable/DataTable";
import HistorySearch from "@/components/molecules/search/ReportDetailSearch";
import AlertDialogDeleteHistoryScreeningHSMBQ from "@/components/atoms/alert/AlertDialogDeleteHistoryScreeningHSMBQ";

import { historyScreeningHSMBQColumns } from "@/components/atoms/datacolumn/DataHistoryScreeningHSMBQAdmin";

import { useGetAllHistoryScreeningHSMBQ } from "@/http/history/screening-hsmbq/get-all-history-screening-hsmbq";
import { useDeleteAdminHistoryScreeningHSMBQ } from "@/http/history/screening-hsmbq/delete-history-screening-hsmbq";

import { AdminScreeningHSMBQHistoryItem } from "@/types/screening-hsmbq/admin-screening-hsmbq";

export default function DashboardAdminReportHistoryScreeningHSMBQWrapper() {
  const { data: session, status } = useSession();
  const token = session?.access_token as string;

  const [search, setSearch] = useState("");
  const [selectedHistory, setSelectedHistory] =
    useState<AdminScreeningHSMBQHistoryItem | null>(null);
  const [openAlertDelete, setOpenAlertDelete] = useState(false);

  // Ambil seluruh data screening HSMBQ dari endpoint admin
  const { data, isPending } = useGetAllHistoryScreeningHSMBQ(token, {
    enabled: status === "authenticated",
  });

  const filteredData = useMemo(() => {
    const list = data?.data ?? [];
    return list.filter((item: AdminScreeningHSMBQHistoryItem) =>
      item.name?.toLowerCase().includes(search.toLowerCase())
    );
  }, [data?.data, search]);

  const queryClient = useQueryClient();

  // Hook hapus
  const { mutate: deleteHistoryScreening, isPending: isDeletePending } =
    useDeleteAdminHistoryScreeningHSMBQ({
      onError: () => {
        toast.error("Gagal menghapus riwayat screening HSMBQ pasien.");
      },
      onSuccess: () => {
        toast.success("Berhasil menghapus riwayat screening HSMBQ pasien.");
        setSelectedHistory(null);
        queryClient.invalidateQueries({
          queryKey: ["all-history-screening-hsmbq"],
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
        columns={historyScreeningHSMBQColumns({
          deleteHistoryScreeningHandler: (data) => {
            setSelectedHistory(data);
            setOpenAlertDelete(true);
          },
        })}
        isLoading={isPending}
      />
      {selectedHistory && (
        <AlertDialogDeleteHistoryScreeningHSMBQ
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
