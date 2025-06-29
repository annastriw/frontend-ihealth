"use client";

import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { Search } from "lucide-react";

interface DiscussionCommentSearchBarProps {
  onSearch: (value: string) => void;
}

export default function DiscussionCommentSearchBar({
  onSearch,
}: DiscussionCommentSearchBarProps) {
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      onSearch(searchValue);
    }, 300); // debounce input 300ms

    return () => clearTimeout(delayDebounce);
  }, [searchValue, onSearch]);

  return (
    <div className="relative max-w-md">
      <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
      <Input
        type="text"
        placeholder="Cari pertanyaan disini..."
        className="rounded-full py-5 pl-10"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
    </div>
  );
}
