"use client";

import AlertDialogDeletePostTestDialog from "@/components/atoms/alert/AlertDialogDeletePostTest";
import AlertDialogDeletePreTestDialog from "@/components/atoms/alert/AlertDialogDeletePreTest";
import { postTestColumns } from "@/components/atoms/datacolumn/DataPostTest";
import { preTestColumns } from "@/components/atoms/datacolumn/DataPreTest";
import DialogCreatePostTest from "@/components/atoms/dialog/DialogCreatePostTest";
import DialogCreatePreTest from "@/components/atoms/dialog/DialogCreatePreTest";
import DialogEditPostTest from "@/components/atoms/dialog/DialogEditPostTest";
import DialogEditPreTest from "@/components/atoms/dialog/DialogEditPreTest";
import { DataTable } from "@/components/molecules/datatable/DataTable";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useDeletePostTest } from "@/http/admin/test/post-test/delete-post-test";
import { useDeletePreTest } from "@/http/admin/test/pre-test/delete-pre-test";
import { useGetAllPostTest } from "@/http/test/get-all-post-test";
import { useGetAllPreTest } from "@/http/test/get-all-pre-test";
import { PostTest } from "@/types/test/post-test";
import { PreTest } from "@/types/test/pre-test";
import { useQueryClient } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { toast } from "sonner";

export default function DashboardAdminTestWrapper() {
  const { data: session, status } = useSession();
  const [selectedTab, setSelectedTab] = useState("pre-test");
  const [dialogCreatePreTestOpen, setDialogCreatePreTestOpen] = useState(false);
  const [dialogCreatePostTestOpen, setDialogCreatePostTestOpen] =
    useState(false);
  const isAuthenticated = status === "authenticated";
  const [selectedPreTest, setSelectedPreTest] = useState<PreTest | null>(null);
  const [selectedPostTest, setSelectedPostTest] = useState<PostTest | null>(
    null,
  );

  const [openAlertDeletePreTest, setOpenAlertDeletePreTest] =
    useState<boolean>(false);
  const [openAlertDeletePostTest, setOpenAlertDeletePostTest] =
    useState<boolean>(false);
  const [openDialogEditPreTest, setOpenDialogEditPreTest] =
    useState<boolean>(false);
  const [openDialogEditPostTest, setOpenDialogEditPostTest] =
    useState<boolean>(false);

  const handleDialogCreatePreTestOpen = () => {
    setDialogCreatePreTestOpen(true);
  };

  const handleDialogCreatePostTestOpen = () => {
    setDialogCreatePostTestOpen(true);
  };

  const { data, isPending } = useGetAllPreTest(
    session?.access_token as string,
    {
      enabled: isAuthenticated && selectedTab === "pre-test",
    },
  );

  const { data: post, isPending: isLoad } = useGetAllPostTest(
    session?.access_token as string,
    {
      enabled: isAuthenticated && selectedTab === "post-test",
    },
  );

  // pre test
  const deletePreTestHandler = (data: PreTest) => {
    setSelectedPreTest(data);
    setOpenAlertDeletePreTest(true);
  };

  const handleDialogEditPreTestOpen = (data: PreTest) => {
    setSelectedPreTest(data);
    setOpenDialogEditPreTest(true);
  };

  const { mutate: deletePreTest, isPending: isDeletePending } =
    useDeletePreTest({
      onError: () => {
        toast.error("Gagal menghapus Pre Test!");
      },
      onSuccess: () => {
        setSelectedPreTest(null);
        toast.success("Berhasil menghapus Pre Test!");

        queryClient.invalidateQueries({
          queryKey: ["pre-test-list"],
        });
      },
    });

  const handleDeletePreTest = () => {
    if (selectedPreTest?.id) {
      deletePreTest({
        id: selectedPreTest.id,
        token: session?.access_token as string,
      });
    }
  };

  // post test
  const deletePostTestHandler = (data: PostTest) => {
    setSelectedPostTest(data);
    setOpenAlertDeletePostTest(true);
  };

  const handleDialogEditPostTestOpen = (data: PostTest) => {
    setSelectedPostTest(data);
    setOpenDialogEditPostTest(true);
  };

  const queryClient = useQueryClient();

  const { mutate: deletePostTest, isPending: isDeletePostTestPending } =
    useDeletePostTest({
      onError: () => {
        toast.error("Gagal menghapus Post Test!");
      },
      onSuccess: () => {
        setSelectedPostTest(null);
        toast.success("Berhasil menghapus Post Test!");

        queryClient.invalidateQueries({
          queryKey: ["post-test-list"],
        });
      },
    });

  const handleDeletePostTest = () => {
    if (selectedPostTest?.id) {
      deletePostTest({
        id: selectedPostTest.id,
        token: session?.access_token as string,
      });
    }
  };

  return (
    <>
      <div>
        <Tabs
          defaultValue="pre-test"
          className="space-y-2"
          onValueChange={(value) => setSelectedTab(value)}
        >
          <TabsList className="grid w-full max-w-[300px] grid-cols-2">
            <TabsTrigger value="pre-test">Pre Test</TabsTrigger>
            <TabsTrigger value="post-test">Post Test</TabsTrigger>
          </TabsList>

          <TabsContent value="pre-test">
            <div className="mb-4">
              <Button onClick={handleDialogCreatePreTestOpen}>
                <Plus /> Tambah Pre Test
              </Button>
            </div>
            <DataTable
              data={data?.data ?? []}
              columns={preTestColumns({
                deletePreTestHandler,
                onEditHandler: handleDialogEditPreTestOpen,
              })}
              isLoading={isPending}
            />
          </TabsContent>
          <TabsContent value="post-test">
            <div className="mb-4">
              <Button onClick={handleDialogCreatePostTestOpen}>
                <Plus /> Tambah Post Test
              </Button>
            </div>
            <DataTable
              data={post?.data ?? []}
              columns={postTestColumns({
                deletePostTestHandler,
                onEditHandler: handleDialogEditPostTestOpen,
              })}
              isLoading={isLoad}
            />
          </TabsContent>
        </Tabs>
      </div>
      <DialogCreatePreTest
        open={dialogCreatePreTestOpen}
        setOpen={setDialogCreatePreTestOpen}
      />
      <DialogCreatePostTest
        open={dialogCreatePostTestOpen}
        setOpen={setDialogCreatePostTestOpen}
      />
      {/* pre test */}
      {selectedPreTest && (
        <>
          <DialogEditPreTest
            open={openDialogEditPreTest}
            setOpen={setOpenDialogEditPreTest}
            id={selectedPreTest.id}
            data={selectedPreTest}
          />
          <AlertDialogDeletePreTestDialog
            open={openAlertDeletePreTest}
            setOpen={setOpenAlertDeletePreTest}
            confirmDelete={handleDeletePreTest}
            isPending={isDeletePending}
            data={selectedPreTest}
          />
        </>
      )}

      {/* post test */}
      {selectedPostTest && (
        <>
          <DialogEditPostTest
            open={openDialogEditPostTest}
            setOpen={setOpenDialogEditPostTest}
            id={selectedPostTest.id}
            data={selectedPostTest}
          />
          <AlertDialogDeletePostTestDialog
            open={openAlertDeletePostTest}
            setOpen={setOpenAlertDeletePostTest}
            confirmDelete={handleDeletePostTest}
            isPending={isDeletePostTestPending}
            data={selectedPostTest}
          />
        </>
      )}
    </>
  );
}
