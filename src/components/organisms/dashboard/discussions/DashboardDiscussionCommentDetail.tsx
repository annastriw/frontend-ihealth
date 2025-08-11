"use client";

import CardDetaillDiscussionComment from "@/components/molecules/card/CardDetailDiscussionComment";
import CardListDiscussionCommentAnswer from "@/components/molecules/card/CardListDiscussionCommentAnswer";
import { useGetDetailDiscussionCommentAnswer } from "@/http/discussions/answer/get-detail-discussion-message-answer";
import { useGetDetailDiscussionComment } from "@/http/discussions/get-detail-discussion-message";
import { useSession } from "next-auth/react";

interface DashboardDiscussionCommentDetailProps {
  id: string;
}

export default function DashboardDiscussionCommentDetail({
  id,
}: DashboardDiscussionCommentDetailProps) {
  const { data: session, status } = useSession();
  const { data, isPending } = useGetDetailDiscussionComment(
    id,
    session?.access_token as string,
    {
      enabled: status === "authenticated",
    },
  );
  const { data: answer, isPending: answerIsPending } =
    useGetDetailDiscussionCommentAnswer(id, session?.access_token as string, {
      enabled: status === "authenticated",
    });
  return (
    <div className="space-y-6">
      <CardDetaillDiscussionComment data={data?.data} isLoading={isPending} />
      <CardListDiscussionCommentAnswer
        id={id}
        data={answer?.data || []}
        isLoading={answerIsPending}
      />
    </div>
  );
}
