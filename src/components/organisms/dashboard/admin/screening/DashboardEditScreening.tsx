"use client";

import DashboardTitleBold from "@/components/atoms/typography/DashboardTitleBold";
import FormEditScreening from "@/components/molecules/form/screening/FormEditScreening";
import { useGetDetailScreening } from "@/http/screening/get-detail-screening";
import { useSession } from "next-auth/react";

interface DashboardEditScreeningProps {
  id: string;
}

export default function DashboardEditScreeningWrapper({
  id,
}: DashboardEditScreeningProps) {
  const { data: session, status } = useSession();
  const { data, isLoading } = useGetDetailScreening(
    id,
    session?.access_token as string,
    {
      enabled: status === "authenticated",
    },
  );

  if (isLoading || !data?.data) {
    return null;
  }

  return (
    <div>
      <DashboardTitleBold head={`Edit ${data?.data.name}`} />
      <FormEditScreening id={id} data={data?.data} isLoading={isLoading} />
    </div>
  );
}
