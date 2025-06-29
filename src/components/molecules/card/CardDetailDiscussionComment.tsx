import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { BASE_URL } from "@/lib/url";
import { DiscussionComment } from "@/types/discussions/discussion";
import { getAvatarColor } from "@/utils/generate-color-avatar";
import { generateFallbackFromName } from "@/utils/generate-name";
import { formatRelativeTime } from "@/utils/time-relative";
import Image from "next/image";

interface CardDetaillDiscussionCommentProps {
  data?: DiscussionComment;
  isLoading: boolean;
}

export default function CardDetaillDiscussionComment({
  data,
  isLoading,
}: CardDetaillDiscussionCommentProps) {
  if (isLoading || !data) {
    return (
      <Card className="shadow-none">
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="space-y-1">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-24" />
              </div>
            </div>
            <Skeleton className="h-48 w-full rounded-xl md:max-w-2xl" />
            <Skeleton className="h-4 w-full" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-none">
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between">
            <div className="flex items-center gap-2">
              <Avatar className="h-10 w-10 rounded-full">
                <AvatarFallback
                  className={`${getAvatarColor(
                    data.user.id,
                  )} rounded-full text-xs font-semibold text-white`}
                >
                  {generateFallbackFromName(data.user.name)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1>{data.user.name}</h1>
                <p className="text-muted-foreground text-sm">
                  {formatRelativeTime(data.created_at)}
                </p>
              </div>
            </div>
          </div>

          {data.image_path && (
            <Image
              src={`${BASE_URL}/public/public/${data.image_path}`}
              alt="Foto"
              width={1000}
              height={1000}
              className="rounded-xl md:max-w-2xl"
            />
          )}
          <h1>{data.comment}</h1>
        </div>
      </CardContent>
    </Card>
  );
}
