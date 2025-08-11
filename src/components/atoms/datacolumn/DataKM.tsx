"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import Link from "next/link";
import { Eye, FileText, SquarePen, Trash2 } from "lucide-react";
import ActionButton from "@/components/molecules/datatable/ActionButton";
import { KM } from "@/types/sub-modules/sub-modules"; // Ganti dari HT ke KM

export const kmColumns: ColumnDef<KM>[] = [
  {
    accessorKey: "index",
    header: "No",
    cell: ({ row }) => (
      <p suppressHydrationWarning>{row.index + 1}</p>
    ),
  },
  {
    accessorKey: "name",
    header: "Nama",
    cell: ({ row }) => (
      <p suppressHydrationWarning className="line-clamp-1 md:line-clamp-2">
        {row.original.name}
      </p>
    ),
  },
  {
    accessorKey: "video_url",
    header: "Video",
    cell: ({ row }) => {
      const videoId = row.original.video_url;
      return videoId ? (
        <a
          href={`https://www.youtube.com/watch?v=${videoId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-blue-600 hover:underline"
        >
          <FileText className="h-5 w-5" />
          Tonton
        </a>
      ) : (
        <span className="text-muted-foreground">-</span>
      );
    },
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
            href={`/dashboard/admin/modules/${data.id}/delete`}
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
