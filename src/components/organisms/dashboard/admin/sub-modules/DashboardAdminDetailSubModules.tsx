"use client";

import { moduleContentColumns } from "@/components/atoms/datacolumn/DataModuleContent";
import DashboardTitleBold from "@/components/atoms/typography/DashboardTitleBold";
import { DataTable } from "@/components/molecules/datatable/DataTable";
import { Button } from "@/components/ui/button";
import { useGetDetailSubModule } from "@/http/sub-modules/get-detail-sub-module";
import { Plus } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";

interface DashboardAdminDetailSubModulesWrapperProps {
  id: string;
}

export default function DashboardAdminDetailSubModulesWrapper({
  id,
}: DashboardAdminDetailSubModulesWrapperProps) {
  const { data: session, status } = useSession();

  const { data, isPending } = useGetDetailSubModule(
    id,
    session?.access_token as string,
    {
      enabled: status === "authenticated",
    },
  );

  return (
    <>
      <div className="flex items-center justify-between">
        <DashboardTitleBold head={data?.data.name ?? ""} />
        <div>
          <Link href={"/dashboard/admin/sub-modules/create"}>
            <Button>
              <Plus />
              Tambah Konten Materi
            </Button>
          </Link>
        </div>
      </div>

      <DataTable
        columns={moduleContentColumns}
        isLoading={isPending}
        data={data?.data.module_contents ?? []}
      />
    </>
  );
}
