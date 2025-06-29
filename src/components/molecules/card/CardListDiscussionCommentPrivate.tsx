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
  return (
    <div className="space-y-4">
      {data?.map((discussion) => (
        <div key={discussion.id}>
          <Link href={`/dashboard/discussions/${discussion.id}/answers`}>
            <Card>
              <CardHeader>
                <CardTitle>
                  <div className="flex justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 rounded-full">
                        <AvatarFallback
                          className={`${getAvatarColor(
                            discussion.user.id,
                          )} rounded-full text-xs font-semibold text-white`}
                        >
                          {generateFallbackFromName(discussion.user.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col gap-1">
                        <h1 className="font-semibold break-words">
                          {discussion.user.name}
                        </h1>
                        <p className="text-muted-foreground text-sm font-normal">
                          {formatRelativeTime(discussion.created_at)}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div>{discussion.comment}</div>
              </CardContent>
            </Card>
          </Link>
        </div>
      ))}
    </div>
  );
}
