"use client";

import { Input } from "@/components/ui/input";

interface HistorySearchProps {
  search: string;
  setSearch: (value: string) => void;
}

export default function HistorySearch({
  search,
  setSearch,
}: HistorySearchProps) {
  return (
    <div className="mb-4 max-w-sm">
      <Input
        placeholder="Cari berdasarkan nama pasien..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}
