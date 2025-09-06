// DashboardAdminDiscussionDetailWrapper.tsx
"use client";

import AlertDialogDeleteDiscussionComment from "@/components/atoms/alert/AlertDialogDeleteDiscussionComment";
import MessageDiscussion from "@/components/atoms/message/MessageDiscussion";
import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import CardListDiscussionCommentAdmin from "@/components/molecules/card/CardListDiscussionCommentAdmin";
import DiscussionCommentSearchBar from "@/components/molecules/search/SearchDiscussionComment";
import { useDeleteDiscussionComment } from "@/http/discussions/delete-discussion-comment";
import { useGetDetailDiscussionAdmin } from "@/http/discussions/get-detail-discussion-admin";
import { DiscussionComment } from "@/types/discussions/discussion";
import { useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useState, useMemo } from "react";
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
    { enabled: status === "authenticated" }
  );

  const [selectedDiscussionComment, setSelectedDiscussionComment] =
    useState<DiscussionComment | null>(null);
  const [openAlertDelete, setOpenAlertDelete] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState("");

  const deleteDiscussionCommentHandler = (data: DiscussionComment) => {
    setSelectedDiscussionComment(data);
    setOpenAlertDelete(true);
  };

  const queryClient = useQueryClient();

  const { mutate: deleteDiscussionComment } = useDeleteDiscussionComment({
    onError: () => toast.error("Gagal menghapus pesan diskusi!"),
    onSuccess: () => {
      setSelectedDiscussionComment(null);
      toast.success("Berhasil menghapus pesan diskusi!");
      queryClient.invalidateQueries({ queryKey: ["discussion-detail-admin"] });
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

  // Filter comments berdasarkan search term
  const filteredComments = useMemo(() => {
    if (!data?.data?.comments) return [];
    return data.data.comments.filter((comment) =>
      comment.comment.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [data?.data?.comments, searchTerm]);

  return (
    <section className="w-full flex flex-col gap-6 px-0">
      <DashboardTitle
        head={data?.data.title ?? ""}
        body="Menampilkan detail topik diskusi beserta list diskusi dari topik"
      />

      {/* Input Diskusi */}
      <div className="w-full">
        <MessageDiscussion id={id} />
      </div>

      {/* Search Bar */}
      <div className="w-full">
        <DiscussionCommentSearchBar onSearch={setSearchTerm} />
      </div>

      {/* List Diskusi */}
      <div className="w-full">
        <CardListDiscussionCommentAdmin
          data={filteredComments}
          isLoading={isPending}
          deleteDiscussionCommentHandler={deleteDiscussionCommentHandler}
        />
      </div>

      {/* Alert Delete */}
      <AlertDialogDeleteDiscussionComment
        open={openAlertDelete}
        setOpen={setOpenAlertDelete}
        confirmDelete={handleDeleteDiscussionComment}
      />
    </section>
  );
}
