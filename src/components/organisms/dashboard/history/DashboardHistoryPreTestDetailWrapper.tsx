"use client";

import { useGetDetailHistoryPreTest } from "@/http/history/pre-test/get-detail-pre-test";
import { useSession } from "next-auth/react";
import CardListHistoryQuestion from "@/components/molecules/card/CardListHistoryQuestion";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface DashboardHistoryPreTestDetailWrapperProps {
  id: string;
}

export default function DashboardHistoryPreTestDetailWrapper({
  id,
}: DashboardHistoryPreTestDetailWrapperProps) {
  const router = useRouter();
  const { data: session, status } = useSession();

  const { data, isPending } = useGetDetailHistoryPreTest(
    id,
    session?.access_token as string,
    {
      enabled: status === "authenticated",
    },
  );

  useEffect(() => {
    const handlePopState = () => {
      const backToSubmoduleId = sessionStorage.getItem("backToSubmoduleId");
      if (backToSubmoduleId) {
        router.replace(`/dashboard/modules/sub/${backToSubmoduleId}`);
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [router]);

  return (
    <div className="space-y-4">
      <CardListHistoryQuestion data={data?.data} isLoading={isPending} />
    </div>
  );
}
