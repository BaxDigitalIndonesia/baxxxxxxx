import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SearchBarWithButtonProps {
  onSearch: (query: string) => void;
}

export default function SearchBarWithButton({ onSearch }: SearchBarWithButtonProps) {
  const [query, setQuery] = useState<string>("");

  const handleSearch = () => {
    onSearch(query.trim());
  };

  return (
    <div className="flex w-full max-w-sm items-center space-x-2">
      <Input
        type="text"
        placeholder="Search service name here"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
      />
      <Button type="button" onClick={handleSearch}>
        Search
      </Button>
    </div>
  );
}
