import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { BASE_URL } from "@/lib/url";
import { DiscussionComment } from "@/types/discussions/discussion";
import { getAvatarColor } from "@/utils/generate-color-avatar";
import { generateFallbackFromName } from "@/utils/generate-name";
import { formatRelativeTime } from "@/utils/time-relative";
import { MessagesSquare, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface CardListDiscussionCommentAdminProps {
  data: DiscussionComment[];
  isLoading: boolean;
  deleteDiscussionCommentHandler: (data: DiscussionComment) => void;
}

export default function CardListDiscussionCommentAdmin({
  data,
  isLoading,
  deleteDiscussionCommentHandler,
}: CardListDiscussionCommentAdminProps) {
  if (isLoading) {
    return (
      <div className="flex flex-col gap-6">
        {[...Array(3)].map((_, i) => (
          <div className="flex w-full gap-3 space-y-4" key={i}>
            <div className="flex justify-between">
              <div className="flex gap-2">
                <Skeleton className="h-10 w-10 rounded-full" />
              </div>
            </div>
            <div className="w-full space-y-2">
              <Card className="bg-muted w-fit border-0 p-2 shadow-none">
                <CardContent className="space-y-4 px-3 py-2">
                  <Skeleton className="h-4 w-32" /> {/* Nama */}
                  <Skeleton className="h-48 w-full rounded-xl md:max-w-sm" />{" "}
                  {/* Gambar */}
                  <Skeleton className="h-4 w-64" /> {/* Komentar */}
                </CardContent>
              </Card>
              <Skeleton className="h-3 w-24" /> {/* Waktu */}
              <Skeleton className="h-3 w-40" /> {/* Link Balasan */}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {data.length === 0 ? (
        <div className="text-muted-foreground flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed p-6 text-center">
          <MessagesSquare className="h-10 w-10" />
          <p className="text-sm">
            Belum ada obrolan diskusi nih! Mulai diskusi yuk ✨
          </p>
        </div>
      ) : (
        data.map((comment) => (
          <div className="flex w-full gap-3 space-y-4" key={comment.id}>
            <div className="flex justify-between">
              <div className="flex gap-2">
                <Avatar className="h-10 w-10 rounded-full">
                  <AvatarFallback
                    className={`${getAvatarColor(
                      comment.user.id,
                    )} rounded-full text-xs font-semibold text-white`}
                  >
                    {generateFallbackFromName(comment.user.name)}
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>
            <div className="space-y-2">
              <Card className="bg-muted w-fit border-0 p-2 shadow-none">
                <CardContent className="px-3 py-2">
                  <div className="flex items-center justify-between gap-4">
                    <div className="md:mb-1">
                      <h1 className="font-semibold break-words">
                        {comment.user.name}
                      </h1>
                    </div>
                    <Trash2
                      className="text-destructive h-4 w-4 cursor-pointer"
                      onClick={() => deleteDiscussionCommentHandler(comment)}
                    />
                  </div>

                  <div className="space-y-4">
                    {comment.image_path && (
                      <Image
                        src={`${BASE_URL}/storage/${comment.image_path}`}
                        alt="Foto"
                        width={1000}
                        height={1000}
                        className="rounded-xl md:max-w-sm"
                      />
                    )}
                    <h1>{comment.comment}</h1>
                  </div>
                </CardContent>
              </Card>
              <p className="text-muted-foreground text-sm">
                {formatRelativeTime(comment.created_at)}
              </p>
              <Link
                href={`/dashboard/discussions/${comment.id}/answers`}
                className="text-muted-foreground hover:underline"
              >
                <div className="flex flex-col gap-2 md:flex-row md:items-center">
                  <p className="text-sm">
                    Lihat semua {comment.answers.length} Balasan
                  </p>
                </div>
              </Link>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
