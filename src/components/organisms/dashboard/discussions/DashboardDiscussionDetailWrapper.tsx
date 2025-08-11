"use client";

import MessageDiscussion from "@/components/atoms/message/MessageDiscussion";
import DashboardTitleBold from "@/components/atoms/typography/DashboardTitleBold";
import CardListDiscussionComment from "@/components/molecules/card/CardListDiscussionComment";
import DiscussionCommentSearchBar from "@/components/molecules/search/SearchDiscussionComment";
import { useGetDetailDiscussion } from "@/http/discussions/get-detail-discussions";
import { useSession } from "next-auth/react";
import { useMemo, useState } from "react";

interface DashboardDiscussionDetailWrapperProps {
  id: string;
}

export default function DashboardDiscussionDetailWrapper({
  id,
}: DashboardDiscussionDetailWrapperProps) {
  const { data: session, status } = useSession();
  const { data, isPending } = useGetDetailDiscussion(
    id,
    session?.access_token as string,
    {
      enabled: status === "authenticated",
    },
  );

  const [searchTerm, setSearchTerm] = useState("");

  const filteredComments = useMemo(() => {
    if (!data?.data?.comments) return [];

    return data.data.comments.filter((comment) =>
      comment.comment.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [data?.data?.comments, searchTerm]);

  return (
    <section>
      <DashboardTitleBold head={`# ${data?.data.title ?? ""}`} />
      <MessageDiscussion id={id} />
      <div className="space-y-4 md:space-y-6">
        <DiscussionCommentSearchBar onSearch={setSearchTerm} />
        <CardListDiscussionComment
          data={filteredComments}
          isLoading={isPending}
        />
      </div>
    </section>
  );
}
