"use client";

import AlertDialogDeleteQuestionBank from "@/components/atoms/alert/AlertDialogDeleteQuestionBank";
import { questionBankColumns } from "@/components/atoms/datacolumn/DataQuestionBank";
import DialogUpdateQuestionBank from "@/components/atoms/dialog/DialogUpdateQuestionBank";
import { DataTable } from "@/components/molecules/datatable/DataTable";
import { useDeleteQuestionBank } from "@/http/question-banks/delete-question-bank";
import { useGetAllQuestionBanks } from "@/http/question-banks/get-all-question-bank";
import { QuestionBank } from "@/types/question-bank/question-bank";
import { useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { toast } from "sonner";

export default function DashboardQuestionBankWrapper() {
  const { data: session, status } = useSession();
  const { data, isPending } = useGetAllQuestionBanks(
    session?.access_token as string,
    {
      enabled: status === "authenticated",
    },
  );

  const [selectedQuestionBank, setSelectedQuestionBank] =
    useState<QuestionBank | null>(null);

  const [openAlertDelete, setOpenAlertDelete] = useState<boolean>(false);
  const [dialogUpdateQuestionBankOpen, setDialogUpdateQuestionBankOpen] =
    useState(false);

  const deleteQuestionBankHandler = (data: QuestionBank) => {
    setSelectedQuestionBank(data);
    setOpenAlertDelete(true);
  };

  const queryClient = useQueryClient();

  const { mutate: deleteQuestionBank } = useDeleteQuestionBank({
    onError: () => {
      toast.error("Gagal menghapus bank soal!");
    },
    onSuccess: () => {
      setSelectedQuestionBank(null);
      toast.success("Berhasil menghapus bank soal!");

      queryClient.invalidateQueries({
        queryKey: ["question-bank-list"],
      });
    },
  });

  const handleDeleteQuestionBank = () => {
    if (selectedQuestionBank?.id) {
      deleteQuestionBank({
        id: selectedQuestionBank.id,
        token: session?.access_token as string,
      });
    }
  };

  const handleDialogUpdateQuestionBankOpen = (data: QuestionBank) => {
    setSelectedQuestionBank(data);
    setDialogUpdateQuestionBankOpen(true);
  };

  return (
    <div>
      <DataTable
        data={data?.data ?? []}
        columns={questionBankColumns({
          deleteQuestionBankHandler,
          updateQuestionBankHandler: handleDialogUpdateQuestionBankOpen,
        })}
        isLoading={isPending}
      />
      {selectedQuestionBank?.id && (
        <DialogUpdateQuestionBank
          open={dialogUpdateQuestionBankOpen}
          setOpen={setDialogUpdateQuestionBankOpen}
          id={selectedQuestionBank.id}
          data={selectedQuestionBank}
        />
      )}
      <AlertDialogDeleteQuestionBank
        open={openAlertDelete}
        setOpen={setOpenAlertDelete}
        confirmDelete={handleDeleteQuestionBank}
      />
    </div>
  );
}
