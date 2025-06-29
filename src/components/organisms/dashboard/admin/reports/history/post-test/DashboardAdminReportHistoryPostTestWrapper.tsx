"use client";

import AlertDialogDeleteHistoryPostTestDialog from "@/components/atoms/alert/AlertDialogDeleteHistoryPostTest";
import { historyPostTestColumns } from "@/components/atoms/datacolumn/DataHistoryPostTestAdmin";
import DashboardTitleBold from "@/components/atoms/typography/DashboardTitleBold";
import { DataTable } from "@/components/molecules/datatable/DataTable";
import HistorySearch from "@/components/molecules/search/ReportDetailSearch";
import { useGetHistoryPostTestByPostTestId } from "@/http/admin/history/post-test/get-history-post-test-by-posttest-id";
import { useDeleteUserHistoryPostTest } from "@/http/history/post-test/delete-history-post-test";
import { useGetDetailPostTest } from "@/http/test/get-detail-post-test";
import { HistoryPostTest } from "@/types/test/post-test";
import { useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

interface DashboardAdminReportHistoryPostTestWrapperProps {
  id: string;
}

export default function DashboardAdminReportHistoryPostTestWrapper({
  id,
}: DashboardAdminReportHistoryPostTestWrapperProps) {
  const { data: session, status } = useSession();
  const [search, setSearch] = useState("");
  const [selectedHistoryPostTest, setSelectedHistoryPostTest] =
    useState<HistoryPostTest | null>(null);
  const [openAlertDelete, setOpenAlertDelete] = useState<boolean>(false);

  const { data, isPending } = useGetHistoryPostTestByPostTestId(
    id,
    session?.access_token as string,
    {
      enabled: status === "authenticated",
    },
  );

  const { data: postTest } = useGetDetailPostTest(
    id,
    session?.access_token as string,
    {
      enabled: status === "authenticated",
    },
  );

  const filteredData = useMemo(() => {
    return (data?.data ?? []).filter((item: HistoryPostTest) =>
      item.user?.name?.toLowerCase().includes(search.toLowerCase()),
    );
  }, [data?.data, search]);

  const deleteHistoryPostHandler = (data: HistoryPostTest) => {
    setSelectedHistoryPostTest(data);
    setOpenAlertDelete(true);
  };

  const queryClient = useQueryClient();

  const { mutate: deleteHistoryPostTest, isPending: isDeletePending } =
    useDeleteUserHistoryPostTest({
      onError: () => {
        toast.error("Gagal menghapus history post test pasien!");
      },
      onSuccess: () => {
        setSelectedHistoryPostTest(null);
        toast.success("Berhasil menghapus history post test pasien!");

        queryClient.invalidateQueries({
          queryKey: ["history-posttest-by-posttest-id", id],
        });
      },
    });

  const handleDeleteHistoryPostTest = () => {
    if (selectedHistoryPostTest?.id) {
      deleteHistoryPostTest({
        id: selectedHistoryPostTest.id,
        token: session?.access_token as string,
      });
    }
  };
  return (
    <div>
      <DashboardTitleBold
        head={
          postTest?.data?.name ? `Laporan ${postTest.data.name}` : "Laporan"
        }
      />
      <HistorySearch search={search} setSearch={setSearch} />
      <DataTable
        data={filteredData}
        columns={historyPostTestColumns({
          deleteHistoryPostTestHandler: deleteHistoryPostHandler,
        })}
        isLoading={isPending}
      />
      {selectedHistoryPostTest && (
        <AlertDialogDeleteHistoryPostTestDialog
          open={openAlertDelete}
          setOpen={setOpenAlertDelete}
          confirmDelete={handleDeleteHistoryPostTest}
          isPending={isDeletePending}
          data={selectedHistoryPostTest}
        />
      )}
    </div>
  );
}
