import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { BASE_URL } from "@/lib/url";
import { DiscussionComment } from "@/types/discussions/discussion";
import { getAvatarColor } from "@/utils/generate-color-avatar";
import { generateFallbackFromName } from "@/utils/generate-name";
import { formatRelativeTime } from "@/utils/time-relative";
import { MessagesSquare } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface CardListDiscussionCommentProps {
  data: DiscussionComment[];
  isLoading: boolean;
}

export default function CardListDiscussionComment({
  data,
  isLoading,
}: CardListDiscussionCommentProps) {
  if (isLoading) {
    return (
      <div className="flex flex-col gap-6 w-full">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="w-full rounded-2xl shadow-sm">
            <CardContent className="flex flex-col gap-4 p-4 md:p-6">
              <div className="flex items-center gap-3">
                <Skeleton className="h-10 w-10 rounded-full" />
                <Skeleton className="h-4 w-32" />
              </div>
              <Skeleton className="h-48 w-full rounded-xl" />
              <Skeleton className="h-4 w-64" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 w-full">
      {data.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed bg-gray-50/50 p-8 text-center text-muted-foreground w-full">
          <MessagesSquare className="h-10 w-10" />
          <p className="text-sm md:text-base">
            Belum ada obrolan diskusi nih! Mulai diskusi yuk ✨
          </p>
        </div>
      ) : (
        data.map((comment, i) => (
          <motion.div
            key={comment.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
          >
            <Card className="w-full rounded-2xl border bg-white shadow-sm transition hover:shadow-lg">
              <CardContent className="flex flex-col gap-4 p-4 md:p-6">
                {/* Header */}
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10 rounded-full">
                    <AvatarFallback
                      className={`${getAvatarColor(comment.user.id)} rounded-full text-xs font-semibold text-white`}
                    >
                      {generateFallbackFromName(comment.user.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h1 className="text-sm font-semibold md:text-base">
                      {comment.user.name}
                    </h1>
                    <p className="text-xs text-muted-foreground md:text-sm">
                      {formatRelativeTime(comment.created_at)}
                    </p>
                  </div>
                </div>

                {/* Isi komentar */}
                <div className="space-y-3 w-full">
                  {comment.image_path && (
                    <Image
                      src={`${BASE_URL}/storage/${comment.image_path}`} // <--- hapus /public
                      alt="Foto"
                      width={1000}
                      height={1000}
                      className="w-full rounded-xl object-cover"
                    />
                  )}
                  <p className="break-words text-sm md:text-base leading-relaxed">
                    {comment.comment}
                  </p>
                </div>

                {/* Footer */}
                <div className="flex justify-end w-full">
                  <Link
                    href={`/dashboard/discussions/${comment.id}/answers`}
                    className="text-xs text-primary hover:underline md:text-sm"
                  >
                    💬 {comment.answers.length} Balasan
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))
      )}
    </div>
  );
}
