import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { BASE_URL } from "@/lib/url";
import { DiscussionComment } from "@/types/discussions/discussion";
import { getAvatarColor } from "@/utils/generate-color-avatar";
import { generateFallbackFromName } from "@/utils/generate-name";
import { formatRelativeTime } from "@/utils/time-relative";
import Image from "next/image";
import { motion } from "framer-motion";

interface CardDetailDiscussionCommentProps {
  data?: DiscussionComment;
  isLoading: boolean;
}

export default function CardDetailDiscussionComment({
  data,
  isLoading,
}: CardDetailDiscussionCommentProps) {
  if (isLoading || !data) {
    return (
      <Card className="rounded-2xl border shadow-sm">
        <CardContent className="space-y-4 p-4 md:p-6">
          <div className="flex items-center gap-2">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="space-y-1">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-24" />
            </div>
          </div>
          <Skeleton className="h-48 w-full rounded-xl" />
          <Skeleton className="h-4 w-full" />
        </CardContent>
      </Card>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Card className="rounded-2xl border shadow-sm">
        <CardContent className="space-y-4 p-4 md:p-6">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12 rounded-full">
              <AvatarFallback
                className={`${getAvatarColor(
                  data.user.id,
                )} rounded-full text-sm font-semibold text-white`}
              >
                {generateFallbackFromName(data.user.name)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="font-semibold text-base break-words">
                {data.user.name}
              </h1>
              <p className="text-muted-foreground text-xs">
                {formatRelativeTime(data.created_at)}
              </p>
            </div>
          </div>

          {data.image_path && (
            <Image
              src={`${BASE_URL}/storage/${data.image_path}`}
              alt="Foto"
              width={800}
              height={800}
              className="h-auto w-full max-w-full rounded-xl object-cover"
            />
          )}

          <p className="text-sm leading-relaxed break-words">{data.comment}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
