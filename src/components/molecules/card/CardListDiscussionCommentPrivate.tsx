import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DiscussionComment } from "@/types/discussions/discussion";
import { getAvatarColor } from "@/utils/generate-color-avatar";
import { generateFallbackFromName } from "@/utils/generate-name";
import { formatRelativeTime } from "@/utils/time-relative";
import Link from "next/link";

interface CardListDiscussionCommentPrivateProps {
  data?: DiscussionComment[];
}

export default function CardListDiscussionCommentPrivate({
  data,
}: CardListDiscussionCommentPrivateProps) {
  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed p-6 text-center text-muted-foreground">
        <p className="text-sm md:text-base">
          Belum ada pertanyaan atau komentar pribadi. 💬
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {data.map((discussion) => (
        <Card
          key={discussion.id}
          className="cursor-pointer transition-shadow hover:shadow-lg"
        >
          <CardHeader className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10 rounded-full">
                <AvatarFallback
                  className={`${getAvatarColor(
                    discussion.user.id
                  )} rounded-full text-xs font-semibold text-white`}
                >
                  {generateFallbackFromName(discussion.user.name)}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col gap-1">
                <h1 className="font-semibold break-words text-sm md:text-base">
                  {discussion.user.name}
                </h1>
                <p className="text-muted-foreground text-xs md:text-sm font-normal">
                  {formatRelativeTime(discussion.created_at)}
                </p>
              </div>
            </div>
            <Link
              href={`/dashboard/discussions/${discussion.id}/answers`}
              className="text-primary text-xs md:text-sm font-medium hover:underline"
              onClick={(e) => e.stopPropagation()} // agar klik tombol tidak trigger card klik
            >
              Detail
            </Link>
          </CardHeader>

          <CardContent
            className="cursor-pointer"
            onClick={() =>
              window.location.assign(`/dashboard/discussions/${discussion.id}/answers`)
            }
          >
            <div className="break-words text-sm md:text-base">
              {discussion.comment}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
