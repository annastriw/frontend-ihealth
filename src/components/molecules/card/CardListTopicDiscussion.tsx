import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Discussion } from "@/types/discussions/discussion";
import { getAvatarColor } from "@/utils/generate-color-avatar";
import { generateFallbackFromName } from "@/utils/generate-name";
import { formatRelativeTime } from "@/utils/time-relative";
import { MessagesSquare } from "lucide-react";
import Link from "next/link";

interface CardListTopicDiscussionProps {
  data: Discussion[];
  isLoading: boolean;
}

export default function CardListTopicDiscussion({
  data,
  isLoading,
}: CardListTopicDiscussionProps) {
  if (isLoading) {
    return (
      <div className="flex flex-col gap-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="shadow-none">
            <CardContent className="space-y-4">
              <Skeleton className="h-4 w-3/4" />
              <div className="flex flex-col gap-2 md:flex-row md:items-center">
                <div className="flex items-center gap-1">
                  {[...Array(3)].map((_, j) => (
                    <Skeleton key={j} className="h-8 w-8 rounded-full" />
                  ))}
                </div>
                <Skeleton className="h-3 w-24" />
                <Skeleton className="hidden h-3 w-3 md:flex" />
                <Skeleton className="hidden h-3 w-36 md:flex" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {data.length === 0 ? (
        <div className="text-muted-foreground flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed p-6 text-center">
          <MessagesSquare className="h-10 w-10" />
          <p className="text-sm">
            Belum ada topik diskusi! Tunggu atau hubungi admin untuk menambahkan
            topik diskusi ✨
          </p>
        </div>
      ) : (
        data.map((discussion) => (
          <Link
            key={discussion.id}
            href={`/dashboard/discussions/${discussion.id}`}
          >
            <Card className="shadow-none">
              <CardContent>
                <div className="space-y-4">
                  <h1 className="max-w-xl font-medium break-words whitespace-normal">
                    {discussion.title}
                  </h1>
                  <div className="flex flex-col gap-2 md:flex-row md:items-center">
                    {discussion.comments.length > 0 && (
                      <div className="flex items-center gap-1">
                        {[
                          ...new Map(
                            discussion.comments.map((comment) => [
                              comment.user.id,
                              comment,
                            ]),
                          ).values(),
                        ].map((comment) => (
                          <div key={comment.user.id}>
                            <Avatar className="h-8 w-8 rounded-full">
                              <AvatarFallback
                                className={`rounded-full text-xs font-semibold text-white ${getAvatarColor(comment.user.id)}`}
                              >
                                {generateFallbackFromName(comment.user.name)}
                              </AvatarFallback>
                            </Avatar>
                          </div>
                        ))}
                      </div>
                    )}
                    <p className="text-muted-foreground text-sm">
                      {discussion.comments.length} Balasan
                    </p>
                    {discussion.comments.length > 0 && (
                      <span className="text-muted-foreground hidden text-xs md:flex">
                        •
                      </span>
                    )}
                    {discussion.comments.length > 0 && (
                      <p className="text-muted-foreground hidden text-sm md:flex">
                        Balasan terakhir{" "}
                        {formatRelativeTime(discussion.comments[0].created_at)}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))
      )}
    </div>
  );
}
