"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal } from "lucide-react";
import { PageShell } from "@/components/ui/page-shell";
import { EventCard } from "@/components/ui/event-card";
import { EventCardSkeleton } from "@/components/ui/event-card-skeleton";
import { listEvents, STATIC_EVENTS } from "@/lib/events";
import type { EventItem } from "@/types/event";

const categories = Array.from(new Set(STATIC_EVENTS.map((event) => event.category))).sort();
const locations = Array.from(new Set(STATIC_EVENTS.map((event) => event.location))).sort();

function ExploreContent() {
  const searchParams = useSearchParams();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [sortBy, setSortBy] = useState<"date" | "price">("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(1);

  const [events, setEvents] = useState<EventItem[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const paramSearch = searchParams.get("search") ?? "";
    if (paramSearch !== search) {
      setSearch(paramSearch);
      setPage(1);
    }
  }, [search, searchParams]);

  useEffect(() => {
    async function loadEvents() {
      setIsLoading(true);
      const result = await listEvents({ search, category, location, sortBy, sortOrder, page, perPage: 8 });
      setEvents(result?.events ?? []);
      setTotal(result?.total ?? 0);
      setTotalPages(result?.totalPages ?? 1);
      setIsLoading(false);
    }

    void loadEvents();
  }, [category, location, page, search, sortBy, sortOrder]);

  return (
    <PageShell>
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="flex flex-col gap-6 rounded-[32px] border border-slate-200 bg-white/80 p-6 shadow-sm lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-600">Explore events</p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-950">Find the perfect event for your next move</h1>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-600">
            <SlidersHorizontal className="h-4 w-4" />
            Search, filter, and sort in minutes
          </div>
        </div>

        <div className="mt-8 grid gap-4 rounded-[28px] border border-slate-200 bg-white p-4 shadow-sm lg:grid-cols-[1.4fr_0.8fr_0.8fr_0.8fr]">
          <label className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
            <Search className="h-4 w-4 text-slate-400" />
            <input
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setPage(1);
              }}
              placeholder="Search by title"
              className="w-full bg-transparent outline-none"
            />
          </label>
          <select value={category} onChange={(event) => { setCategory(event.target.value); setPage(1); }} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none">
            <option value="">All categories</option>
            {categories.map((option) => <option key={option} value={option}>{option}</option>)}
          </select>
          <select value={location} onChange={(event) => { setLocation(event.target.value); setPage(1); }} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none">
            <option value="">All locations</option>
            {locations.map((option) => <option key={option} value={option}>{option}</option>)}
          </select>
          <select value={sortBy} onChange={(event) => { setSortBy(event.target.value as "date" | "price"); setPage(1); }} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none">
            <option value="date">Sort by date</option>
            <option value="price">Sort by price</option>
          </select>
          <select value={sortOrder} onChange={(event) => { setSortOrder(event.target.value as "asc" | "desc"); setPage(1); }} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none lg:col-span-4">
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {isLoading ? (
            Array.from({ length: 8 }).map((_, index) => <EventCardSkeleton key={index} />)
          ) : events.length > 0 ? events.map((event) => (
            <EventCard key={event.id} event={event} />
          )) : (
            <div className="md:col-span-2 xl:col-span-4 rounded-[24px] border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-sm text-slate-600">
              No events found yet. Add an event document to Firestore to see it here.
            </div>
          )}
        </div>

        <div className="mt-8 flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-sm text-slate-600">Showing {events.length} of {total} events</p>
          <div className="flex items-center gap-2">
            <button onClick={() => setPage((value) => Math.max(1, value - 1))} disabled={page === 1} className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 disabled:opacity-50">Previous</button>
            <span className="text-sm font-medium text-slate-700">Page {page} of {totalPages}</span>
            <button onClick={() => setPage((value) => Math.min(totalPages, value + 1))} disabled={page === totalPages} className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 disabled:opacity-50">Next</button>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

export default function ExplorePage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-7xl px-4 py-12 text-sm text-slate-600">Loading explore results…</div>}>
      <ExploreContent />
    </Suspense>
  );
}
