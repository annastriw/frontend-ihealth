"use client";

import CardDiscussionYourQuestion from "@/components/molecules/card/CardDiscussionYourQuestion";
import { useGetDiscussionMessageYourQuestion } from "@/http/discussions/get-discussion-your-question";
import { useSession } from "next-auth/react";

export default function DashboardDiscussionYourQuestionWrapper() {
  const { data: session, status } = useSession();
  const { data, isPending } = useGetDiscussionMessageYourQuestion(
    session?.access_token as string,
    {
      enabled: status === "authenticated",
    },
  );
  return (
    <div>
      <CardDiscussionYourQuestion
        data={data?.data || []}
        isLoading={isPending}
      />
    </div>
  );
}
