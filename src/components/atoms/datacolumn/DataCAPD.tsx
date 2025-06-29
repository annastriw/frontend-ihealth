"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import Link from "next/link";
import { Eye, FileVideo, SquarePen, Trash2 } from "lucide-react";
import ActionButton from "@/components/molecules/datatable/ActionButton";
import { CAPD } from "@/types/sub-modules/sub-modules";

export const capdColumns: ColumnDef<CAPD>[] = [
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
    accessorKey: "type",
    header: "Video URL",
    cell: () => {
      return (
        <div
          suppressHydrationWarning
          className="line-clamp-1 cursor-pointer md:line-clamp-2"
        >
          <FileVideo className="h-5 w-5" />
        </div>
      );
    },
  },
  {
    accessorKey: "created_at",
    header: "Tanggal Dibuat",
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
    accessorKey: "updated_at",
    header: "Terakhir Diubah",
    cell: ({ row }) => {
      const data = row.original;
      return (
        <p suppressHydrationWarning>
          {format(new Date(data.updated_at), "EEEE, d MMMM yyyy, HH:mm", {
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
            href={`/dashboard/admin/modules/${data.id}`}
            className="flex items-center text-gray-700 hover:underline"
          >
            <Eye className="h-4 w-4" />
            <span className="ml-2">Detail</span>
          </Link>
          <Link
            href={`/dashboard/admin/modules/${data.id}/edit`}
            className="flex items-center text-yellow-600 hover:text-yellow-800 hover:underline"
          >
            <SquarePen className="h-4 w-4" />
            <span className="ml-2">Edit</span>
          </Link>
          <Link
            href={`/dashboard/admin/modules/${data.id}/edit`}
            className="flex items-center text-red-600 hover:text-red-800 hover:underline"
          >
            <Trash2 className="h-4 w-4" />
            <span className="ml-2">Hapus</span>
          </Link>
        </ActionButton>
      );
    },
  },
];
