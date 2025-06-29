"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { SquarePen, Trash2 } from "lucide-react";
import ActionButton from "@/components/molecules/datatable/ActionButton";
import { PostTest } from "@/types/test/post-test";

interface PostTestColumnProps {
  onEditHandler: (data: PostTest) => void;
  deletePostTestHandler: (data: PostTest) => void;
}

export const postTestColumns = (
  props: PostTestColumnProps,
): ColumnDef<PostTest>[] => [
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
        <div className="max-w-[200px] truncate">
          <p className="truncate">{data.name}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "modules",
    header: "Sub Materi",
    cell: ({ row }) => {
      const data = row.original;
      return (
        <div className="max-w-[200px] truncate">
          <p className="truncate">{data.sub_module.name}</p>
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
          <div
            onClick={() => props.onEditHandler(data)}
            className="flex cursor-pointer items-center text-yellow-600 hover:text-yellow-800 hover:underline"
          >
            <SquarePen className="h-4 w-4" />
            <span className="ml-2">Edit</span>
          </div>
          <div
            onClick={() => props.deletePostTestHandler(data)}
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
