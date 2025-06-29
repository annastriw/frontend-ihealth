"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ReportSearchAndFilterProps {
  tab: string;
  searchValue: string;
  onSearchChange: (value: string) => void;
  selectedType?: string;
  onTypeChange?: (value: string) => void;
}

export default function ReportSearchAndFilter({
  tab,
  searchValue,
  onSearchChange,
  selectedType,
  onTypeChange,
}: ReportSearchAndFilterProps) {
  return (
    <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <Input
        placeholder="Cari berdasarkan nama..."
        value={searchValue}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full md:max-w-sm"
      />
      {(tab === "pre-test" || tab === "post-test") && (
        <Select value={selectedType} onValueChange={onTypeChange}>
          <SelectTrigger className="w-full md:w-[200px]">
            <SelectValue placeholder="Pilih jenis" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua</SelectItem>
            <SelectItem value="capd">CAPD</SelectItem>
            <SelectItem value="hd">HD</SelectItem>
          </SelectContent>
        </Select>
      )}
    </div>
  );
}
