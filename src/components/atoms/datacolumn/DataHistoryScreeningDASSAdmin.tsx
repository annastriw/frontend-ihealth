// components/atoms/datacolumn/DataHistoryScreeningDASSAdmin.tsx

"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import Link from "next/link";
import { Eye, Trash2 } from "lucide-react";
import ActionButton from "@/components/molecules/datatable/ActionButton";
import { AdminScreeningDASSHistoryItem } from "@/types/screening-dass/admin-screening-dass";

interface HistoryScreeningDASSColumnProps {
  deleteHistoryScreeningHandler: (data: AdminScreeningDASSHistoryItem) => void;
}

export const historyScreeningDASSColumns = (
  props: HistoryScreeningDASSColumnProps,
): ColumnDef<AdminScreeningDASSHistoryItem>[] => [
  {
    accessorKey: "index",
    header: "No",
    cell: ({ row }) => {
      return <p suppressHydrationWarning>{row.index + 1}</p>;
    },
  },
  {
    accessorKey: "name",
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
    accessorKey: "submitted_at",
    header: "Tanggal Mengerjakan",
    cell: ({ row }) => {
      const data = row.original;
      return (
        <p suppressHydrationWarning>
          {format(new Date(data.submitted_at), "EEEE, d MMMM yyyy, HH:mm", {
            locale: id,
          })}
        </p>
      );
    },
  },
  {
    id: "actions",
    header: "Aksi",
    cell: ({ row }) => {
      const data = row.original;

      return (
        <ActionButton>
          <Link
            href={`/dashboard/admin/reports/history/screening-dass/${data.history_id}`}
            className="flex items-center text-gray-700 hover:underline"
          >
            <Eye className="h-4 w-4" />
            <span className="ml-2">Detail</span>
          </Link>
          <div
            onClick={() => props.deleteHistoryScreeningHandler(data)}
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
