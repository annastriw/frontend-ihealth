"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface RoleFilterSelectProps {
  value: string;
  onChange: (value: string) => void;
}

export const RoleFilterSelect = ({
  value,
  onChange,
}: RoleFilterSelectProps) => {
  return (
    <div className="space-y-2">
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full md:w-[200px]">
          <SelectValue placeholder="Pilih peran" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Semua</SelectItem>
          <SelectItem value="user">Pasien</SelectItem>
          <SelectItem value="medical_personal">Tenaga Medis</SelectItem>
          <SelectItem value="admin">Admin</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
