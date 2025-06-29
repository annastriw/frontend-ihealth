"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState, useEffect } from "react";

interface SearchBarQuestionProps {
  onSearch: (query: string) => void;
}

export default function SearchBarQuestion({
  onSearch,
}: SearchBarQuestionProps) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      onSearch(query.toLowerCase());
    }, 300); // debounce
    return () => clearTimeout(timeout);
  }, [query, onSearch]);

  return (
    <div className="relative w-full md:max-w-xl">
      <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
      <Input
        type="text"
        placeholder="Cari pertanyaan disini..."
        className="rounded-full py-5 pl-10"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
}
