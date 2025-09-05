"use client";

import AlertDeleteYourQuestionDialog from "@/components/atoms/alert/AlertDialogDeleteYourQuestion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useDeleteDiscussionMessage } from "@/http/discussions/get-delete-discussion-message";
import { DiscussionComment } from "@/types/discussions/discussion";
import { formatRelativeTime } from "@/utils/time-relative";
import { useQueryClient } from "@tanstack/react-query";
import { Eye, Globe, Lock, Trash2, MessageSquare } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

interface CardDiscussionYourQuestionProps {
  data: DiscussionComment[];
  isLoading: boolean;
}

export default function CardDiscussionYourQuestion({
  data,
  isLoading,
}: CardDiscussionYourQuestionProps) {
  const [selectedDiscussion, setSelectedDiscussion] =
    useState<DiscussionComment | null>(null);
  const [openAlertDelete, setOpenAlertDelete] = useState(false);

  const queryClient = useQueryClient();

  const { data: session } = useSession();

  const { mutate: deleteDiscussion, isPending: isDeletePending } =
    useDeleteDiscussionMessage({
      onError: () => toast.error("Gagal menghapus pertanyaan!"),
      onSuccess: () => {
        toast.success("Berhasil menghapus pertanyaan!");
        queryClient.invalidateQueries({
          queryKey: ["discussion-your-question"],
        });
        setSelectedDiscussion(null);
        setOpenAlertDelete(false);
      },
    });

  const handleDeleteClick = (
    e: React.MouseEvent,
    comment: DiscussionComment,
  ) => {
    e.preventDefault();
    e.stopPropagation(); // cegah redirect
    setSelectedDiscussion(comment);
    setOpenAlertDelete(true);
  };

  const confirmDelete = () => {
    if (selectedDiscussion?.id) {
      deleteDiscussion({
        id: selectedDiscussion.id,
        token: session?.access_token || "",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6">
        {[...Array(3)].map((_, i) => (
          <Card className="shadow-none" key={i}>
            <CardContent className="space-y-4">
              <Skeleton className="h-6 w-20 rounded-full" />{" "}
              {/* Simulasi Badge */}
              <Skeleton className="h-4 w-3/4" /> {/* Komentar */}
            </CardContent>
            <CardFooter>
              <Skeleton className="h-3 w-24" /> {/* Tanggal/waktu */}
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  }

  if (!isLoading && data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <MessageSquare className="h-12 w-12 text-gray-400 mb-4" />
        <h2 className="text-lg font-semibold text-gray-700">
          Belum ada pertanyaan yang kamu buat
        </h2>
        <p className="mt-2 text-sm text-gray-500 max-w-md">
          Silakan buat pertanyaan baru agar bisa berdiskusi dengan komunitas.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {data.map((comment) => (
        <Link
          key={comment.id}
          href={`/dashboard/discussions/${comment.id}/answers`}
          className="block"
        >
          <Card className="shadow-none cursor-pointer hover:shadow-md hover:bg-gray-50 transition">
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <Badge
                  variant={"outline"}
                  className={
                    comment.is_private === "1"
                      ? "text-red-500"
                      : "text-green-500"
                  }
                >
                  {comment.is_private === "1" ? (
                    <>
                      <Lock size={14} className="mr-1" />
                      Privasi
                    </>
                  ) : (
                    <>
                      <Globe size={14} className="mr-1" />
                      Publik
                    </>
                  )}
                </Badge>

                <div className="flex items-center gap-4">
                  <Link
                    href={`/dashboard/discussions/${comment.id}/answers`}
                    className="flex items-center text-sm text-gray-700 hover:underline"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Eye className="h-4 w-4" />
                    <span className="ml-2">Detail</span>
                  </Link>
                  <div
                    onClick={(e) => handleDeleteClick(e, comment)}
                    className="flex cursor-pointer items-center text-sm text-red-700 hover:underline"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="ml-2">Hapus</span>
                  </div>
                </div>
              </div>

              <h1 className="max-w-xl font-medium break-words whitespace-normal">
                {comment.comment}
              </h1>
            </CardContent>
            <CardFooter>
              <p className="text-muted-foreground text-sm">
                {formatRelativeTime(comment.created_at)}
              </p>
            </CardFooter>
          </Card>
        </Link>
      ))}
      <AlertDeleteYourQuestionDialog
        open={openAlertDelete}
        setOpen={setOpenAlertDelete}
        confirmDelete={confirmDelete}
        isPending={isDeletePending}
      />
    </div>
  );
}
