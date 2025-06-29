"use client";

import FormEditYourQuestion from "@/components/molecules/form/question/FormEditYourDiscussionMessage";
import { useGetDetailDiscussionComment } from "@/http/discussions/get-detail-discussion-message";
import { useSession } from "next-auth/react";

interface FormEditYourQuestionProps {
  id: string;
}

export default function DashboardDiscussionYourQuestionEditWrapper({
  id,
}: FormEditYourQuestionProps) {
  const { data: session, status } = useSession();

  const { data } = useGetDetailDiscussionComment(
    id,
    session?.access_token as string,
    {
      enabled: status === "authenticated",
    },
  );
  return (
    <div>
      <FormEditYourQuestion id={id} data={data?.data} />
    </div>
  );
}
