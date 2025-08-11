"use client";

import FormEditQuestion from "@/components/molecules/form/question/FormEditQuestion";
import { useGetDetailQuestion } from "@/http/question/get-detail-question";
import { useSession } from "next-auth/react";

interface DashboardAdminEditQuestionProps {
  id: string;
}

export default function DashboardAdminEditQuestionWrapper({
  id,
}: DashboardAdminEditQuestionProps) {
  const { data: session, status } = useSession();
  const { data } = useGetDetailQuestion(id, session?.access_token as string, {
    enabled: status === "authenticated",
  });
  return (
    <div>
      <FormEditQuestion data={data?.data} id={id} />
    </div>
  );
}
