"use client";

import AlertDeleteQuestionDialog from "@/components/atoms/alert/AlertDialogDeleteQuestion";
import { questionBankDetailColumns } from "@/components/atoms/datacolumn/DataQuestionBankDetail";
import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import { DataTable } from "@/components/molecules/datatable/DataTable";
import { Button } from "@/components/ui/button";
import { useGetDetailQuestionBank } from "@/http/question-banks/get-detail-question-bank";
import { useDeleteQuestion } from "@/http/question/delete-question";
import { Question } from "@/types/questions/question";
import { useQueryClient } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

interface DashboardQuestionBankDetailWrapperProps {
  id: string;
}

export default function DashboardQuestionBankDetailWrapper({
  id,
}: DashboardQuestionBankDetailWrapperProps) {
  const { data: session, status } = useSession();
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(
    null,
  );
  const [openAlertDelete, setOpenAlertDelete] = useState<boolean>(false);

  const { data, isPending } = useGetDetailQuestionBank(
    id,
    session?.access_token as string,
    {
      enabled: status === "authenticated",
    },
  );

  const deleteCategoriesHandler = (data: Question) => {
    setSelectedQuestion(data);
    setOpenAlertDelete(true);
  };

  const queryClient = useQueryClient();

  const { mutate: deleteCategories, isPending: isDeletePending } =
    useDeleteQuestion({
      onError: () => {
        toast.error("Gagal menghapus pertanyaan soal!");
      },
      onSuccess: () => {
        setSelectedQuestion(null);
        toast.success("Berhasil menghapus pertanyaan soal!");
        queryClient.invalidateQueries({
          queryKey: ["question-bank-detail", id],
        });
      },
    });

  const handleDeleteQuestion = () => {
    if (selectedQuestion?.id) {
      deleteCategories({
        id: selectedQuestion.id,
        token: session?.access_token as string,
      });
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <DashboardTitle
          head={data?.data.name ?? ""}
          body="Menampilkan daftar pertanyaan dari bank soal"
        />
        <div>
          <Link href={`/dashboard/admin/question-banks/${id}/create`}>
            <Button>
              <Plus /> Tambah Soal
            </Button>
          </Link>
        </div>
      </div>

      <DataTable
        data={data?.data.questions ?? []}
        columns={questionBankDetailColumns({
          deleteQuestionHandler: deleteCategoriesHandler,
        })}
        isLoading={isPending}
      />

      <AlertDeleteQuestionDialog
        open={openAlertDelete}
        setOpen={setOpenAlertDelete}
        confirmDelete={handleDeleteQuestion}
        isPending={isDeletePending}
      />
    </div>
  );
}
