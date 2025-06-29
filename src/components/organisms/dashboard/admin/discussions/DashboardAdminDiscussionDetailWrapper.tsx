"use client";

import AlertDialogDeleteDiscussionComment from "@/components/atoms/alert/AlertDialogDeleteDiscussionComment";
import MessageDiscussion from "@/components/atoms/message/MessageDiscussion";
import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import CardListDiscussionCommentAdmin from "@/components/molecules/card/CardListDiscussionCommentAdmin";
import { useDeleteDiscussionComment } from "@/http/discussions/delete-discussion-comment";
import { useGetDetailDiscussionAdmin } from "@/http/discussions/get-detail-discussion-admin";
import { DiscussionComment } from "@/types/discussions/discussion";
import { useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { toast } from "sonner";

interface DashboardAdminDetailDiscussionWrapperProps {
  id: string;
}

export default function DashboardAdminDetailDiscussionWrapper({
  id,
}: DashboardAdminDetailDiscussionWrapperProps) {
  const { data: session, status } = useSession();
  const { data, isPending } = useGetDetailDiscussionAdmin(
    id,
    session?.access_token as string,
    {
      enabled: status === "authenticated",
    },
  );

  const [selectedDiscussionComment, setSelectedDiscussionComment] =
    useState<DiscussionComment | null>(null);

  const [openAlertDelete, setOpenAlertDelete] = useState<boolean>(false);

  const deleteDiscussionCommentHandler = (data: DiscussionComment) => {
    setSelectedDiscussionComment(data);
    setOpenAlertDelete(true);
  };

  const queryClient = useQueryClient();

  const { mutate: deleteDiscussionComment } = useDeleteDiscussionComment({
    onError: () => {
      toast.error("Gagal menghapus pesan diskusi!");
    },
    onSuccess: () => {
      setSelectedDiscussionComment(null);
      toast.success("Berhasil menghapus pesan diskusi!");

      queryClient.invalidateQueries({
        queryKey: ["discussion-detail-admin"],
      });
    },
  });

  const handleDeleteDiscussionComment = () => {
    if (selectedDiscussionComment?.id) {
      deleteDiscussionComment({
        id: selectedDiscussionComment.id,
        token: session?.access_token as string,
      });
    }
  };

  return (
    <div>
      <DashboardTitle
        head={data?.data.title ?? ""}
        body="Menampilkan detail topik disuksi beserta list diskusi dari topik"
      />
      <MessageDiscussion id={id} />
      <CardListDiscussionCommentAdmin
        data={data?.data.comments || []}
        isLoading={isPending}
        deleteDiscussionCommentHandler={deleteDiscussionCommentHandler}
      />
      <AlertDialogDeleteDiscussionComment
        open={openAlertDelete}
        setOpen={setOpenAlertDelete}
        confirmDelete={handleDeleteDiscussionComment}
      />
    </div>
  );
}
