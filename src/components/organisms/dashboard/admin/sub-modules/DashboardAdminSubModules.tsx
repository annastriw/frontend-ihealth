"use client";

import AlertDialogDeleteSubModules from "@/components/atoms/alert/AlertDialogDeleteSubModules";
import AlertInformationCreateModuleContent from "@/components/atoms/alert/AlertInformationCreateModuleContent";
import { subModuleColumns } from "@/components/atoms/datacolumn/DataSubModule";
import DialogCreateSubModules from "@/components/atoms/dialog/DialogCreateSubModule";
import DialogEditSubModule from "@/components/atoms/dialog/DialogEditSubModule";
import { DataTable } from "@/components/molecules/datatable/DataTable";
import { Button } from "@/components/ui/button";
import { useDeleteSubModules } from "@/http/sub-modules/delete-sub-modules";
import { useGetAllSubModulesNoCategory } from "@/http/sub-modules/get-all-sub-modules-no-category";
import { SubModules } from "@/types/modules/modules";
import { useQueryClient } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { toast } from "sonner";

export default function DashboardAdminSubModulesWrapper() {
  const { data: session, status } = useSession();
  const [selectedSubModules, setSelectedSubModules] =
    useState<SubModules | null>(null);
  const [openAlertDelete, setOpenAlertDelete] = useState<boolean>(false);
  const [openDialogEdit, setOpenDialogEdit] = useState<boolean>(false);

  const { data, isPending } = useGetAllSubModulesNoCategory(
    session?.access_token as string,
    {
      enabled: status === "authenticated",
    },
  );

  const [isDialogSubModuleOpen, setIsDialogSubModuleOpen] = useState(false);

  const handleDialogSubModuleOpen = () => {
    setIsDialogSubModuleOpen(true);
  };

  const deleteSubModulesHandler = (data: SubModules) => {
    setSelectedSubModules(data);
    setOpenAlertDelete(true);
  };

  const handleDialogEditOpen = (data: SubModules) => {
    setSelectedSubModules(data);
    setOpenDialogEdit(true);
  };

  const queryClient = useQueryClient();

  const { mutate: deleteHistorySubModules, isPending: isDeletePending } =
    useDeleteSubModules({
      onError: () => {
        toast.error("Gagal menghapus materi!");
      },
      onSuccess: () => {
        setSelectedSubModules(null);
        toast.success("Berhasil menghapus materi!");

        queryClient.invalidateQueries({
          queryKey: ["sub-modules"],
        });
      },
    });

  const handleDeleteSubModules = () => {
    if (selectedSubModules?.id) {
      deleteHistorySubModules({
        id: selectedSubModules.id,
        token: session?.access_token as string,
      });
    }
  };

  return (
    <>
      <div className="space-y-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <AlertInformationCreateModuleContent />
          <Button onClick={handleDialogSubModuleOpen}>
            <Plus /> Tambah Materi
          </Button>
        </div>
        <DataTable
          columns={subModuleColumns({
            onEditHandler: handleDialogEditOpen,
            deleteSubModulesHandler: deleteSubModulesHandler,
          })}
          data={data?.data ?? []}
          isLoading={isPending}
        />
      </div>
      <DialogCreateSubModules
        open={isDialogSubModuleOpen}
        setOpen={setIsDialogSubModuleOpen}
      />
      {selectedSubModules && (
        <>
          <DialogEditSubModule
            open={openDialogEdit}
            setOpen={setOpenDialogEdit}
            id={selectedSubModules.id}
            data={selectedSubModules}
          />
          <AlertDialogDeleteSubModules
            open={openAlertDelete}
            setOpen={setOpenAlertDelete}
            confirmDelete={handleDeleteSubModules}
            isPending={isDeletePending}
            data={selectedSubModules}
          />
        </>
      )}
    </>
  );
}
