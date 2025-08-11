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
      console.log("Rendering index cell:", row.index);
      return <p suppressHydrationWarning>{row.index + 1}</p>;
    },
  },
  {
    accessorKey: "title",
    header: "Nama",
    cell: ({ row }) => {
      const data = row.original;
      console.log("Rendering name cell for user:", data);
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
      console.log("Rendering role cell for user:", data.role);
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
      console.log("Rendering created_at cell for user:", data.created_at);
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

      console.log("Rendering actions cell for user:", data);

      return (
        <ActionButton>
          {/* Tombol detail */}
          <Link
            href={`/dashboard/medical/users/${data.id}`}
            className="flex items-center text-gray-700 hover:underline"
          >
            <Eye className="h-4 w-4" />
            <span className="ml-2">Detail</span>
          </Link>

          {/* Uncomment ini jika ingin pakai reset password */}
          {/* <div
            onClick={() => {
              console.log("Reset password clicked for user:", data);
              props.resetPasswordUserHandler(data);
            }}
            className="flex cursor-pointer items-center text-yellow-600 hover:text-yellow-800 hover:underline"
          >
            <KeyRound className="h-4 w-4" />
            <span className="ml-2">Reset Password</span>
          </div> */}

          {/* Uncomment ini jika ingin pakai hapus user */}
          {/* <div
            onClick={() => {
              console.log("Delete clicked for user:", data);
              props.deleteUserHandler(data);
            }}
            className="flex cursor-pointer items-center text-red-600 hover:text-red-800 hover:underline"
          >
            <Trash2 className="h-4 w-4" />
            <span className="ml-2">Hapus</span>
          </div> */}
        </ActionButton>
      );
    },
  },
];
