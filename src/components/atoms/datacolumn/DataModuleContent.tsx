"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { SquarePen, Trash2 } from "lucide-react";
import ActionButton from "@/components/molecules/datatable/ActionButton";
import { ModuleContent } from "@/types/modules/modules";

export const moduleContentColumns = ({
  onEditHandler,
  deleteHandler,
}: {
  onEditHandler: (data: ModuleContent) => void;
  deleteHandler: (data: ModuleContent) => void;
}): ColumnDef<ModuleContent>[] => [
  {
    accessorKey: "index",
    header: "No",
    cell: ({ row }) => <p suppressHydrationWarning>{row.index + 1}</p>,
  },
  {
    accessorKey: "title",
    header: "Nama",
    cell: ({ row }) => (
      <p suppressHydrationWarning className="line-clamp-1 md:line-clamp-2">
        {row.original.name}
      </p>
    ),
  },
  {
    accessorKey: "type",
    header: "Tipe",
    cell: ({ row }) => (
      <p
        suppressHydrationWarning
        className="line-clamp-1 uppercase md:line-clamp-2"
      >
        {row.original.type}
      </p>
    ),
  },
  {
    accessorKey: "video_url",
    header: "Video",
    cell: ({ row }) => (
      <p suppressHydrationWarning className="line-clamp-1 md:line-clamp-2">
        {row.original.video_url}
      </p>
    ),
  },
  {
    accessorKey: "created_at",
    header: "Tanggal Dibuat",
    cell: ({ row }) => (
      <p suppressHydrationWarning>
        {format(new Date(row.original.created_at), "EEEE, d MMMM yyyy, HH:mm", {
          locale: id,
        })}
      </p>
    ),
  },
  {
    accessorKey: "updated_at",
    header: "Terakhir Diubah",
    cell: ({ row }) => (
      <p suppressHydrationWarning>
        {format(new Date(row.original.updated_at), "EEEE, d MMMM yyyy, HH:mm", {
          locale: id,
        })}
      </p>
    ),
  },
  {
    id: "actions",
    header: "Aksi",
    cell: ({ row }) => {
      const data = row.original;

      return (
        <ActionButton>
          <button
            onClick={() => onEditHandler(data)}
            className="flex items-center text-yellow-600 hover:text-yellow-800 hover:underline"
          >
            <SquarePen className="h-4 w-4" />
            <span className="ml-2">Edit</span>
          </button>
          <button
            onClick={() => deleteHandler(data)}
            className="flex items-center text-red-600 hover:text-red-800 hover:underline"
          >
            <Trash2 className="h-4 w-4" />
            <span className="ml-2">Hapus</span>
          </button>
        </ActionButton>
      );
    },
  },
];
