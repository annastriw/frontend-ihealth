// DashboardDiscussionDetailWrapper.tsx
"use client";

import MessageDiscussion from "@/components/atoms/message/MessageDiscussion";
import DashboardTitleBold from "@/components/atoms/typography/DashboardTitleBold";
import CardListDiscussionComment from "@/components/molecules/card/CardListDiscussionComment";
import DiscussionCommentSearchBar from "@/components/molecules/search/SearchDiscussionComment";
import { useGetDetailDiscussion } from "@/http/discussions/get-detail-discussions";
import { useSession } from "next-auth/react";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";

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
    }
  );

  const [searchTerm, setSearchTerm] = useState("");

  const filteredComments = useMemo(() => {
    if (!data?.data?.comments) return [];
    return data.data.comments.filter((comment) =>
      comment.comment.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [data?.data?.comments, searchTerm]);

  return (
    <section className="w-full flex flex-col gap-8 px-0">
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-center md:text-left w-full"
      >
        <DashboardTitleBold head={`# ${data?.data.title ?? ""}`} />
        <p className="mt-2 text-sm text-muted-foreground md:text-base w-full">
          Ikuti diskusi, bagikan ide, dan terhubung dengan komunitas ✨
        </p>
      </motion.div>

      {/* Input Discussion Form */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="w-full"
      >
        <MessageDiscussion id={id} />
      </motion.div>

      {/* Search Bar + Comments */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15 }}
        className="flex flex-col gap-6 md:gap-8 w-full"
      >
        <DiscussionCommentSearchBar onSearch={setSearchTerm} />
        <CardListDiscussionComment
          data={filteredComments}
          isLoading={isPending}
        />
      </motion.div>
    </section>
  );
}
