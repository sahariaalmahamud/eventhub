"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { Search } from "lucide-react";

export default function BannerSearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = query.trim();
    router.push(`/explore${trimmed ? `?search=${encodeURIComponent(trimmed)}` : ""}`);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-3">
      <label className="sr-only" htmlFor="banner-search-input">Search events</label>
      <div className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 text-slate-700">
        <Search className="h-4 w-4" />
        <input
          id="banner-search-input"
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Try AI design, music, or wellness"
          className="w-full bg-transparent outline-none"
        />
        <button
          type="submit"
          className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-500"
        >
          Search
        </button>
      </div>
    </form>
  );
}
