"use client";

import FormEditFAQDiscussion from "@/components/molecules/form/faq/FormUpdateFAQDiscussion";
import { useGetDetailFAQDiscussion } from "@/http/faq/get-detail-faq";
import { useSession } from "next-auth/react";

interface DashboardAdminEditFAQWrapperProps {
  id: string;
}

export default function DashboardAdminEditFAQWrapper({
  id,
}: DashboardAdminEditFAQWrapperProps) {
  const { data: session, status } = useSession();
  const { data } = useGetDetailFAQDiscussion(
    id,
    session?.access_token as string,
    {
      enabled: status === "authenticated",
    },
  );
  return (
    <div>
      <FormEditFAQDiscussion id={id} data={data?.data} />
    </div>
  );
}
