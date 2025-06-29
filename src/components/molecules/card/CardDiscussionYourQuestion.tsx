import AlertDeleteYourQuestionDialog from "@/components/atoms/alert/AlertDialogDeleteYourQuestion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useDeleteDiscussionMessage } from "@/http/discussions/get-delete-discussion-message";
import { DiscussionComment } from "@/types/discussions/discussion";
import { formatRelativeTime } from "@/utils/time-relative";
import { useQueryClient } from "@tanstack/react-query";
import { Eye, Globe, Lock, SquarePen, Trash2 } from "lucide-react";
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

  const handleDeleteClick = (comment: DiscussionComment) => {
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

  return (
    <div className="flex flex-col gap-6">
      {data.map((comment) => (
        <Card className="shadow-none" key={comment.id}>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <Badge
                variant={"outline"}
                className={
                  comment.is_private === "1" ? "text-red-500" : "text-green-500"
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
                >
                  <Eye className="h-4 w-4" />
                  <span className="ml-2">Detail</span>
                </Link>
                <Link
                  href={`/dashboard/discussions/your-question/${comment.id}/edit`}
                  className="flex items-center text-sm text-yellow-700 hover:underline"
                >
                  <SquarePen className="h-4 w-4" />
                  <span className="ml-2">Edit</span>
                </Link>
                <div
                  onClick={(e) => {
                    e.preventDefault();
                    handleDeleteClick(comment);
                  }}
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
