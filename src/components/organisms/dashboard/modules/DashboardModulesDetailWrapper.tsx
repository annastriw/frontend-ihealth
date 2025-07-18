"use client";

import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import CardListSubModule from "@/components/molecules/card/CardListSubModule";
import { useGetDetailModules } from "@/http/modulels/get-detail-modules";
import { useGetAllSubModule } from "@/http/sub-modules/get-all-sub-module";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface DashboardModulesDetailWrapperProps {
  id: string;
}

export default function DashboardModulesDetailWrapper({
  id,
}: DashboardModulesDetailWrapperProps) {
  const { data: session, status } = useSession();
  const router = useRouter();

  const { data, isPending } = useGetAllSubModule(
    id,
    session?.access_token as string,
    {
      enabled: status === "authenticated",
    },
  );

  const { data: module } = useGetDetailModules(
    id,
    session?.access_token as string,
    {
      enabled: status === "authenticated",
    },
  );

  const handleCardClick = (subModuleId: string) => {
    router.push(`/dashboard/modules/sub/${subModuleId}`);
  };

  return (
    <>
      <DashboardTitle
        head={module?.data.module.name ?? "Modules"}
        body={`Menampilkan daftar sub materi dari ${module?.data.module.name ?? ""}`}
      />
      <div className="space-y-4">
        <CardListSubModule
          data={data?.data ?? []}
          isLoading={isPending}
          onClick={handleCardClick} // ⬅️ handler untuk navigasi ke detail submodul
        />
      </div>
    </>
  );
}
