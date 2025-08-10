"use client";

import AlertDialogDeleteUser from "@/components/atoms/alert/AlertDialogDeleteUser";
import { usersColumns } from "@/components/atoms/datacolumn/DataUsersForMedical";
import { DataTable } from "@/components/molecules/datatable/DataTable";
import { SearchUserInput } from "@/components/molecules/search/SearchUsers";
import { RoleFilterSelect } from "@/components/molecules/select/RoleFilterSelect";
import { useDeleteUser } from "@/http/medical/users/medical-delete-user";
import { useGetAllUsers } from "@/http/users/medical-get-all-users";
import { User } from "@/types/user/user";
import { useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

export default function DashboardMedicalUsersWrapper() {
  const { data: session, status } = useSession();
  const queryClient = useQueryClient();

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [roleFilter, setRoleFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [openDialogDeleteUser, setOpenDialogDeleteUser] =
    useState<boolean>(false);

  // Ambil data pengguna tenaga kesehatan
  const { data, isPending } = useGetAllUsers(session?.access_token as string, {
    enabled: status === "authenticated",
  });

  // Hook hapus pengguna
  const { mutate: deleteUser, isPending: isDeleteUserPending } = useDeleteUser({
    onError: () => {
      toast.error("Gagal menghapus pengguna!");
    },
    onSuccess: () => {
      setSelectedUser(null);
      toast.success("Berhasil menghapus pengguna!");
      queryClient.invalidateQueries({ queryKey: ["users-list"] });
    },
  });

  // Handler hapus user
  const deleteUserHandler = (user: User) => {
    setSelectedUser(user);
    setOpenDialogDeleteUser(true);
  };

  // Handler eksekusi hapus
  const handleDeleteUser = () => {
    if (selectedUser?.id) {
      deleteUser({
        id: selectedUser.id,
        token: session?.access_token as string,
      });
    }
  };

  // Filter data berdasarkan role & pencarian
  const filteredData = useMemo(() => {
    if (!data?.data) return [];
    const keyword = searchQuery.toLowerCase();

    return data.data
      .filter((user) =>
        roleFilter === "all" ? true : user.role === roleFilter
      )
      .filter(
        (user) =>
          user.name?.toLowerCase().includes(keyword) ||
          user.email?.toLowerCase().includes(keyword)
      );
  }, [data?.data, roleFilter, searchQuery]);

  return (
    <div className="space-y-4">
      {/* Search dan filter */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <SearchUserInput value={searchQuery} onChange={setSearchQuery} />
        <RoleFilterSelect value={roleFilter} onChange={setRoleFilter} />
      </div>

      {/* Tabel data */}
      <DataTable
        columns={usersColumns({
          deleteUserHandler,
          resetPasswordUserHandler: () => {},
        })}
        data={filteredData}
        isLoading={isPending}
      />

      {/* Dialog konfirmasi hapus */}
      {selectedUser && (
        <AlertDialogDeleteUser
          open={openDialogDeleteUser}
          setOpen={setOpenDialogDeleteUser}
          confirmDelete={handleDeleteUser}
          isPending={isDeleteUserPending}
          data={selectedUser}
        />
      )}
    </div>
  );
}
