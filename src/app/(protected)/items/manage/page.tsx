"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CheckCircle2, Loader2, Trash2, Eye } from "lucide-react";
import { PageShell } from "@/components/ui/page-shell";
import { useAuth } from "@/contexts/AuthContext";
import { deleteEvent, getEventsByCreator } from "@/lib/events";
import type { EventItem } from "@/types/event";

export default function ManageItemsPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  useEffect(() => {
    if (!feedback) {
      return;
    }

    const timer = window.setTimeout(() => setFeedback(null), 3000);
    return () => window.clearTimeout(timer);
  }, [feedback]);

  const loadEvents = async () => {
    if (!user?.uid) {
      setEvents([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const result = await getEventsByCreator(user.uid);
    setEvents(result);
    setLoading(false);
  };

  useEffect(() => {
    void loadEvents();
  }, [user?.uid]);

  const handleDelete = async (event: EventItem) => {
    if (!window.confirm(`Delete \"${event.title}\"?`)) {
      return;
    }

    setDeletingId(event.id);
    setFeedback(null);

    try {
      const removed = await deleteEvent(event.id);
      if (removed) {
        setEvents((current) => current.filter((item) => item.id !== event.id));
        setFeedback({ type: "success", message: "Event deleted successfully." });
      } else {
        setFeedback({ type: "error", message: "Unable to delete this event." });
      }
    } catch {
      setFeedback({ type: "error", message: "Unable to delete this event." });
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <PageShell>
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-600">Manage items</p>
              <h1 className="mt-2 text-3xl font-semibold text-slate-950">Your events</h1>
              <p className="mt-3 max-w-2xl text-lg leading-8 text-slate-600">Review, preview, and remove the events you created in one place.</p>
            </div>
            <Link href="/items/add" className="inline-flex items-center justify-center rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-500">
              Add new event
            </Link>
          </div>

          {feedback ? (
            <div className={`mt-6 flex items-center gap-2 rounded-2xl border px-4 py-3 text-sm ${feedback.type === "success" ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-red-200 bg-red-50 text-red-700"}`}>
              <CheckCircle2 className="h-4 w-4" />
              <span>{feedback.message}</span>
            </div>
          ) : null}

          {loading ? (
            <div className="mt-8 flex items-center justify-center rounded-[24px] border border-slate-200 bg-slate-50 py-12 text-sm text-slate-500">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Loading your events...
            </div>
          ) : events.length === 0 ? (
            <div className="mt-8 rounded-[24px] border border-slate-200 bg-slate-50 p-8 text-center text-sm text-slate-500">
              You have not created any events yet.
            </div>
          ) : (
            <div className="mt-8 grid gap-6 xl:grid-cols-2">
              {events.map((event) => (
                <article key={event.id} className="overflow-hidden rounded-[28px] border border-slate-200 bg-slate-50 shadow-sm">
                  <img src={event.coverImage} alt={event.title} className="h-48 w-full object-cover" />
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h2 className="text-lg font-semibold text-slate-900">{event.title}</h2>
                        <p className="mt-1 text-sm text-slate-500">{event.category}</p>
                      </div>
                      <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-600">{event.ticketPrice}৳</span>
                    </div>

                    <div className="mt-4 space-y-2 text-sm text-slate-600">
                      <div className="flex items-center gap-2"><span className="font-medium text-slate-900">Date:</span> {event.date}</div>
                      <div className="flex items-center gap-2"><span className="font-medium text-slate-900">Location:</span> {event.location}</div>
                    </div>

                    <div className="mt-5 flex flex-wrap gap-3">
                      <button
                        onClick={() => router.push(`/events/${event.id}`)}
                        className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-blue-600 hover:text-blue-600"
                      >
                        <Eye className="h-4 w-4" /> View
                      </button>
                      <button
                        onClick={() => void handleDelete(event)}
                        disabled={deletingId === event.id}
                        className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-100 disabled:opacity-60"
                      >
                        {deletingId === event.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                        Delete
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </PageShell>
  );
}
