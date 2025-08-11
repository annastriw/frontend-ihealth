"use client";

import AlertDialogDeleteHistoryPreTestDialog from "@/components/atoms/alert/AlertDialogDeleteHistoryPreTest";
import { historyPreTestColumns } from "@/components/atoms/datacolumn/DataHistoryPreTestAdmin";
import DashboardTitleBold from "@/components/atoms/typography/DashboardTitleBold";
import { DataTable } from "@/components/molecules/datatable/DataTable";
import HistorySearch from "@/components/molecules/search/ReportDetailSearch";
import { useGetHistoryPreTestByPretestId } from "@/http/admin/history/pre-test/get-history-pre-test-by-pretest-id";
import { useDeleteUserHistoryPreTest } from "@/http/history/pre-test/delete-history-pre-test";
import { useGetDetailPreTest } from "@/http/test/get-detail-pre-test";
import { HistoryPreTest } from "@/types/test/pre-test";
import { useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

interface DashboardAdminReportHistoryPreTestWrapperProps {
  id: string;
}

export default function DashboardAdminReportHistoryPreTestWrapper({
  id,
}: DashboardAdminReportHistoryPreTestWrapperProps) {
  const { data: session, status } = useSession();
  const [search, setSearch] = useState("");
  const [selectedHistoryPreTest, setSelectedHistoryPreTest] =
    useState<HistoryPreTest | null>(null);
  const [openAlertDelete, setOpenAlertDelete] = useState<boolean>(false);

  const { data, isPending } = useGetHistoryPreTestByPretestId(
    id,
    session?.access_token as string,
    {
      enabled: status === "authenticated",
    },
  );

  const { data: preTest } = useGetDetailPreTest(
    id,
    session?.access_token as string,
    {
      enabled: status === "authenticated",
    },
  );

  const filteredData = useMemo(() => {
    return (data?.data ?? []).filter((item: HistoryPreTest) =>
      item.user?.name?.toLowerCase().includes(search.toLowerCase()),
    );
  }, [data?.data, search]);

  const deleteHistoryPreTestHandler = (data: HistoryPreTest) => {
    setSelectedHistoryPreTest(data);
    setOpenAlertDelete(true);
  };

  const queryClient = useQueryClient();

  const { mutate: deleteHistoryPreTest, isPending: isDeletePending } =
    useDeleteUserHistoryPreTest({
      onError: () => {
        toast.error("Gagal menghapus history pre test pasien!");
      },
      onSuccess: () => {
        setSelectedHistoryPreTest(null);
        toast.success("Berhasil menghapus history pre test pasien!");

        queryClient.invalidateQueries({
          queryKey: ["history-pretest-by-pretest-id", id],
        });
      },
    });

  const handleDeleteQuestion = () => {
    if (selectedHistoryPreTest?.id) {
      deleteHistoryPreTest({
        id: selectedHistoryPreTest.id,
        token: session?.access_token as string,
      });
    }
  };
  return (
    <div>
      <DashboardTitleBold
        head={preTest?.data?.name ? `Laporan ${preTest.data.name}` : "Laporan"}
      />
      <HistorySearch search={search} setSearch={setSearch} />
      <DataTable
        data={filteredData}
        columns={historyPreTestColumns({
          deleteHistoryPreTestHandler: deleteHistoryPreTestHandler,
        })}
        isLoading={isPending}
      />
      {selectedHistoryPreTest && (
        <AlertDialogDeleteHistoryPreTestDialog
          open={openAlertDelete}
          setOpen={setOpenAlertDelete}
          confirmDelete={handleDeleteQuestion}
          isPending={isDeletePending}
          data={selectedHistoryPreTest}
        />
      )}
    </div>
  );
}
