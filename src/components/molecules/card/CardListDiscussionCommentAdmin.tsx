// CardListDiscussionCommentAdmin.tsx
"use client";

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
import { motion } from "framer-motion";

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
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
            className="flex flex-col gap-3"
          >
            <div className="flex items-center gap-3">
              <Skeleton className="h-10 w-10 rounded-full" />
              <Skeleton className="h-4 w-32" />
            </div>
            <Skeleton className="h-48 w-full rounded-xl md:max-w-md" />
            <Skeleton className="h-4 w-64" />
          </motion.div>
        ))}
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed bg-gray-50/50 p-6 text-center text-muted-foreground">
        <MessagesSquare className="h-10 w-10" />
        <p className="text-sm md:text-base">
          Belum ada obrolan diskusi! Mulai diskusi yuk ✨
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {data.map((comment, i) => (
        <motion.div
          key={comment.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: i * 0.05 }}
          className="flex flex-col gap-3 w-full"
        >
          <Card className="w-full border border-gray-200 bg-white shadow-sm hover:shadow-md transition-all rounded-2xl">
            <CardContent className="flex flex-col gap-4 p-4 md:p-6">
              {/* Header */}
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10 rounded-full">
                    <AvatarFallback
                      className={`${getAvatarColor(
                        comment.user.id
                      )} text-xs font-semibold text-white`}
                    >
                      {generateFallbackFromName(comment.user.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <h1 className="text-sm font-semibold md:text-base">
                      {comment.user.name}
                    </h1>
                    <p className="text-xs text-muted-foreground md:text-sm">
                      {formatRelativeTime(comment.created_at)}
                    </p>
                  </div>
                </div>
                <Trash2
                  className="h-5 w-5 text-destructive cursor-pointer hover:text-red-600"
                  onClick={() => deleteDiscussionCommentHandler(comment)}
                />
              </div>

              {/* Konten komentar */}
              <div className="flex flex-col gap-4">
                {comment.image_path && (
                  <Image
                    src={`${BASE_URL}/storage/${comment.image_path}`}
                    alt="Foto"
                    width={1000}
                    height={1000}
                    className="w-full rounded-xl object-cover md:max-w-lg"
                  />
                )}
                <p className="break-words text-sm md:text-base leading-relaxed">
                  {comment.comment}
                </p>
              </div>

              {/* Footer */}
              <div className="flex justify-end">
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
      ))}
    </div>
  );
}
