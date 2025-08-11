"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import Link from "next/link";
import { Eye, KeyRound, Trash2 } from "lucide-react";
import ActionButton from "@/components/molecules/datatable/ActionButton";
import { User } from "@/types/user/user";

interface UserColumnProps {
  deleteUserHandler: (data: User) => void;
  resetPasswordUserHandler: (data: User) => void;
}

export const usersColumns = (props: UserColumnProps): ColumnDef<User>[] => [
  {
    accessorKey: "index",
    header: "No",
    cell: ({ row }) => {
      return <p suppressHydrationWarning>{row.index + 1}</p>;
    },
  },
  {
    accessorKey: "title",
    header: "Nama",
    cell: ({ row }) => {
      const data = row.original;
      return (
        <p suppressHydrationWarning className="line-clamp-1 md:line-clamp-2">
          {data.name}
        </p>
      );
    },
  },
  {
    accessorKey: "role",
    header: "Peran",
    cell: ({ row }) => {
      const data = row.original;

      const roleLabels: Record<string, string> = {
        user: "Pasien",
        medical_personal: "Tenaga Medis",
        admin: "Admin",
      };

      return (
        <p suppressHydrationWarning className="line-clamp-1 md:line-clamp-2">
          {roleLabels[data.role] || data.role}
        </p>
      );
    },
  },
  {
    accessorKey: "created_at",
    header: "Tanggal Bergabung",
    cell: ({ row }) => {
      const data = row.original;
      return (
        <p suppressHydrationWarning>
          {format(new Date(data.created_at), "EEEE, d MMMM yyyy, HH:mm", {
            locale: id,
          })}
        </p>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const data = row.original;

      return (
        <ActionButton>
          <Link
            href={`/dashboard/admin/users/${data.id}`}
            className="flex items-center text-gray-700 hover:underline"
          >
            <Eye className="h-4 w-4" />
            <span className="ml-2">Detail</span>
          </Link>
          <div
            onClick={() => props.resetPasswordUserHandler(data)}
            className="flex cursor-pointer items-center text-yellow-600 hover:text-yellow-800 hover:underline"
          >
            <KeyRound className="h-4 w-4" />
            <span className="ml-2">Reset Password</span>
          </div>
          <div
            onClick={() => props.deleteUserHandler(data)}
            className="flex cursor-pointer items-center text-red-600 hover:text-red-800 hover:underline"
          >
            <Trash2 className="h-4 w-4" />
            <span className="ml-2">Hapus</span>
          </div>
        </ActionButton>
      );
    },
  },
];
