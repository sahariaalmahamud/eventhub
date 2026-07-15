"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { StatisticsCard } from "@/components/ui/statistics-card";

const chartData = [
  { month: "Jan", events: 45 },
  { month: "Feb", events: 52 },
  { month: "Mar", events: 48 },
  { month: "Apr", events: 61 },
  { month: "May", events: 55 },
  { month: "Jun", events: 67 },
  { month: "Jul", events: 72 },
  { month: "Aug", events: 78 },
  { month: "Sep", events: 85 },
  { month: "Oct", events: 92 },
  { month: "Nov", events: 88 },
  { month: "Dec", events: 95 },
];

const statistics = [
  { value: "120+", label: "Upcoming Events" },
  { value: "15K+", label: "Registered Attendees" },
  { value: "85+", label: "Professional Organizers" },
  { value: "30+", label: "Cities Covered" },
];

export function EventStatisticsSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-12">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-600">Platform metrics</p>
        <h2 className="mt-2 max-w-2xl text-3xl font-semibold text-slate-950">Growing strong every day</h2>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
          Join thousands of organizers and attendees on EventHub's growing platform.
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statistics.map((stat, index) => (
          <StatisticsCard key={index} value={stat.value} label={stat.label} />
        ))}
      </div>

      {/* Chart */}
      <div className="mt-12 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <h3 className="text-lg font-semibold text-slate-900">Monthly Event Growth</h3>
        <p className="mt-2 text-sm text-slate-600">Events hosted over the past 12 months</p>

        <div className="mt-8 h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" stroke="#64748b" style={{ fontSize: "12px" }} />
              <YAxis stroke="#64748b" style={{ fontSize: "12px" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                }}
                cursor={{ fill: "rgba(59, 130, 246, 0.05)" }}
              />
              <Bar dataKey="events" fill="#2563eb" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}
