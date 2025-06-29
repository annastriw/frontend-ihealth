"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import Link from "next/link";
import { Eye, Trash2 } from "lucide-react";
import ActionButton from "@/components/molecules/datatable/ActionButton";
import { HistoryScreening } from "@/types/screening/screening";

interface HistoryScreeningColumnProps {
  deleteHistoryScreeningHandler: (data: HistoryScreening) => void;
}

export const historyScreeningColumns = (
  props: HistoryScreeningColumnProps,
): ColumnDef<HistoryScreening>[] => [
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
          {data.user.name}
        </p>
      );
    },
  },
  {
    accessorKey: "created_at",
    header: "Tanggal Mengerjakan",
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
            href={`/dashboard/admin/reports/screening/${data.id}`}
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
