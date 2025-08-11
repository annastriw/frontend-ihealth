"use client";

import { useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { DataTable } from "@/components/molecules/datatable/DataTable";
import HistorySearch from "@/components/molecules/search/ReportDetailSearch";
import AlertDialogDeleteHistoryScreeningDSMQ from "@/components/atoms/alert/AlertDialogDeleteHistoryScreeningDSMQ";

import { historyScreeningDSMQColumns } from "@/components/atoms/datacolumn/DataHistoryScreeningDSMQMedical";

import { useGetAllHistoryScreeningDSMQ } from "@/http/history/screening-dsmq/medical-get-all-history-screening-dsmq";
import { useDeleteAdminHistoryScreeningDSMQ } from "@/http/history/screening-dsmq/medical-delete-history-screening-dsmq";

import { AdminScreeningDSMQHistoryItem } from "@/types/screening-dsmq/admin-screening-dsmq";

export default function DashboardAdminReportHistoryScreeningDSMQWrapper() {
  const { data: session, status } = useSession();
  const token = session?.access_token as string;

  const [search, setSearch] = useState("");
  const [selectedHistory, setSelectedHistory] =
    useState<AdminScreeningDSMQHistoryItem | null>(null);
  const [openAlertDelete, setOpenAlertDelete] = useState(false);

  // Ambil seluruh data screening DSMQ dari endpoint admin
  const { data, isPending } = useGetAllHistoryScreeningDSMQ(token, {
    enabled: status === "authenticated",
  });

  const filteredData = useMemo(() => {
    const list = data?.data ?? [];
    return list.filter((item: AdminScreeningDSMQHistoryItem) =>
      item.name?.toLowerCase().includes(search.toLowerCase())
    );
  }, [data?.data, search]);

  const queryClient = useQueryClient();

  // Hook hapus
  const { mutate: deleteHistoryScreening, isPending: isDeletePending } =
    useDeleteAdminHistoryScreeningDSMQ({
      onError: () => {
        toast.error("Gagal menghapus riwayat screening DSMQ pasien.");
      },
      onSuccess: () => {
        toast.success("Berhasil menghapus riwayat screening DSMQ pasien.");
        setSelectedHistory(null);
        queryClient.invalidateQueries({
          queryKey: ["all-history-screening-dsmq"],
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
        columns={historyScreeningDSMQColumns({
          deleteHistoryScreeningHandler: (data) => {
            setSelectedHistory(data);
            setOpenAlertDelete(true);
          },
        })}
        isLoading={isPending}
      />
      {selectedHistory && (
        <AlertDialogDeleteHistoryScreeningDSMQ
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