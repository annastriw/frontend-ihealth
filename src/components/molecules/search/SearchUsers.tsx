"use client";

import { Input } from "@/components/ui/input";

interface SearchUserInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const SearchUserInput = ({ value, onChange }: SearchUserInputProps) => {
  return (
    <div className="space-y-2">
      <Input
        type="text"
        placeholder="Cari berdasarkan nama atau email..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full md:w-[300px]"
      />
    </div>
  );
};
