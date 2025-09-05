"use client";

import CardListTopicDiscussion from "@/components/molecules/card/CardListTopicDiscussion";
import AlertInformationSelectDiscussionTopic from "@/components/atoms/alert/AlertInformationSelectDiscussionTopic";
import { useGetAllDiscussion } from "@/http/discussions/get-all-discussions";
import { useSession } from "next-auth/react";

export default function DashboardMedicalDiscussionWrapper() {
  const { data: session, status } = useSession();
  const { data, isPending } = useGetAllDiscussion(
    session?.access_token as string,
    {
      enabled: status === "authenticated",
    },
  );

  return (
    <div className="space-y-4">
      <AlertInformationSelectDiscussionTopic />
      <CardListTopicDiscussion data={data?.data || []} isLoading={isPending} />
    </div>
  );
}
