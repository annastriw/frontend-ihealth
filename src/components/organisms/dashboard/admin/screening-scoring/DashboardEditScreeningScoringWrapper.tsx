// src/components/organisms/dashboard/admin/screening-scoring/DashboardEditScreeningScoringWrapper.tsx

"use client";

import DashboardTitleBold from "@/components/atoms/typography/DashboardTitleBold";
import FormEditScreeningScoring from "@/components/molecules/form/screening-scoring/FormEditScreeningScoring";
import { useGetDetailScreeningScoring } from "@/http/screening-scoring/get-detail-screening-scoring";
import { useSession } from "next-auth/react";

interface DashboardEditScreeningScoringProps {
  id: string;
}

export default function DashboardEditScreeningScoringWrapper({
  id,
}: DashboardEditScreeningScoringProps) {
  const { data: session, status } = useSession();

  const { data, isLoading } = useGetDetailScreeningScoring(
    id,
    session?.access_token as string,
    {
      enabled: status === "authenticated",
    }
  );

  if (isLoading || !data?.data) {
    return <p className="text-center py-10">Memuat data screening scoring...</p>;
  }

  return (
    <div>
      <DashboardTitleBold head={`Edit ${data.data.name}`} />
      <FormEditScreeningScoring
        id={id}
        data={data.data} // <-- bertipe ScreeningScoringDetail
        isLoading={isLoading}
      />
    </div>
  );
}
