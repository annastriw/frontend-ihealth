"use client";

import AlertInformationModulesAdmin from "@/components/atoms/alert/AlertInformationModulesAdmin";
import { modulesColumns } from "@/components/atoms/datacolumn/DataModules";
import { DataTable } from "@/components/molecules/datatable/DataTable";
import { useGetAllModules } from "@/http/modulels/get-all-modules";
import { useSession } from "next-auth/react";

export default function DashboardAdminModulesWrapper() {
  const { data: session, status } = useSession();
  const { data, isPending } = useGetAllModules(
    session?.access_token as string,
    {
      enabled: status === "authenticated",
    },
  );
  return (
    <div className="space-y-4">
      <AlertInformationModulesAdmin />
      <DataTable
        data={data?.data ?? []}
        columns={modulesColumns}
        isLoading={isPending}
      />
    </div>
  );
}
