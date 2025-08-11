"use client";

import CardListDiscussionCommentPrivate from "@/components/molecules/card/CardListDiscussionCommentPrivate";
import { useGetAllDiscussionPrivate } from "@/http/discussions/get-discussion-private";
import { useSession } from "next-auth/react";

export default function DashboardMedicalDiscussionPrivateWrapper() {
  const { data: session, status } = useSession();

  const { data } = useGetAllDiscussionPrivate(session?.access_token as string, {
    enabled: status === "authenticated",
  });
  return (
    <div>
      <CardListDiscussionCommentPrivate data={data?.data} />
    </div>
  );
}
