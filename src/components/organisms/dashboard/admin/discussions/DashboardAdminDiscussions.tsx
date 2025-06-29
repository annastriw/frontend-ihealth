"use client";

import { discussionColumns } from "@/components/atoms/datacolumn/DataDiscussion";
import DialogCreateDiscussion from "@/components/atoms/dialog/DialogCreateDiscussion";
import { DataTable } from "@/components/molecules/datatable/DataTable";
import { Button } from "@/components/ui/button";
import { useGetAllDiscussion } from "@/http/discussions/get-all-discussions";
import { Plus } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function DashboardAdminDiscussionWrapper() {
  const { data: session, status } = useSession();
  const { data, isPending } = useGetAllDiscussion(
    session?.access_token as string,
    {
      enabled: status === "authenticated",
    },
  );

  const [isDialogCreateDiscussionOpen, setIsDialogCreateDiscussionOpen] =
    useState(false);

  const handleDialogCreateDiscussionOpen = () => {
    setIsDialogCreateDiscussionOpen(true);
  };

  return (
    <>
      <div className="space-y-4">
        <div>
          <Button onClick={handleDialogCreateDiscussionOpen}>
            <Plus /> Tambah Topik Diskusi
          </Button>
        </div>
        <DataTable
          data={data?.data ?? []}
          columns={discussionColumns}
          isLoading={isPending}
        />
      </div>
      <DialogCreateDiscussion
        open={isDialogCreateDiscussionOpen}
        setOpen={setIsDialogCreateDiscussionOpen}
      />
    </>
  );
}
