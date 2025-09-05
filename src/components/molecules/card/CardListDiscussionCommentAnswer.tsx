import MessageDiscussionAnswer from "@/components/atoms/message/MessageDiscussionAnswer";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { BASE_URL } from "@/lib/url";
import { DiscussionCommentAnswer } from "@/types/discussions/discussion";
import { getAvatarColor } from "@/utils/generate-color-avatar";
import { generateFallbackFromName } from "@/utils/generate-name";
import { formatRelativeTime } from "@/utils/time-relative";
import { MessagesSquare } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";

interface CardListDiscussionCommentAnswerProps {
  data: DiscussionCommentAnswer[];
  isLoading: boolean;
  id: string;
}

export default function CardListDiscussionCommentAnswer({
  data,
  id,
  isLoading,
}: CardListDiscussionCommentAnswerProps) {
  const [showReplyForm, setShowReplyForm] = useState(false);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-8 w-24 rounded-md" />
        </div>
        {[...Array(3)].map((_, i) => (
          <div className="flex w-full gap-3" key={i}>
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="w-full space-y-2">
              <Card className="rounded-2xl border shadow-none bg-muted/40">
                <CardContent className="space-y-4 px-3 py-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-40 w-full rounded-xl" />
                  <Skeleton className="h-4 w-64" />
                </CardContent>
              </Card>
              <Skeleton className="h-3 w-24" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold">Balasan</h1>
        <Button
          onClick={() => setShowReplyForm((prev) => !prev)}
          className={
            showReplyForm
              ? "bg-green-600 hover:bg-green-700 text-white"
              : "bg-primary hover:bg-primary/90 text-white"
          }
        >
          {showReplyForm ? "Tutup" : "Beri Balasan"}
        </Button>
      </div>

      {showReplyForm && <MessageDiscussionAnswer id={id} />}

      <div className="flex flex-col gap-6">
        {data.length === 0 ? (
          <div className="text-muted-foreground flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed p-6 text-center">
            <MessagesSquare className="h-10 w-10" />
            <p className="text-sm">
              Belum ada balasan diskusi. Yuk jadi yang pertama ✨
            </p>
          </div>
        ) : (
          data.map((comment) => (
            <motion.div
              key={comment.id}
              className="flex w-full gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Avatar className="h-10 w-10 rounded-full">
                <AvatarFallback
                  className={`${getAvatarColor(
                    comment.user.id,
                  )} rounded-full text-xs font-semibold text-white`}
                >
                  {generateFallbackFromName(comment.user.name)}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 space-y-2">
                <Card className="w-full rounded-2xl border bg-muted/30 shadow-sm">
                  <CardContent className="px-4 py-3">
                    <h1 className="font-semibold text-sm mb-1 break-words">
                      {comment.user.name}
                    </h1>
                    <div className="space-y-3">
                      {comment.image_path && (
                        <Image
                          src={`${BASE_URL}/storage/${comment.image_path}`}
                          alt="Foto"
                          width={800}
                          height={800}
                          className="h-auto w-full max-w-full rounded-xl object-cover"
                        />
                      )}
                      <p className="text-sm leading-relaxed break-words">
                        {comment.comment}
                      </p>
                    </div>
                  </CardContent>
                </Card>
                <p className="text-muted-foreground text-xs">
                  {formatRelativeTime(comment.created_at)}
                </p>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </motion.div>
  );
}
