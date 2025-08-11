"use client";

import { moduleContentColumns } from "@/components/atoms/datacolumn/DataModuleContent";
import DashboardTitleBold from "@/components/atoms/typography/DashboardTitleBold";
import { DataTable } from "@/components/molecules/datatable/DataTable";
import { Button } from "@/components/ui/button";
import { useGetDetailSubModule } from "@/http/sub-modules/get-detail-sub-module";
import { useDeleteModuleContent } from "@/http/module-content/delete-module-contents";
import DialogEditModuleContent from "@/components/atoms/dialog/DialogEditModuleContent";
import AlertDialogDeleteModuleContent from "@/components/atoms/alert/AlertDialogDeleteModuleContent";
import { ModuleContent } from "@/types/modules/modules";
import { useSession } from "next-auth/react";
import { useQueryClient } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import Link from "next/link";

interface DashboardAdminDetailSubModulesWrapperProps {
  id: string;
}

export default function DashboardAdminDetailSubModulesWrapper({
  id,
}: DashboardAdminDetailSubModulesWrapperProps) {
  const { data: session, status } = useSession();
  const queryClient = useQueryClient();

  const { data, isPending } = useGetDetailSubModule(
    id,
    session?.access_token as string,
    {
      enabled: status === "authenticated",
    },
  );

  const [selectedContent, setSelectedContent] = useState<ModuleContent | null>(
    null,
  );
  const [openDialogEdit, setOpenDialogEdit] = useState(false);
  const [openAlertDelete, setOpenAlertDelete] = useState(false);

  const handleEdit = (content: ModuleContent) => {
    setSelectedContent(content);
    setOpenDialogEdit(true);
  };

  const handleDelete = (content: ModuleContent) => {
    setSelectedContent(content);
    setOpenAlertDelete(true);
  };

  const { mutate: deleteModuleContent, isPending: isDeletePending } =
    useDeleteModuleContent({
      onSuccess: () => {
        toast.success("Konten berhasil dihapus.");
        queryClient.invalidateQueries({
          queryKey: ["sub-module-detail", id],
        });
        setOpenAlertDelete(false);
        setSelectedContent(null);
      },
      onError: () => {
        toast.error("Gagal menghapus konten.");
      },
    });

  const confirmDelete = () => {
    if (selectedContent?.id) {
      deleteModuleContent({
        id: selectedContent.id,
        token: session?.access_token as string,
      });
    }
  };

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <DashboardTitleBold head={data?.data.name ?? ""} />
        <Link href={`/dashboard/admin/sub-modules/create`}>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Tambah Konten Materi
          </Button>
        </Link>
      </div>

      <DataTable
        columns={moduleContentColumns({
          onEditHandler: handleEdit,
          deleteHandler: handleDelete,
        })}
        isLoading={isPending}
        data={data?.data.module_contents ?? []}
      />

      {selectedContent && (
        <>
          <DialogEditModuleContent
            open={openDialogEdit}
            setOpen={setOpenDialogEdit}
            data={selectedContent}
          />
          <AlertDialogDeleteModuleContent
            open={openAlertDelete}
            setOpen={setOpenAlertDelete}
            confirmDelete={confirmDelete}
            isPending={isDeletePending}
            data={selectedContent}
          />
        </>
      )}
    </>
  );
}
