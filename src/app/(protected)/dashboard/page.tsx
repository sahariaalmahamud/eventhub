"use client";

import { BarChart3, CalendarDays, Layers3, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { PageShell } from "@/components/ui/page-shell";
import { getDashboardStats, getEventsByCreator } from "@/lib/events";
import { useAuth } from "@/contexts/AuthContext";
import type { DashboardStats, EventItem } from "@/types/event";

export default function DashboardPage() {
  const { user } = useAuth();
  const [dashboardStats, setDashboardStats] = useState<DashboardStats | null>(null);
  const [userEvents, setUserEvents] = useState<EventItem[]>([]);

  useEffect(() => {
    async function loadDashboardData() {
      const [stats, events] = await Promise.all([getDashboardStats(), user ? getEventsByCreator(user.uid) : Promise.resolve([])]);
      setDashboardStats(stats);
      setUserEvents(events);
    }

    void loadDashboardData();
  }, [user]);

  if (!dashboardStats) {
    return <div className="p-8 text-sm text-slate-500">Loading dashboard…</div>;
  }

  return (
    <PageShell>
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-600">Dashboard</p>
              <h1 className="mt-2 text-3xl font-semibold text-slate-950">Welcome back, {user?.name ?? "Organizer"}</h1>
            </div>
            <div className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-600">Track your event portfolio in one place</div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {[
              { label: "Total events", value: dashboardStats.totalEvents, icon: Sparkles },
              { label: "Upcoming events", value: dashboardStats.upcomingEvents, icon: CalendarDays },
              { label: "Categories", value: dashboardStats.categories.length, icon: Layers3 },
              { label: "Capacity", value: dashboardStats.capacity, icon: BarChart3 },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="rounded-[24px] border border-slate-200 bg-slate-50 p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-slate-500">{item.label}</div>
                      <div className="mt-2 text-2xl font-semibold text-slate-900">{item.value}</div>
                    </div>
                    <div className="rounded-2xl bg-blue-600/10 p-3 text-blue-600"><Icon className="h-5 w-5" /></div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-6">
              <h2 className="text-xl font-semibold text-slate-900">Event categories</h2>
              <div className="mt-5 space-y-3">
                {dashboardStats.categoryBreakdown.map((item) => (
                  <div key={item.name}>
                    <div className="mb-2 flex items-center justify-between text-sm text-slate-600">
                      <span>{item.name}</span>
                      <span className="font-semibold text-slate-900">{item.value}</span>
                    </div>
                    <div className="h-2 rounded-full bg-slate-200">
                      <div className="h-2 rounded-full bg-blue-600" style={{ width: `${Math.min(item.value * 20, 100)}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-6">
              <h2 className="text-xl font-semibold text-slate-900">Your events</h2>
              <div className="mt-5 space-y-3">
                {userEvents.length > 0 ? userEvents.slice(0, 4).map((event) => (
                  <div key={event.id} className="rounded-2xl border border-slate-200 bg-white p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <div className="font-semibold text-slate-900">{event.title}</div>
                        <div className="mt-1 text-sm text-slate-500">{event.date}</div>
                      </div>
                      <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-600">{event.category}</span>
                    </div>
                  </div>
                )) : <p className="text-sm text-slate-500">No events created yet.</p>}
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
