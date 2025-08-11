"use client";

import AlertDeleteFAQDiscussionDialog from "@/components/atoms/alert/AlertDialogDeleteFAQDiscussion";
import { faqDiscussionColumns } from "@/components/atoms/datacolumn/DataFAQDiscussion";
import DialogDetailFAQDiscussion from "@/components/atoms/dialog/DialogDetailFAQDiscussion";
import DialogEditFAQDiscussion from "@/components/atoms/dialog/DialogEditFAQDIscussion";
import { DataTable } from "@/components/molecules/datatable/DataTable";
import { Button } from "@/components/ui/button";
import { useDeleteFAQDiscussion } from "@/http/faq/delete-faq";
import { useGetAllFAQDiscussion } from "@/http/faq/get-all-faq";
import { FAQDiscussion } from "@/types/faq/faq";
import { useQueryClient } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

export default function DashboardAdminFAQWrapper() {
  const { data: session, status } = useSession();
  const [selectedFAQDiscussion, setSelectedFAQDiscussion] =
    useState<FAQDiscussion | null>(null);
  const [openAlertDelete, setOpenAlertDelete] = useState<boolean>(false);
  const [openDialogEdit, setOpenDialogEdit] = useState<boolean>(false);
  const [openDialogDetail, setOpenDialogDetail] = useState<boolean>(false);

  const { data, isPending } = useGetAllFAQDiscussion(
    session?.access_token as string,
    {
      enabled: status === "authenticated",
    },
  );

  const deleteFAQDiscussionHandler = (data: FAQDiscussion) => {
    setSelectedFAQDiscussion(data);
    setOpenAlertDelete(true);
  };

  const handleDialogEditOpen = (data: FAQDiscussion) => {
    setSelectedFAQDiscussion(data);
    setOpenDialogEdit(true);
  };

  const handleDialogDetailOpen = (data: FAQDiscussion) => {
    setSelectedFAQDiscussion(data);
    setOpenDialogDetail(true);
  };

  const queryClient = useQueryClient();

  const { mutate: deleteFAQDiscussion, isPending: isDeletePending } =
    useDeleteFAQDiscussion({
      onError: () => {
        toast.error("Gagal menghapus faq!");
      },
      onSuccess: () => {
        setSelectedFAQDiscussion(null);
        toast.success("Berhasil menghapus faq!");
        queryClient.invalidateQueries({
          queryKey: ["discussion-faq-list"],
        });
      },
    });

  const handleDeleteQuestion = () => {
    if (selectedFAQDiscussion?.id) {
      deleteFAQDiscussion({
        id: selectedFAQDiscussion.id,
        token: session?.access_token as string,
      });
    }
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <div>
        <Link href={"/dashboard/admin/faqs/create"}>
          <Button>
            <Plus /> Tambah FAQ
          </Button>
        </Link>
      </div>
      <DataTable
        data={data?.data ?? []}
        isLoading={isPending}
        columns={faqDiscussionColumns({
          detailFAQDiscussionHandler: handleDialogDetailOpen,
          editFAQDiscussionHandler: handleDialogEditOpen,
          deleteFAQDiscussionHandler: deleteFAQDiscussionHandler,
        })}
      />
      {selectedFAQDiscussion && (
        <>
          <DialogEditFAQDiscussion
            open={openDialogEdit}
            setOpen={setOpenDialogEdit}
            id={selectedFAQDiscussion.id}
            data={selectedFAQDiscussion}
          />
          <DialogDetailFAQDiscussion
            open={openDialogDetail}
            setOpen={setOpenDialogDetail}
            id={selectedFAQDiscussion.id}
          />
          <AlertDeleteFAQDiscussionDialog
            open={openAlertDelete}
            setOpen={setOpenAlertDelete}
            confirmDelete={handleDeleteQuestion}
            isPending={isDeletePending}
          />
        </>
      )}
    </div>
  );
}
